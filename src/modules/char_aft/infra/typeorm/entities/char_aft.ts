import Affiliation from '@modules/affiliation/infra/typeorm/entities/Affiliation';
import Character from '@modules/characters/infra/typeorm/entities/Characters';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity('char_aft')
class Char_aft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  affiliation_id: string;

  @ManyToOne(() => Affiliation)
  @JoinColumn({ name: 'affiliation_id' })
  affiliation: Affiliation;

  @Column()
  character_id: string;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;
}

export default Char_aft;
