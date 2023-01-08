import seedrandom from 'seedrandom';
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, Direction } from './constants';
import { Tile, getTiles } from './Tile';
import { GameBase, Event as GameBaseEvent } from './GameBase';
import { Scrambler, Event as ScrambleEvent } from './Scrambler';
import { Observer } from './Observer';
// import
import { range, Observable, from, merge } from 'rxjs';

interface RubiksRaceOptions {
  numberOfColumns: number;
  numberOfRows: number;
  seed?: string;
}

export enum Event {}
// MoveStart = 'MOVE_START',
// Move = 'MOVE',
// MoveEnd = 'MOVE_END',

export class RubiksRace extends Observer<Event> {
  numberOfRows: number;
  numberOfColumns: number;
  tiles: Tile[];
  gameBase: GameBase;
  scrambler: Scrambler;

  constructor(options?: RubiksRaceOptions) {
    super();
    this.numberOfRows = options?.numberOfRows || NUMBER_OF_ROWS;
    this.numberOfColumns = options?.numberOfColumns || NUMBER_OF_COLUMNS;

    const seed = options?.seed || Math.random().toString(36);

    this.random = seedrandom(seed);

    this.tiles = getTiles(this.numberOfRows * this.numberOfColumns - 1, this.random);

    this.gameBase = new GameBase({
      numberOfRows: this.numberOfRows,
      numberOfColumns: this.numberOfColumns,
      tiles: this.tiles,
    });

    this.scrambler = new Scrambler({ seed });

    // this.subscribe('')

    // merge()
    // console.log()
    // const checkResult
    const handleCheck = (data: any) => {
      console.log('check!!!', data);
      // handleCheck
    };

    // this.gameBase.subscribe(GameBaseEvent.MoveEnd, handleCheck);
    this.gameBase.subscribe(GameBaseEvent.MoveEnd, handleCheck);
    this.scrambler.subscribe(ScrambleEvent.Scramble, handleCheck);
  }

  private random: () => number;

  scramble = async () => {
    this.scrambler.shuffle();
  };

  shuffle = async () => {
    const ntimes = this.numberOfRows * this.numberOfColumns * 3;

    let direction = Direction.Vertical;
    for (let i = 0; i < ntimes; i++) {
      direction = direction === Direction.Vertical ? Direction.Horizontal : Direction.Vertical;
      const movables = this.gameBase.getMovable(direction);
      if (movables) {
        let pickOne = movables[Math.floor(this.random() * movables.length)];
        if (pickOne) {
          await this.gameBase.moveFrom(pickOne.x, pickOne.y);
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
      await this.gameBase.moveFrom(empty?.x, this.numberOfRows - 1);
    }
    empty = this.gameBase.emptySpace();
    if (empty && empty.x !== this.numberOfColumns - 1) {
      // console.log(empty?.x, this.numberOfColumns - 1);
      await this.gameBase.moveFrom(this.numberOfColumns - 1, this.numberOfRows - 1);
    }
  };
}
