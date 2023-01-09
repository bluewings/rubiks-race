import { Color } from './constants';
import { Observer } from './Observer';

let seq = 0;

export enum Event {
  MoveStart = 'MOVE_START',
  Move = 'MOVE',
  MoveEnd = 'MOVE_END',
}

export class Tile extends Observer<Event> {
  id: string;
  color: Color;
  x?: number;
  y?: number;

  constructor({ color }: { color: Color }) {
    super();
    this.id = `${seq++}`;
    this.color = color;
  }

  setPosition = (x: number, y: number) => {
    if (this.x !== x || this.y !== y) {
      this.x = x;
      this.y = y;
      this.publish(Event.Move, {});
    }
  };
}

export const getTiles = (numberOfTiles: number, shuffleFn?: () => number) => {
  const colors = Object.values(Color);

  let tiles = Array(numberOfTiles)
    .fill(true)
    .map((_, i) => new Tile({ color: colors[i % colors.length] }));

  if (shuffleFn) {
    tiles = tiles
      .map((tile) => ({ tile, _: shuffleFn() }))
      .sort(({ _: a }, { _: b }) => a - b)
      .map(({ tile }) => tile);
  }

  return tiles;
};
