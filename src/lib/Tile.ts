import { Color } from './constants';

let seq = 0;

export class Tile {
  id: string;
  color: Color;
  x?: number;
  y?: number;

  constructor({ color }: { color: Color }) {
    this.id = `${seq++}`;
    this.color = color;
  }

  setPosition = (x: number, y: number) => {
    this.x = x;
    this.y = y;
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
