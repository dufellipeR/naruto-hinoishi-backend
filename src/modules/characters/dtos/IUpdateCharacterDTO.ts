export default interface IUpdateCharacterDTO {
  id: string;
  thumbnail: string;
  type: string;
  name: string;
  desc: string;
  stat_id: string;
  power: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  endurance: number;
  willpower: number;
  overall: number;
}
