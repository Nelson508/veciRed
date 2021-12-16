import { AfterViewInit, Component, ElementRef, Input, ViewChild  } from '@angular/core';
import Chart from 'chart.js/auto';
import { Acuerdos } from '../../interfaces/interfaces';



@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss'],
})
export class GraficoComponent implements AfterViewInit   {

  @Input() graficoVotacion: Acuerdos = {};
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  titulos: Object[]= [];
  votos: Object[]= [];
  doughnutChart: any;

  constructor() { }

  ngAfterViewInit() {

    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    
    var largo =  Object.keys(this.graficoVotacion.opciones).length;
    
    for (let index = 0; index < largo; index++) {
      
      this.titulos.push(this.graficoVotacion.opciones[index]['titulo']);
      this.votos.push(this.graficoVotacion.opciones[index]['votos']);
    }

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.titulos,
        datasets: [{
          label: '# of Votes',
          data: this.votos,
          backgroundColor: [
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
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
