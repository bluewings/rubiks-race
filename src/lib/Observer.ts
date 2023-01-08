import { any } from 'prop-types';
import { range, Observable, from } from 'rxjs';

export class Observer<T extends any> {
  private observables: any[] = [];
  protected publish = (type: string, payload: any) => {
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

  // public subscribe2(name: string);
  // public subscribe2(name: string, skill: string);

  // subscribe2 = (name: string)
  // public subscribe = (type: T, callback: Function),

  // class ContactModel {
  //   public subscribe(callback: string): any;
  //   public subscribe(customerId: number, type: string): any;
  //   public subscribe(typeOrCustomerId: string|number, type?: string): any {
  //     return;
  //   }
  // }

  public subscribe(callback: Function): () => void;
  public subscribe(type: T, callback: Function): () => void;
  public subscribe(__type: T | Function, __callback?: Function): () => void {
    let _type: any = '';
    let _callback: Function = () => undefined;
    if (typeof __type === 'function') {
      _callback = __type;
    } else if (typeof __callback === 'function') {
      _type = __type;
      _callback = __callback;
    }

    if (this.observable && _callback) {
      const subscription = this.observable.subscribe((observer) => {
        if (!_type || observer.type === _type) {
          _callback(observer);
        }
        // observer.type
        // console.log('observer', observer);
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
  }

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
