import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styles: []
})
export class DoughnutchartComponent implements OnInit {

  @Input() public legend: string = '';
  @Input() public doughnutChartLabels: Label[];
  @Input() public doughnutChartData: MultiDataSet;
  @Input() public doughnutChartType: ChartType;

  constructor() { }

  ngOnInit(): void {
  }

}
