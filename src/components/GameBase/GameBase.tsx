import React, { useState, useMemo, useEffect } from 'react';
import styles from './GameBase.module.scss';
import Tile from '../Tile';
import { Game } from '../../lib/Game';

interface IGameBaseProps {
  /**
   * Prop Description
   */
  message?: string;
}

// enum Color {

// }

// const

// const colors = ['blue', 'green', 'red', 'orange', 'yellow', 'white'];

// const tiles = new Array(24)
//   .fill(true)
//   .map((e, i) => {
//     return {
//       color: colors[i % colors.length],
//       sortKey: Math.random(),
//     };
//   })
//   .sort((_a, _b) => {
//     const a = _a.sortKey;
//     const b = _b.sortKey;
//     return a === b ? 0 : a < b ? -1 : 1;
//   });

/**
 * Component Description
 */
function GameBase(props: IGameBaseProps) {
  const game = useMemo(
    () =>
      new Game({
        numberOfColumns: 5,
        numberOfRows: 5,
      }),
    [],
  );
  const [board, setBoard] = useState(() => {
    return new Array(5).fill(true).map((e) => {
      return new Array(5).fill(true);
    });
  });

  // game.gameBase.
  const handleClick = (x: number, y: number) => {
    // alert
    game.gameBase.canMove(x, y);
  };

  const [tick, setTick] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTick((tick) => tick + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  useEffect(() => {
    // game.subs
    const unsubscribe = game.gameBase.subscribe(() => {
      setTick((tick) => tick + 1);
    });
    // game.shuffleAlt();
    // setTimeout(() => {

    // }, 100)
    return () => {
      unsubscribe();
    };
  }, [game.gameBase]);

  const handleClick2 = () => {
    // console.log()
    game.shuffleAlt();
    // game.setReady();
  };

  return (
    <div className={styles.root}>
      <h4>{tick}</h4>
      <button onClick={handleClick2}>shuffle</button>
      <div style={{ position: 'relative' }}>
        {game.tiles.map((e) => {
          return <Tile {...e} onClick={handleClick} />;
        })}
      </div>
      <pre>{JSON.stringify(game, null, 2)}</pre>
      {/* {tiles.map((e, i) => {
        return <Tile key={i} color={e.color} />;
      })} */}
    </div>
  );
}

export default GameBase;
