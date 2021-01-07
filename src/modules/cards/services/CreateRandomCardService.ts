import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import randomPick, { IPickModel } from '@shared/utils/randomPick';
import Card from '../infra/typeorm/entities/Card';
import ICardsRepository from '../repositories/ICardsRepository';

interface IRequestDTO {
  quantity: number;
  user_id: string;
}

@injectable()
class CreateRandomCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({ quantity, user_id }: IRequestDTO): Promise<Card[]> {
    const allIds: IPickModel[] = await this.cardsRepository.findAllIds();
    const characters_id = randomPick({ quantity, allIds });

    const cards = await this.cardsRepository.randomCreate({
      characters_id,
      user_id,
    });

    return cards;
  }
}

export default CreateRandomCardService;
