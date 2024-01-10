import { Component, Input, OnInit, ViewChild } from "@angular/core";

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexStroke,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexMarkers
  } from "ng-apexcharts";
  
  export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    markers: ApexMarkers;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
  };

@Component({
    selector: 'price-history-chart',
    template: `
    <div id="chart" *ngIf="data">
  <apx-chart
 
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [markers]="chartOptions.markers"
    [stroke]="chartOptions.stroke"
    [dataLabels]="chartOptions.dataLabels"
    [title]="chartOptions.title"
  ></apx-chart>
</div>
    `,
    styles: [`
    #chart {
       
        margin: 35px auto;
    }
    `]
  })
  
  export class PriceHistoryChartComponent implements OnInit {
      
    @Input() data: any[]
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    constructor(){
    }

    ngOnInit(): void {
        console.log(this.data)
        this.chartOptions = {
            series: [
              {
                name: "precio",
                data: this.data
              }
            ],
        
            chart: {
              type: "line",
              height: 350,
              toolbar: {
                show: true,
                tools:{
                  download:false
                }
              }
            },
            stroke: {
              curve: "smooth"
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: "Historial precio",
              align: "left"
            },
            markers: {
              hover: {
                sizeOffset: 4
              }
            }
          };
    }
    
}