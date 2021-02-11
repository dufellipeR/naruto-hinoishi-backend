import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity('affiliation')
class Affiliation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

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

  @Column()
  pcolor: string;

  @Column()
  scolor: string;
}

export default Affiliation;
