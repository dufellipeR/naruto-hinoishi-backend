export default interface ICreateCharacterDTO {
  render?: string;
  type: string;
  name: string;
  desc?: string;
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
  power?: number;
}
