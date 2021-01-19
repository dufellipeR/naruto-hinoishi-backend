import Character from '@modules/characters/infra/typeorm/entities/Characters';
import Team from '@modules/team/infra/typeorm/entities/Team';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity('char_team')
class Char_team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  team_id: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column()
  character_id: string;

  @ManyToOne(() => Character)
  @JoinColumn({ name: 'character_id' })
  character: Character;
}

export default Char_team;
