import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import RandomCardsController from '../controllers/RandomCardsController';

const randomCardsRouter = Router();
const randomCardsController = new RandomCardsController();

randomCardsRouter.use(ensureAuthenticated);

randomCardsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      quantity: Joi.number().default(1),
    },
  }),
  randomCardsController.create,
);

randomCardsRouter.get('/me', randomCardsController.index);

export default randomCardsRouter;
