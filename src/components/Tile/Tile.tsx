import React from 'react';
import styles from './Tile.module.scss';
import { Tile as TileClass, Color } from '../../lib/Game';
// import { isAnyArrayBuffer } from 'util/types';
// import

// const type
// type Aaa = (typeof  Game)

// type AnimalConstructor<T> = new (name: string) => T

// let a : Aaa

// type Aaa = typeof TileClass;

// const a: Aaa;
// TileClass.
// TileClass.

interface ITileProps {
  /**
   * Prop Description
   */
  // message?: string;
  color: Color;
  x?: number;
  y?: number;
  onClick: Function;
  // x÷
}

/**
 * Component Description
 */
function Tile(props: ITileProps) {
  if (typeof props.x === 'number' && typeof props.y === 'number') {
    // const handleClick = () => {
    //   alert(`${props.x} ${props.y}`);
    // };
    return (
      <div
        className={styles.root}
        style={{
          background: props.color,
          top: props.y * 50,
          left: props.x * 50,
        }}
        onClick={() => {
          props.onClick(props.x, props.y);
        }}
      >
        <h3>
          {props.x} / {props.y}
        </h3>
      </div>
    );
  }
  return null;
}

export default Tile;
