import { AfterViewInit, Component, ElementRef, ViewChild  } from '@angular/core';
//import { Chart, registerables  } from 'chart.js';
//Chart.register(...registerables);
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements AfterViewInit  {

  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  doughnutChart: any;

  constructor() { }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined. 
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {

    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM'],
        datasets: [{
          label: '# of Votes',
          data: [50, 29, 15, 10],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      }
    });
  }
}
