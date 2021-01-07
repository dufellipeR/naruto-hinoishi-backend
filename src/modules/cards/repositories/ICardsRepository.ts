import { IPickModel } from '@shared/utils/randomPick';
import ICreateCardDTO from '../dtos/ICreateCardDTO';
import ICreateRandomCardDTO from '../dtos/ICreateRandomCardDTO';
import IShortCard from '../dtos/IShortCard';
import Card from '../infra/typeorm/entities/Card';

export default interface ICardsRepository {
  create(data: ICreateCardDTO): Promise<Card>;
  randomCreate(data: ICreateRandomCardDTO): Promise<Card[]>;
  findAllIds(): Promise<IPickModel[]>;
  findAllUserCards(user_id: string): Promise<IShortCard[]>;
}
