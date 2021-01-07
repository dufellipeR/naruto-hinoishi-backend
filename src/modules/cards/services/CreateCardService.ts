import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Card from '../infra/typeorm/entities/Card';
import ICardsRepository from '../repositories/ICardsRepository';

interface IRequestDTO {
  character_id: string;
  user_id: string;
}

@injectable()
class CreateCardService {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({ character_id, user_id }: IRequestDTO): Promise<Card> {
    const card = await this.cardsRepository.create({
      character_id,
      user_id,
    });

    return card;
  }
}

export default CreateCardService;
