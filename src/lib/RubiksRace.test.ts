import { RubiksRace } from './RubiksRace';
import { Color } from './constants';

test('game setup', () => {
  const game = new RubiksRace();

  // 전체 타일의 개수는 24개
  expect(game.tiles.length).toBe(24);

  const countByColor = game.tiles.reduce(
    (accum, { color }) => ({
      ...accum,
      [color]: (accum[color] || 0) + 1,
    }),
    {} as Record<Color, number>,
  );

  // 타일은 6가지 색상으로 이루어져있어야하고
  expect(Object.keys(countByColor).length).toBe(6);

  // 색상별 타일은 4개씩이어야함
  Object.values(countByColor).forEach((e) => {
    expect(e).toBe(4);
  });
});
