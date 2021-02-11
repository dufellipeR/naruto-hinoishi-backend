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

  public async findAllUserCards(
    user_id: string,
    filter?: string,
    name?: string,
  ): Promise<IShortCard[]> {
    if (filter) {
      switch (filter) {
        case 'power': {
          const cards: IShortCard[] = await this.cardOrmRepository.query(
            `SELECT
            characters.type,
            characters.rendermarg,
            characters.name,
            stats.power,
            affiliation.pcolor,
            affiliation.scolor,
            characters.render,
            cards.id AS id,
            characters.id AS char_id,
            affiliation.icon
          FROM
            cards
            INNER JOIN characters ON cards.character_id = characters.id
            INNER JOIN stats ON characters.stat_id = stats.id
            INNER JOIN char_aft ON characters.id = char_aft.character_id
            INNER JOIN affiliation ON char_aft.affiliation_id = affiliation.id
          WHERE
            cards.user_id = '${user_id}'
          ORDER BY
            stats.power DESC
            `,
          );

          return cards;
        }

        case 'name': {
          const cards: IShortCard[] = await this.cardOrmRepository.query(
            `SELECT
            characters.type,
            characters.rendermarg,
            characters.name,
            stats.power,
            affiliation.pcolor,
            affiliation.scolor,
            characters.render,
            cards.id AS id,
            characters.id AS char_id,
            affiliation.icon
          FROM
            cards
            INNER JOIN characters ON cards.character_id = characters.id
            INNER JOIN stats ON characters.stat_id = stats.id
            INNER JOIN char_aft ON characters.id = char_aft.character_id
            INNER JOIN affiliation ON char_aft.affiliation_id = affiliation.id
          WHERE
            cards.user_id = '${user_id}'
          ORDER BY
            characters.name ASC
            `,
          );

          return cards;
        }

        case 'received': {
          const cards: IShortCard[] = await this.cardOrmRepository.query(
            `SELECT
            characters.type,
            characters.rendermarg,
            characters.name,
            stats.power,
            affiliation.pcolor,
            affiliation.scolor,
            characters.render,
            cards.id AS id,
            characters.id AS char_id,
            affiliation.icon
          FROM
            cards
            INNER JOIN characters ON cards.character_id = characters.id
            INNER JOIN stats ON characters.stat_id = stats.id
            INNER JOIN char_aft ON characters.id = char_aft.character_id
            INNER JOIN affiliation ON char_aft.affiliation_id = affiliation.id
          WHERE
            cards.user_id = '${user_id}'
          ORDER BY
            cards.created_at DESC
            `,
          );

          return cards;
        }
        default:
          break;
      }
    } else if (name) {
      const cards: IShortCard[] = await this.cardOrmRepository.query(
        `SELECT
        characters.type,
        characters.rendermarg,
        characters.name,
        stats.power,
        affiliation.pcolor,
        affiliation.scolor,
        characters.render,
        cards.id AS id,
        characters.id AS char_id,
        affiliation.icon
      FROM
        cards
        INNER JOIN characters ON cards.character_id = characters.id
        INNER JOIN stats ON characters.stat_id = stats.id
        INNER JOIN char_aft ON characters.id = char_aft.character_id
        INNER JOIN affiliation ON char_aft.affiliation_id = affiliation.id
      WHERE
        cards.user_id = '${user_id}' AND characters.name = '${name}'
      ORDER BY
        cards.created_at DESC
        `,
      );

      return cards;
    }
    const cards: IShortCard[] = await this.cardOrmRepository.query(
      `SELECT
      characters.type,
      characters.rendermarg,
      characters.name,
      stats.power,
      affiliation.pcolor,
      affiliation.scolor,
      characters.render,
      cards.id AS id,
      characters.id AS char_id,
      affiliation.icon
    FROM
      cards
      INNER JOIN characters ON cards.character_id = characters.id
      INNER JOIN stats ON characters.stat_id = stats.id
      INNER JOIN char_aft ON characters.id = char_aft.character_id
      INNER JOIN affiliation ON char_aft.affiliation_id = affiliation.id
    WHERE
      cards.user_id = '${user_id}'
    ORDER BY
      cards.created_at DESC
      `,
    );

    return cards;
  }
}

export default CardsRepository;
