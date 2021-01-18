import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ClanController from '../controllers/ClanController';
// import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const clanRouter = Router();
const clanController = new ClanController();

// clanRouter.use(ensureAuthenticated);

clanRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      icon: Joi.string(),
      strength: Joi.number().required(),
      intelligence: Joi.number().required(),
      speed: Joi.number().required(),
      taijutsu: Joi.number().required(),
      ninjutsu: Joi.number().required(),
      genjutsu: Joi.number().required(),
      stamina: Joi.number().required(),
      willpower: Joi.number().required(),
    },
  }),
  clanController.create,
);
clanRouter.get('/', clanController.index);

clanRouter.get(
  '/:id/',
  celebrate({
    [Segments.QUERY]: {
      clan_id: Joi.string(),
    },
  }),
  clanController.show,
);

clanRouter.put(
  '/:id',
  celebrate({
    [Segments.QUERY]: {
      clan_id: Joi.string(),
    },
  }),
  clanController.update,
);

clanRouter.delete(
  '/:id/',
  celebrate({
    [Segments.QUERY]: {
      clan_id: Joi.string(),
    },
  }),
  clanController.delete,
);

export default clanRouter;
