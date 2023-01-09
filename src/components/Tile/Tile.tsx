import React, { useEffect, useState } from 'react';
// import { yellow, orange, red, blue, green, grey } from '@ant-design/colors';
import styles from './Tile.module.scss';
// import { Tile as TileClass } from '../../lib/GameBase';
import { Color } from '../../lib/constants';
import { Tile as TileClass } from '../../lib/Tile';

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
  tile: TileClass;
  // color: Color;
  // x?: number;
  // y?: number;
  onPress: (x: number, y: number) => any;
  // x÷
}

/**
 * Component Description
 */
function Tile(props: TileProps) {
  const { tile } = props;
  const x = tile.x;
  const y = tile.y;
  const color = tile.color;
  const [, setTick] = useState(0);

  useEffect(() => {
    tile.subscribe(() => {
      console.log('>>> 1');
      setTick((tick) => tick + 1);
    });
  }, [tile]);

  if (typeof x === 'number' && typeof y === 'number') {
    // const handleClick = () => {
    //   alert(`${props.x} ${props.y}`);
    // };
    return (
      <div
        className={styles.root}
        style={{
          backgroundColor: colors[color],
          borderColor: colors[color],
          top: y * 55,
          left: x * 55,
        }}
        onPointerDown={() => {
          props.onPress(x, y);
        }}
        // onClick={() => {
        //   props.onPress(x, y);
        // }}
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
