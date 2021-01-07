import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CardsController from '../controllers/CardsController';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardsRouter = Router();
const cardsController = new CardsController();

// charactersRouter.use(ensureAuthenticated);

cardsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      character_id: Joi.string(),
      user_id: Joi.string(),
    },
  }),
  cardsController.create,
);
// cardsRouter.get('/all', cardsController.index);

export default cardsRouter;
