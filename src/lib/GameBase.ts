import { Direction } from './constants';
import { Tile } from './Tile';
import { range, Observable, from } from 'rxjs';

interface GameBaseOptions {
  numberOfColumns: number;
  numberOfRows: number;
  tiles: Tile[];
}

export class GameBase {
  spaces: {
    x: number;
    y: number;
    tile?: Tile;
  }[];

  spaces_?: Record<string, any>;

  numberOfRows: number;
  numberOfColumns: number;

  constructor({ numberOfRows, numberOfColumns, tiles }: GameBaseOptions) {
    this.numberOfRows = numberOfRows;
    this.numberOfColumns = numberOfColumns;
    const _tiles = tiles.slice();
    this.spaces = new Array(numberOfRows * numberOfColumns).fill(true).map((_, i) => {
      const y = Math.floor(i / numberOfColumns);
      const x = i % numberOfColumns;

      return {
        y,
        x,
        tile: _tiles.shift(),
      };
    });

    this.syncPosition();
    this.initStream();
  }

  observables: any[] = [];
  observer = (type: string, payload: any) => {
    this.observables.forEach((observer) => {
      observer.next({ type, payload });
    });
  };

  observable?: Observable<any>;

  initStream = () => {
    // const observables = [];
    // this.observer = (type, payload) => {
    //   observables.forEach((observer) => { observer.next({ type, payload }); });
    // };

    this.observable = new Observable((subscriber) => {
      this.observables.push(subscriber);
      return () => {
        const index = this.observables.indexOf(subscriber);
        if (index !== -1) {
          this.observables.splice(index, 1);
        }
      };
    });

    // from()

    // setTimeout(() => {
    //   this.observer('test', { greet: 'wow' });
    // }, 2000);

    // this.observable.subscribe((e) => {
    //   console.log(this.observables.length);
    //   console.log('subscribe', e);
    // });
    // const observable = new Observable((subscriber) => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });
    // Observable.
    // const stream =       Observable.create((observer) => {
    //   observables.push(observer);
    //   return () => {
    //     const index = observables.indexOf(observer);
    //     if (index > -1) {
    //       observables.splice(index, 1);
    //     }
    //   };
    // }),
  };

  syncPosition = () => {
    // t
    this.spaces.forEach((e) => {
      // this.
      if (e.tile) {
        e.tile.setPosition(e.x, e.y);
      }
    });
  };

  toIndex = (x: number, y: number) => {
    // y *
    return y * this.numberOfColumns + x;
  };

  _resolves: Function[] = [];

  subscribe = (callback: Function) => {
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

  queue: any[] = [];

  queuePush = (type: string, payload: any) => {
    this.queue.push({
      type,
      payload,
    });
  };

  _timer?: NodeJS.Timer;

  flush = () => {
    clearInterval(this._timer);
    const handle = () => {
      const curr = this.queue.shift();
      if (curr && curr.type === 'MOVE') {
        this._move(curr.payload.from, curr.payload.to);
        curr.payload.done();
      }
      if (this.queue.length === 0) {
        clearInterval(this._timer);
      }
    };

    // if (this.queue.length === 1) {
    // console.log('>>> 1')
    handle();
    // } else {
    this._timer = setInterval(handle, 50);
    // }
  };

  // push = ({ x, y }: { x: number; y: number }) => {

  // };

  _move = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const fromIndex = this.toIndex(from.x, from.y);
    const toIndex = this.toIndex(to.x, to.y);

    // console.log({ fromIndex, toIndex });
    if (this.spaces[fromIndex].tile && !this.spaces[toIndex].tile) {
      this.spaces[toIndex].tile = this.spaces[fromIndex].tile;
      this.spaces[fromIndex].tile = undefined;
    }
    this.syncPosition();
    this.observer('change', {});
    // this._resolves.forEach((e) => e());

    // ob
  };

  emptySpace = () => {
    return this.spaces.find((e) => {
      return !e.tile;
    });
  };

  getMovable = (direction: Direction) => {
    const empty = this.emptySpace();
    if (empty) {
      // console.log(empty);

      const moves =
        direction === Direction.Vertical
          ? this.spaces.filter((e) => {
              return e.tile && e.x === empty.x;
            })
          : this.spaces.filter((e) => {
              return e.tile && e.y === empty.y;
            });
      // .map((e) => {
      //   return {
      //     from: {
      //       x: e.x,
      //       y: e.y,
      //     },
      //     to: {
      //       x: empty.x,
      //       y: empty.y,
      //     },
      //   };
      // });
      // moves

      return moves;
      // if (direction === Direction.Vertical) {
      //   return this.spaces.filter((e) => {
      //     return e.tile && e.x === empty.x;
      //   });
      // } else {
      //   return this.spaces.filter((e) => {
      //     return e.tile && e.y === empty.y;
      //   });
      // }
    }
    // empty.x
    // const this.spaces.find((e) => {
    //   // console.log(Math.floor(e.y / 5), y);
    //   if (e.tile) {
    //     return true;
    //   }
    //   return false;
    // });
  };

  moveTo = async (direction: Direction) => {
    const empty = this.emptySpace();
    if (empty) {
      let { x, y } = empty;
      if (direction === Direction.Down) {
        y--;
      } else if (direction === Direction.Up) {
        y++;
      } else if (direction === Direction.Left) {
        x++;
      } else if (direction === Direction.Right) {
        x--;
      }
      await this.moveFrom(x, y);
    }
  };

  moveFrom = async (x: number, y: number) => {
    // alert(`${x} / ${y} / ${this.toIndex(x, y)}`);
    // const index = this.toIndex(x, y);
    const known = this.spaces.find((e) => {
      return e.x === x && e.y === y;
    });
    if (!known) {
      return;
    }

    const found = this.spaces.find((e) => {
      // console.log(Math.floor(e.y / 5), y);
      if ((e.y === y || e.x === x) && !e.tile) {
        return true;
      }
      return false;
    });
    // console.log(found);
    if (found) {
      const getRange = (y: number, n2: number) => {
        const min = Math.min(y, n2);
        const max = Math.max(y, n2);
        const range = new Array(max - min + 1).fill(true).map((e, i) => {
          return min + i;
        });

        if (n2 > y) {
          range.reverse();
        }
        return range;
      };
      let moves = [];
      if (x === found.x) {
        const range = getRange(y, found.y);
        moves = range.map((e, i, arr) => {
          const next = arr[i + 1];
          if (typeof next === 'number') {
            return {
              from: { x, y: next },
              to: { x, y: e },
            };
          }
          return null;
        });
      } else {
        // 가로로 만 옮기기
        const range = getRange(x, found.x);
        moves = range.map((e, i, arr) => {
          const next = arr[i + 1];
          if (typeof next === 'number') {
            return {
              from: { y, x: next },
              to: { y, x: e },
            };
          }
          return null;
        });
      }
      let all = moves.map((e) => {
        return new Promise((resolve) => {
          if (e) {
            this.queuePush('MOVE', {
              from: {
                x: e.from.x,
                y: e.from.y,
              },
              to: {
                x: e.to.x,
                y: e.to.y,
              },
              done: () => resolve(true),
            });
          } else {
            resolve(true);
          }
        });
      });
      this.flush();

      await Promise.all(all);

      // _resolves();
      // {y: 4, x: 4, tile: undefined} {x: 4, y: 1}
    }

    // if ()

    // console.log('')
    // if (this.spaces)
    // 가로
    // const
    // if (this.space)
    // this.space
  };

  // putTile()
}
