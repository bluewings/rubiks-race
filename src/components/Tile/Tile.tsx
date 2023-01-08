import React from 'react';
// import { yellow, orange, red, blue, green, grey } from '@ant-design/colors';
import styles from './Tile.module.scss';
// import { Tile as TileClass } from '../../lib/GameBase';
import { Color } from '../../lib/constants';

// https://colorswall.com/palette/171
// const colors = {
//   [Color.White]: grey,
//   [Color.Yellow]: yellow,
//   [Color.Orange]: orange,
//   [Color.Red]: red,
//   [Color.Green]: green,
//   [Color.Blue]: blue,
// };

const colors = {
  // [Color.White]: `rgb(255, 255, 255)	`,
  // [Color.Yellow]: `rgb(255, 213, 0)	`,
  // [Color.Orange]: `rgb(255, 88, 0)`,
  // [Color.Red]: `rgb(183, 18, 52)`,
  // [Color.Green]: `rgb(0, 155, 72)`,
  // [Color.Blue]: `rgb(0, 70, 173)`,

  [Color.White]: `rgb(255, 255, 255)`,
  [Color.Yellow]: `rgb(255, 225, 2)`,
  [Color.Orange]: `rgb(240, 124, 0)`,
  [Color.Red]: `rgb(229, 0, 38)`,
  [Color.Green]: `rgb(4, 162, 57)`,
  [Color.Blue]: `rgb(0, 82, 162)`,
};

interface TileProps {
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
function Tile(props: TileProps) {
  if (typeof props.x === 'number' && typeof props.y === 'number') {
    // const handleClick = () => {
    //   alert(`${props.x} ${props.y}`);
    // };
    return (
      <div
        className={styles.root}
        style={{
          backgroundColor: colors[props.color],
          borderColor: colors[props.color],
          top: props.y * 55,
          left: props.x * 55,
        }}
        onClick={() => {
          props.onClick(props.x, props.y);
        }}
      >
        {/* <h3>
          {props.x} / {props.y}
        </h3> */}
      </div>
    );
  }
  return null;
}

export default Tile;
