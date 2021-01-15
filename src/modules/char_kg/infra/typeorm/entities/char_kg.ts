import Character from '@modules/characters/infra/typeorm/entities/Characters';
import Kekkei_genkai from '@modules/kekkei/infra/typeorm/entities/Kekkei_genkai';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity('char_kg')
class Char_kg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  kekkei_id: string;

  @ManyToOne(() => Kekkei_genkai)
  @JoinColumn({ name: 'kekkei_id' })
  kekkei: Kekkei_genkai;

  @Column()
  character_id: string;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;
}

export default Char_kg;
