import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
}

export default function overallCalc({
  strength,
  intelligence,
  speed,
  taijutsu,
  ninjutsu,
  genjutsu,
  stamina,
  willpower,
}: IRequestDTO): number {
  const maxNumber = Math.max(
    strength,
    intelligence,
    speed,
    taijutsu,
    ninjutsu,
    genjutsu,
    stamina,
    willpower,
  );

  if (maxNumber > 99) {
    throw new AppError(
      'Your character should not have more than 99 on any stat',
    );
  }

  const total =
    strength +
    speed +
    intelligence +
    taijutsu +
    ninjutsu +
    genjutsu +
    stamina +
    willpower;

  const power = Math.round(total / 8);
  return power;
}
