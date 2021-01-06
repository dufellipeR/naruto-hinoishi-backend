import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  power: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  endurance: number;
  willpower: number;
}

export default function overallCalc({
  power,
  intelligence,
  speed,
  taijutsu,
  ninjutsu,
  genjutsu,
  endurance,
  willpower,
}: IRequestDTO): number {
  const maxNumber = Math.max(
    power,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    endurance,
    willpower,
  );

  if (maxNumber > 99) {
    throw new AppError(
      'Your character should not have more than 99 on any stat',
    );
  }

  const total =
    power +
    speed +
    intelligence +
    taijutsu +
    ninjutsu +
    genjutsu +
    endurance +
    willpower;

  const overall = Math.round(total / 8);
  return overall;
}
