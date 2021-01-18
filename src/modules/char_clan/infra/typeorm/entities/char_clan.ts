import Character from '@modules/characters/infra/typeorm/entities/Characters';
import Clan from '@modules/clan/infra/typeorm/entities/Clan';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity('char_clan')
class Char_clan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clan_id: string;

  @ManyToOne(() => Clan)
  @JoinColumn({ name: 'clan_id' })
  clan: Clan;

  @Column()
  character_id: string;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;
}

export default Char_clan;
