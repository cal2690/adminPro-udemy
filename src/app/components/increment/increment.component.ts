import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress') public txtProgress: ElementRef;

  @Input() public legend: string = "Leyenda";
  @Input() public progress: number = 50;

  @Output() changeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(newValue: number) {

    // let elementHtml: any = document.getElementsByName('progress')[0];

    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    // elementHtml.value = this.progress;
    this.txtProgress.nativeElement.value = this.progress;
    this.changeValue.emit(this.progress);
  }

  changeProgress(value: number) {

    this.progress = this.progress + value;

    if (value > 0 && this.progress >= 100) this.progress = 100;
    if (value < 0 && this.progress <= 0) this.progress = 0;
   
    this.changeValue.emit(this.progress);
  }

}
