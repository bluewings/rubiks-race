import seedrandom from 'seedrandom';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, Direction } from './constants';
import { Tile, getTiles } from './Tile';
import { GameBase } from './GameBase';

interface RubiksRaceOptions {
  numberOfColumns: number;
  numberOfRows: number;
  seed?: string;
}

export class RubiksRace {
  numberOfRows: number;
  numberOfColumns: number;
  tiles: Tile[];
  gameBase: GameBase;

  constructor(options?: RubiksRaceOptions) {
    this.numberOfRows = options?.numberOfRows || NUMBER_OF_ROWS;
    this.numberOfColumns = options?.numberOfColumns || NUMBER_OF_COLUMNS;

    this.random = seedrandom(options?.seed || Math.random().toString(36));

    this.tiles = getTiles(this.numberOfRows * this.numberOfColumns - 1, this.random);

    this.gameBase = new GameBase({
      numberOfRows: this.numberOfRows,
      numberOfColumns: this.numberOfColumns,
      tiles: this.tiles,
    });
  }

  private random: () => number;

  shuffle = async () => {
    const ntimes = this.numberOfRows * this.numberOfColumns * 3;

    let direction = Direction.Vertical;
    for (let i = 0; i < ntimes; i++) {
      direction = direction === Direction.Vertical ? Direction.Horizontal : Direction.Vertical;
      const movables = this.gameBase.getMovable(direction);
      if (movables) {
        let pickOne = movables[Math.floor(this.random() * movables.length)];
        if (pickOne) {
          await this.gameBase.canMove(pickOne.x, pickOne.y);
        }
      }
    }
    await this.setReady();
  };

  setReady = async () => {
    let empty = this.gameBase.emptySpace();
    console.log(empty);

    if (empty && empty.y !== this.numberOfRows - 1) {
      console.log(empty?.y, this.numberOfRows - 1);
      await this.gameBase.canMove(empty?.x, this.numberOfRows - 1);
    }
    empty = this.gameBase.emptySpace();
    if (empty && empty.x !== this.numberOfColumns - 1) {
      // console.log(empty?.x, this.numberOfColumns - 1);
      await this.gameBase.canMove(this.numberOfColumns - 1, this.numberOfRows - 1);
    }
  };
}
