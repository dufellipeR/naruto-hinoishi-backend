import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import uploadConfig from '@config/upload';

// import { Exclude, Expose } from 'class-transformer';

@Entity('stats')
class Stat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  strength: number;

  @Column('int')
  intelligence: number;

  @Column('int')
  speed: number;

  @Column('int')
  taijutsu: number;

  @Column('int')
  ninjutsu: number;

  @Column('int')
  genjutsu: number;

  @Column('int')
  stamina: number;

  @Column('int')
  willpower: number;

  @Column('int')
  power: number;
}

export default Stat;
