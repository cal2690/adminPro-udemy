import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public suscription: Subscription;

  constructor() { 

    this.suscription = this.returnObservable()
    .pipe()
    .subscribe(
      num   => console.log('Subs ', num),
      error => console.log('Error ', error),
      ()    => console.log('OK')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La pagina se va cerrar');
    this.suscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {
      let cont = 0;
      let interval = setInterval(() => {
        cont += 1;
        const exit = {
          value: cont
        }
        observer.next(exit);
        // if (cont == 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }
      }, 1000); 
    }).pipe(
      map(resp => resp.value),
      filter((value, index) => {
        if( (value % 2) == 1 ) {
          return true;
        } else {
          return false;  
        }
        
      }) 
    )
  
  }

}
