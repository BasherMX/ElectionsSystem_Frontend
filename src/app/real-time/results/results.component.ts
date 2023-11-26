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
    for (let i = 0; i < this.resultsData.length; i++) {
      this.drawDonutChart(i);
    }
  }

  drawDonutChart(index: number) {
    const votos_realizados = this.resultsData[index].totalVotes + this.resultsData[index].anuledVotes;
    const votos_esperados = this.resultsData[index].expectedVotes;
    const porcentaje_realizados = (votos_realizados / votos_esperados) * 100;
    const porcentaje_mostrar = Math.min(porcentaje_realizados, 100);

    const data = google.visualization.arrayToDataTable([
      ['Votos', 'Cantidad'],
      ['Votos Realizados', porcentaje_mostrar],
      ['Votos Pendientes', 100 - porcentaje_mostrar]
    ]);

    const options = {
      pieHole: 0.5,
      backgroundColor: '#E0E0E0',
      colors: ['#EE007E', '#ADADAD'],
      legend: 'none',
      pieSliceTextStyle: {
        color: 'black',
        fontSize: 15
      }
    };

    const chart = new google.visualization.PieChart(document.getElementById(`donut_chart_${index}`));
    chart.draw(data, options);
  }

  drawBarCharts() {
    for (let i = 0; i < this.resultsData.length; i++) {
      this.drawBarChart(i);
    }
  }

  drawBarChart(index: number) {
    const data = google.visualization.arrayToDataTable([
      ['Partido Politico', 'Votos', { role: 'style' }],
      ['PAN', 150000, 'color: #0084FF'],
      ['PRI', 200000, 'color: #28FF20'],
      ['PT', 500000, 'color: #FF0000'],
      ['PRD', 350000, 'color: #FFFB0B'],
      ['Otro', 100000, 'color: grey']
    ]);

    const options = {
      legend: 'none'
    };

    const chart = new google.visualization.ColumnChart(
      document.getElementById(`column_chart_${index}`)
    );

    chart.draw(data, options);
  }
}
