export default interface IUpdateCharacterDTO {
  id: string;
  render: string;
  type: string;
  name: string;
  desc: string;
  stat_id: string;
  strength: number;
  intelligence: number;
  speed: number;
  taijutsu: number;
  ninjutsu: number;
  genjutsu: number;
  stamina: number;
  willpower: number;
  power: number;
}
