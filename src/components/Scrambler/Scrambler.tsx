import React from 'react';
import styles from './Scrambler.module.scss';
import { Color } from '../../lib/constants';

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

interface IScramblerProps {
  /**
   * Prop Description
   */
  // message?: string;
  spaces: {
    x: number;
    y: number;
    color: Color;
  }[];
}

/**
 * Component Description
 */
function Scrambler(props: IScramblerProps) {
  const { spaces } = props;
  return (
    <div className={styles.root}>
      {spaces.map((e, i) => {
        const { x, y } = e;
        return (
          <div
            className={styles.cube}
            style={{
              top: x * 20,
              left: y * 20,
              backgroundColor: colors[e.color],
            }}
          />
        );
      })}
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  );
}

export default Scrambler;
