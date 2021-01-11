import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import ICreateRandomCardDTO from '@modules/cards/dtos/ICreateRandomCardDTO';
import IShortCard from '@modules/cards/dtos/IShortCard';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { IPickModel } from '@shared/utils/randomPick';
import { getRepository, Repository } from 'typeorm';
import Card from '../entities/Card';

class CardsRepository implements ICardsRepository {
  private cardOrmRepository: Repository<Card>;

  constructor() {
    this.cardOrmRepository = getRepository(Card);
  }

  public async create({
    character_id,
    user_id,
  }: ICreateCardDTO): Promise<Card> {
    const card = this.cardOrmRepository.create({
      character_id,
      user_id,
    });

    await this.cardOrmRepository.save(card);

    return card;
  }

  public async randomCreate({
    characters_id,
    user_id,
  }: ICreateRandomCardDTO): Promise<Card[]> {
    const cards: Card[] = [];
    characters_id.forEach(char_id => {
      cards.push(
        this.cardOrmRepository.create({
          character_id: char_id,
          user_id,
        }),
      );
    });

    await this.cardOrmRepository.save(cards);

    return cards;
  }

  public async findAllIds(): Promise<IPickModel[]> {
    const characters = await this.cardOrmRepository.query(
      `SELECT characters.id, stats.power
      FROM characters
      INNER JOIN stats on characters.stat_id=stats.id
       `,
    );
    return characters;
  }

  public async findAllUserCards(user_id: string): Promise<IShortCard[]> {
    const cards = await this.cardOrmRepository.query(
      `SELECT
      cards.id,
      characters.render,
      characters.type,
      characters.name, stats.power
    FROM
      cards
    INNER JOIN characters
        ON cards.character_id = characters.id
    INNER JOIN stats
        ON characters.stat_id = stats.id
    WHERE cards.user_id='${user_id}'
      `,
    );

    return cards;
  }
}

export default CardsRepository;
