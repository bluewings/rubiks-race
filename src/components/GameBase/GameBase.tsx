import React, { useState, useMemo, useEffect } from 'react';
import styles from './GameBase.module.scss';
import Tile from '../Tile';
import { RubiksRace } from '../../lib/RubiksRace';
import { Direction } from '../../lib/constants';

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
      new RubiksRace({
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
  const handleTileClick = (x: number, y: number) => {
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

  const handleShuffleClick = () => {
    // console.log()
    game.shuffle();
    // game.setReady();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log(event);
      let direction: Direction | undefined;

      switch (event.key) {
        case 'Down': // IE/Edge specific value
        case 'ArrowDown':
          direction = Direction.Down;
          // Do something for "down arrow" key press.
          break;
        case 'Up': // IE/Edge specific value
        case 'ArrowUp':
          direction = Direction.Up;
          // Do something for "up arrow" key press.
          break;
        case 'Left': // IE/Edge specific value
        case 'ArrowLeft':
          direction = Direction.Left;
          // Do something for "left arrow" key press.
          break;
        case 'Right': // IE/Edge specific value
        case 'ArrowRight':
          direction = Direction.Right;
          // Do something for "right arrow" key press.
          break;
      }
      if (direction) {
        // console.log(direction);
        game.gameBase.move(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game]);

  return (
    <div className={styles.root}>
      {/* <input onKey/> */}
      <h4>{tick}</h4>
      <button onClick={handleShuffleClick}>shuffle</button>
      <div style={{ position: 'relative' }}>
        {game.tiles.map(({ id, color, x, y }) => (
          <Tile key={id} x={x} y={y} color={color} onClick={handleTileClick} />
        ))}
      </div>
      {/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
      {/* {tiles.map((e, i) => {
        return <Tile key={i} color={e.color} />;
      })} */}
    </div>
  );
}

export default GameBase;
