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
