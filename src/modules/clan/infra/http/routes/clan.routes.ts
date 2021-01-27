import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import ClanController from '../controllers/ClanController';

const clanRouter = Router();
const clanController = new ClanController();

clanRouter.use(ensureAuthenticated);
clanRouter.use(ensureAdmin);

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
  '/:clan_id/',
  celebrate({
    [Segments.QUERY]: {
      clan_id: Joi.string(),
    },
  }),
  clanController.show,
);

clanRouter.put(
  '/:clan_id',
  celebrate({
    [Segments.QUERY]: {
      clan_id: Joi.string(),
    },
  }),
  clanController.update,
);

clanRouter.delete(
  '/:clan_id/',
  celebrate({
    [Segments.QUERY]: {
      clan_id: Joi.string(),
    },
  }),
  clanController.delete,
);

export default clanRouter;
