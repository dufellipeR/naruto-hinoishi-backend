import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdatePowerDTO from '../dtos/IUpdatePowerDTO';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
export default class UpdatePowerService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
  ) {}

  public async execute({ user_id }: IRequestDTO): Promise<User | undefined> {
    const user = this.usersRepository.findById(user_id);

    if (user) {
      const userCards = await this.cardsRepository.findAllUserCards(user_id);

      let power = 0;

      userCards.forEach(card => {
        power += card.power;
      });

      const updatePower = this.usersRepository.updatePower({ user_id, power });

      return updatePower;
    }
    throw new AppError("There's no user with this ID");
  }
}
