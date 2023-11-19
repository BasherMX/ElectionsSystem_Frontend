import { Component, OnInit } from '@angular/core';
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
  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawDonutChart);

    google.charts.setOnLoadCallback(this.drawBarChart_1);
    google.charts.setOnLoadCallback(this.drawBarChart_2);


  }
  drawDonutChart() {
    let votos_realizados = 525000;
    let votos_esperados = 1500000;
    var data = google.visualization.arrayToDataTable([
      ['Votos', 'Cantidad'],
      ['Votos Realizados', votos_realizados],
      ['Votos Esperados', votos_esperados]
    ]);


    var options = {
      pieHole: 0.5,
      backgroundColor: '#E0E0E0',
      colors: ['#EE007E', '#ADADAD'],
      legend: 'none',
      pieSliceTextStyle: {
        color: 'black',
        fontSize: 15
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
    chart.draw(data, options);
  }

  drawBarChart_1() {
    var data = google.visualization.arrayToDataTable([
      ['Partido Politico', 'Votos', { role: 'style' }],
      ['PAN', 150000, 'color: #0084FF'],
      ['PRI', 200000, 'color: #28FF20'],
      ['PT', 500000, 'color: #FF0000'],
      ['PRD', 350000, 'color: #FFFB0B'],
      ['Otro', 100000, 'color: grey']
    ]);

    var options = {
      legend: 'none'
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById('column_chart_1'));

    chart.draw(data, options);
  }

  drawBarChart_2() {
    var data = google.visualization.arrayToDataTable([
      ['Partido Politico', 'Votos', { role: 'style' }],
      ['PAN', 150000, 'color: #0084FF'],
      ['PRI', 200000, 'color: #28FF20'],
      ['PT', 500000, 'color: #FF0000'],
      ['PRD', 350000, 'color: #FFFB0B'],
      ['Otro', 100000, 'color: grey']
    ]);

    var options = {
      legend: 'none'
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById('column_chart_2'));

    chart.draw(data, options);
  }
}