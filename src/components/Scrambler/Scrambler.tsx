import React, { useState, useEffect } from 'react';
import styles from './Scrambler.module.scss';
import { Color } from '../../lib/constants';
import { Scrambler as ScramblerClass } from '../../lib/Scrambler';

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
  scrambler: ScramblerClass;
}

/**
 * Component Description
 */
function Scrambler(props: IScramblerProps) {
  const { scrambler } = props;
  const [tick, setTick] = useState(0);
  useEffect(() => {
    // game.subs
    const unsubscribe = scrambler.subscribe(() => {
      setTick((tick) => tick + 1);
    });
    // game.shuffleAlt();
    // setTimeout(() => {

    // }, 100)
    return () => {
      unsubscribe();
    };
  }, [scrambler]);

  return (
    <div className={styles.root}>
      {scrambler.patterns.map((e, i) => {
        const { x, y } = e;
        return (
          <div
            key={i}
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
