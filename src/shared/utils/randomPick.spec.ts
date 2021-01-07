import randomPick from './randomPick';

describe(' Random Pick', () => {
  it('should be able to return a bunch of random picks', () => {
    const quantity = 10;
    const allIds = [
      { id: 'a', overall: 99 },
      { id: 'b', overall: 99 },
      { id: 'c', overall: 10 },
    ];

    const picks = randomPick({ quantity, allIds });
    expect(picks).toHaveLength(10);
  });
});
