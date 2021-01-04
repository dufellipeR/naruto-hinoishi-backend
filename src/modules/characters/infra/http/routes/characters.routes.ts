import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();
const charactersController = new CharactersController();

// charactersRouter.use(ensureAuthenticated);

charactersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      thumbnail: Joi.string(),
      type: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      power: Joi.number().required(),
      intelligence: Joi.number().required(),
      speed: Joi.number().required(),
      taijutsu: Joi.number().required(),
      ninjutsu: Joi.number().required(),
      genjutsu: Joi.number().required(),
      endurance: Joi.number().required(),
      willpower: Joi.number().required(),
    },
  }),
  charactersController.create,
);
charactersRouter.get('/all', charactersController.index);

charactersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  charactersController.show,
);

export default charactersRouter;
