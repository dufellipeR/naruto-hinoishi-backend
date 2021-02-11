import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Stat from './Stat';

@Entity('characters')
class Character {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  render: string;

  @Column()
  rendermarg: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  stat_id: string;

  @ManyToOne(() => Stat, { eager: true })
  @JoinColumn({ name: 'stat_id' })
  stat: Stat;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Character;
