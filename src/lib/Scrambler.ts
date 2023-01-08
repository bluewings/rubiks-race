import seedrandom from 'seedrandom';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, Direction, Color } from './constants';
import { Tile, getTiles } from './Tile';
// import { GameBase, } from './GameBase';

// interface RubiksRaceOptions {
//   numberOfColumns: number;
//   numberOfRows: number;
//   seed?: string;
// }

// const

const numberOfRows = 3;
const numberOfColumns = 3;

interface RubiksRaceOptions {
  // numberOfColumns: number;
  // numberOfRows: number;
  seed: string;
}

export class Scrambler {
  spaces: {
    x: number;
    y: number;
    color: Color;
  }[];
  // numberOfRows: number;
  // numberOfColumns: number;
  // tiles: Tile[];
  // gameBase: GameBase;
  private random: () => number;
  constructor({ seed }: RubiksRaceOptions) {
    this.random = seedrandom(seed);

    const shuffle = (arr: any[], random: () => number) => {
      return arr
        .map((tile) => ({ tile, _: random() }))
        .sort(({ _: a }, { _: b }) => a - b)
        .map(({ tile }) => tile);
    };

    const colors = shuffle(
      Object.values(Color)
        .map((e) => {
          return Array(4).fill(e);
        })
        .flat(),
      this.random,
    );

    // console.log(colors);

    // seedrandom();

    // .array()

    this.spaces = new Array(numberOfRows * numberOfColumns).fill(true).map((_, i) => {
      // return null;
      const y = Math.floor(i / numberOfColumns);
      const x = i % numberOfColumns;

      return {
        y,
        x,
        color: colors.shift(),
        // tile: _tiles.shift(),
      };
    });

    // this.numberOfRows = options?.numberOfRows || NUMBER_OF_ROWS;
    // this.numberOfColumns = options?.numberOfColumns || NUMBER_OF_COLUMNS;
    // this.random = seedrandom(options?.seed || Math.random().toString(36));
    // this.tiles = getTiles(this.numberOfRows * this.numberOfColumns - 1, this.random);
    // this.gameBase = new GameBase({
    //   numberOfRows: this.numberOfRows,
    //   numberOfColumns: this.numberOfColumns,
    //   tiles: this.tiles,
    // });
  }

  // private random: () => number;

  // shuffle = async () => {
  //   const ntimes = this.numberOfRows * this.numberOfColumns * 3;

  //   let direction = Direction.Vertical;
  //   for (let i = 0; i < ntimes; i++) {
  //     direction = direction === Direction.Vertical ? Direction.Horizontal : Direction.Vertical;
  //     const movables = this.gameBase.getMovable(direction);
  //     if (movables) {
  //       let pickOne = movables[Math.floor(this.random() * movables.length)];
  //       if (pickOne) {
  //         await this.gameBase.moveFrom(pickOne.x, pickOne.y);
  //       }
  //     }
  //   }
  //   await this.setReady();
  // };

  // setReady = async () => {
  //   let empty = this.gameBase.emptySpace();
  //   console.log(empty);

  //   if (empty && empty.y !== this.numberOfRows - 1) {
  //     console.log(empty?.y, this.numberOfRows - 1);
  //     await this.gameBase.moveFrom(empty?.x, this.numberOfRows - 1);
  //   }
  //   empty = this.gameBase.emptySpace();
  //   if (empty && empty.x !== this.numberOfColumns - 1) {
  //     // console.log(empty?.x, this.numberOfColumns - 1);
  //     await this.gameBase.moveFrom(this.numberOfColumns - 1, this.numberOfRows - 1);
  //   }
  // };
}
