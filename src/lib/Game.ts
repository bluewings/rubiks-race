// var seedrandom = require('seedrandom');
import { format } from 'path';
import seedrandom from 'seedrandom';

export enum Color {
  White = 'WHITE',
  Yellow = 'YELLOW',
  Orange = 'ORANGE',
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

enum Direction {
  Vertical = 'VERTICAL',
  Horizontal = 'HORIZONTAL',
}

const colors = Object.values(Color);

const NUMBER_OF_ROWS = 5;
const NUMBER_OF_COLUMNS = 5;

export class Tile {
  // key: string;
  color: Color;
  x?: number;
  y?: number;

  constructor({ color }: { color: Color }) {
    // this.key = rng().toString(36).slice(-8);
    this.color = color;
  }

  setPosition = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  };
}

interface GameBaseOptions2 {
  numberOfRows: number;
  numberOfColumns: number;
  tiles: Tile[];
}

class GameBase {
  spaces: {
    x: number;
    y: number;
    tile?: Tile;
  }[];

  spaces_?: Record<string, any>;

  numberOfRows: number;
  numberOfColumns: number;

  constructor({ numberOfRows, numberOfColumns, tiles }: GameBaseOptions2) {
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
  }

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
    this._resolves.push(callback);
    return () => {
      this._resolves = this._resolves.filter((e) => e !== callback);
    };
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
    this._timer = setInterval(handle, 20);
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
    this._resolves.forEach((e) => e());
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

  canMove = async (x: number, y: number) => {
    // alert(`${x} / ${y} / ${this.toIndex(x, y)}`);
    // const index = this.toIndex(x, y);
    const found = this.spaces.find((e) => {
      // console.log(Math.floor(e.y / 5), y);
      if ((e.y === y || e.x === x) && !e.tile) {
        return true;
      }
      return false;
    });
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

interface GameBaseOptions {
  numberOfColumns: number;
  numberOfRows: number;
}

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};

class Game {
  tiles: Tile[];
  gameBase: GameBase;

  setReady = async () => {
    let empty = this.gameBase.emptySpace();
    console.log(empty);

    // if (emp)

    if (empty && empty.y !== this.numberOfRows - 1) {
      console.log(empty?.y, this.numberOfRows - 1);
      await this.gameBase.canMove(empty?.x, this.numberOfRows - 1);
    }
    empty = this.gameBase.emptySpace();
    // await wait();
    if (empty && empty.x !== this.numberOfColumns - 1) {
      // console.log(empty?.x, this.numberOfColumns - 1);
      await this.gameBase.canMove(this.numberOfColumns - 1, this.numberOfRows - 1);
    }
    // empty
    // const movables = (this.gameBase.getMovable(Direction.Vertical))
    // ?.find()
    // console.log(movables);
    // if
  };

  shuffleAlt = async (seed = '') => {
    // console.log('shuffle alt');

    const ntimes = this.numberOfRows * this.numberOfColumns * 3;

    let direction = Direction.Vertical;
    // const rng = seedrandom(seed);

    // Array[Sy
    for (let i = 0; i < ntimes; i++) {
      direction = direction === Direction.Vertical ? Direction.Horizontal : Direction.Vertical;
      const movables = this.gameBase.getMovable(direction);
      if (movables) {
        let pickOne = movables[Math.floor(this.rnd() * movables.length)];

        // if (i + 3 > ntimes &&
        //   movables[]
        //   ) {
        //   // console.log('last two');
        //   //
        //   // console.log(movables);
        //   // if ()

        //   // pickOne = movables.pop();
        // } else {
        //   pickOne = movables[Math.floor(this.rnd() * movables.length)];
        // }
        if (pickOne) {
          await this.gameBase.canMove(pickOne.x, pickOne.y);
        }

        // await wait();
        // // this.gameBase
        // console.log('pickOne', pickOne);
        // console.log(movables);
        // } else {
        //   console.log('no movables');
      }

      // );
    }
    await this.setReady();

    // this.gameBase.
  };

  shuffle = (seed = '') => {
    const rng = seedrandom(seed);

    this.tiles = this.tiles
      .map((e) => {
        return {
          key: rng(),
          tile: e,
        };
      })
      .sort((a, b) => {
        return a.key === b.key ? 0 : a.key < b.key ? -1 : 1;
      })
      .map(({ tile }) => tile);
  };
  numberOfColumns: number;
  numberOfRows: number;

  // rnd:

  rnd: () => number;

  constructor(options?: GameBaseOptions) {
    this.numberOfRows = options?.numberOfRows || NUMBER_OF_ROWS;
    this.numberOfColumns = options?.numberOfColumns || NUMBER_OF_COLUMNS;

    this.rnd = seedrandom('');
    // rng();

    this.tiles = new Array(this.numberOfRows * this.numberOfColumns - 1).fill(true).map(
      (_, i) =>
        new Tile({
          color: colors[i % colors.length],
        }),
    );

    this.gameBase = new GameBase({
      numberOfRows: this.numberOfRows,
      numberOfColumns: this.numberOfColumns,
      tiles: this.tiles,
    });
  }

  // thils
  setup = () => {
    // this.
  };
}

export { Game };
