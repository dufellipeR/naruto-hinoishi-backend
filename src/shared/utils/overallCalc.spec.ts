import overallCalc from './overallCalc';

describe(' Calculating Overall', () => {
  it('should be able to return an overall', () => {
    const strength = 80;
    const intelligence = 90;
    const speed = 80;
    const taijutsu = 80;
    const ninjutsu = 40;
    const genjutsu = 80;
    const stamina = 80;
    const willpower = 10;

    const total = 80 + 40 + 80 + 80 + 10 + 80 + 80 + 90;

    const media = Math.round(total / 8);

    expect(
      overallCalc({
        strength,
        intelligence,
        speed,
        taijutsu,
        ninjutsu,
        genjutsu,
        stamina,
        willpower,
      }),
    ).toEqual(media);
  });

  // it('should not be able to have any stat 99+', () => {
  //   const power = 101;
  //   const intelligence = 80;
  //   const speed = 70;
  //   const taijutsu = 99;
  //   const ninjutsu = 99;
  //   const genjutsu = 99;
  //   const endurance = 99;
  //   const willpower = 99;

  //   expect(
  //     overallCalc({
  //       power,
  //       intelligence,
  //       speed,
  //       taijutsu,
  //       ninjutsu,
  //       genjutsu,
  //       endurance,
  //       willpower,
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
