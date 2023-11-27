import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealTimeService } from 'src/app/services/realTime/real-time.service';
declare var google: any;

interface Legend {
  position: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less']
})
export class ResultsComponent implements OnInit {

  resultsData: any;

  constructor(private realTimeApi: RealTimeService, private route: ActivatedRoute) {
    this.getExerciseData();
  }

  getExerciseData() {
    // Obtén el id de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      alert('ID no encontrado en la ruta.');
      return;
    }

    this.realTimeApi.getBallotsByExerciseId(id).subscribe(
      (res) => {
        console.log(res);
        this.resultsData = res;

        console.log(this.resultsData[0]);
        google.charts.setOnLoadCallback(() => this.drawDonutCharts());
        google.charts.setOnLoadCallback(() => this.drawBarCharts());
      },
      (err) => {
        alert(err.error.error);
      }
    );
  }

  

  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
  }

  drawDonutCharts() {
    this.drawDonutChart();
  }

  drawDonutChart() {
    const votos_realizados = this.resultsData[0].totalVotes + this.resultsData[0].anuledVotes;
    const votos_esperados = this.resultsData[0].expectedVotes;
    const porcentaje_realizados = (votos_realizados / votos_esperados) * 100;
    const porcentaje_mostrar = Math.min(porcentaje_realizados || 0, 100);

    const data = google.visualization.arrayToDataTable([
      ['Votos', 'Cantidad'],
      ['Votos Realizados', porcentaje_mostrar],
      ['Votos Pendientes', 100 - porcentaje_mostrar]
    ]);

    const options = {
      pieHole: .7,
      backgroundColor: '#E0E0E0',
      colors: ['#EE007E', '#ADADAD'],
      legend: 'none',
      pieSliceTextStyle: {
        color: 'black',
        fontSize: 15
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById(`donut_chart_1`));
    chart.draw(data, options);
  }

  drawBarCharts() {
    for (let i = 0; i < this.resultsData.length; i++) {
      this.drawBarChart(i, this.resultsData[i].candidates);
    }
  }

  getFormattedDate(): string {
    const currentDate = new Date();

    const day = this.padNumber(currentDate.getDate());
    const month = this.padNumber(currentDate.getMonth() + 1); // Los meses comienzan desde 0
    const year = currentDate.getFullYear();
    const hours = this.padNumber(currentDate.getHours());
    const minutes = this.padNumber(currentDate.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}hrs`;
  }

  private padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  drawBarChart(index: number, data: any[]) {
    // Convierte los datos proporcionados en el formato esperado por google.visualization
    const chartData = [['Partido Politico', 'Votos', { role: 'style' }]];
    data.forEach(candidate => {
      chartData.push([candidate.party_accronym, candidate.totalVotes, `color: ${candidate.party_color}`]);
    });
  
    const dataTable = google.visualization.arrayToDataTable(chartData);
  
    const options = {
      legend: 'none',
    };
  
    const chart = new google.visualization.ColumnChart(
      document.getElementById(`column_chart_${index}`)
    );
  
    chart.draw(dataTable, options);
  }
}
