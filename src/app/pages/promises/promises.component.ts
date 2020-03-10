import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.contThree().then(
      mensaje => console.log('Then', mensaje)
    )
    .catch( 
      error => console.log('Catch', error)
    );
    
  }

  ngOnInit(): void {
  }

  contThree(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let cont = 0;
      let interval = setInterval(() => {
        cont += 1;
        console.log(cont);
        if (cont == 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
