// import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IShortCard from '../dtos/IShortCard';
import ICardsRepository from '../repositories/ICardsRepository';

@injectable()
export default class ListUserCardsService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute(
    user_id: string,
    filter?: string,
    name?: string,
  ): Promise<IShortCard[]> {
    const cards = await this.cardsRepository.findAllUserCards(
      user_id,
      filter,
      name,
    );

    return cards;
  }
}
