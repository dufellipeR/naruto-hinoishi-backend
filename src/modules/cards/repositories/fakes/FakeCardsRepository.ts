import ICreateCardDTO from '@modules/cards/dtos/ICreateCardDTO';
import ICreateRandomCardDTO from '@modules/cards/dtos/ICreateRandomCardDTO';
import IShortCard from '@modules/cards/dtos/IShortCard';
import Card from '@modules/cards/infra/typeorm/entities/Card';
import { IPickModel } from '@shared/utils/randomPick';
import { v4 as uuid } from 'uuid';
import ICardsRepository from '../ICardsRepository';

class FakeCardsRepository implements ICardsRepository {
  private cards: Card[] = [];

  public async create({
    character_id,
    user_id,
  }: ICreateCardDTO): Promise<Card> {
    const card = new Card();

    Object.assign(card, {
      id: uuid(),
      character_id,
      user_id,
    });

    this.cards.push(card);

    return card;
  }

  public async randomCreate({
    characters_id,
    user_id,
  }: ICreateRandomCardDTO): Promise<Card[]> {
    const cards: Card[] = [];
    let card: Card;
    characters_id.forEach(char_id => {
      card = new Card();

      cards.push(
        Object.assign(card, {
          id: uuid(),
          character_id: char_id,
          user_id,
        }),
      );
    });

    return cards;
  }

  public async findAllIds(): Promise<IPickModel[]> {
    const cardIds: IPickModel[] = [];

    this.cards.forEach(card => {
      cardIds.push({ id: card.id, overall: 50 });
    });

    return cardIds;
  }

  public async findAllUserCards(user_id: string): Promise<IShortCard[]> {
    const searchCards = this.cards.filter(card => card.user_id === user_id);
    const shortcards: IShortCard[] = searchCards.map(card => {
      return {
        id: card.id,
        thumbnail: 'char-thumbnail',
        type: 'default',
        name: 'char-name',
        overall: 90,
      };
    });
    return shortcards;
  }
}

export default FakeCardsRepository;
