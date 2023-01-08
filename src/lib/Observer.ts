import { Direction } from './constants';
import { Tile } from './Tile';
import { range, Observable, from } from 'rxjs';

export class Observer {
  private observables: any[] = [];
  protected observer = (type: string, payload: any) => {
    this.observables.forEach((observer) => {
      observer.next({ type, payload });
    });
  };

  constructor() {
    // console.log();

    this.observable = new Observable((subscriber) => {
      this.observables.push(subscriber);
      return () => {
        const index = this.observables.indexOf(subscriber);
        if (index !== -1) {
          this.observables.splice(index, 1);
        }
      };
    });
  }

  private observable?: Observable<any>;

  public subscribe = (callback: Function) => {
    if (this.observable) {
      const subscription = this.observable.subscribe(() => {
        callback();
      });
      return () => {
        subscription.unsubscribe();
      };
      // this.observable
    }
    return () => {};

    // this.observable.subscribe(callback

    // this._resolves.push(callback);
    // return () => {
    //   this._resolves = this._resolves.filter((e) => e !== callback);
    // };
  };

  // initStream = () => {
  //   // const observables = [];
  //   // this.observer = (type, payload) => {
  //   //   observables.forEach((observer) => { observer.next({ type, payload }); });
  //   // };

  //   this.observable = new Observable((subscriber) => {
  //     this.observables.push(subscriber);
  //     return () => {
  //       const index = this.observables.indexOf(subscriber);
  //       if (index !== -1) {
  //         this.observables.splice(index, 1);
  //       }
  //     };
  //   });

  //   // from()

  //   // setTimeout(() => {
  //   //   this.observer('test', { greet: 'wow' });
  //   // }, 2000);

  //   // this.observable.subscribe((e) => {
  //   //   console.log(this.observables.length);
  //   //   console.log('subscribe', e);
  //   // });
  //   // const observable = new Observable((subscriber) => {
  //   //   subscriber.next(1);
  //   //   subscriber.next(2);
  //   //   subscriber.next(3);
  //   //   setTimeout(() => {
  //   //     subscriber.next(4);
  //   //     subscriber.complete();
  //   //   }, 1000);
  //   // });
  //   // Observable.
  //   // const stream =       Observable.create((observer) => {
  //   //   observables.push(observer);
  //   //   return () => {
  //   //     const index = observables.indexOf(observer);
  //   //     if (index > -1) {
  //   //       observables.splice(index, 1);
  //   //     }
  //   //   };
  //   // }),
  // };
}
