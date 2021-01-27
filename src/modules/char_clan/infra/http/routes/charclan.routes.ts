import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import CharClanController from '../controllers/CharClanController';

const charClanRouter = Router();
const charClanController = new CharClanController();

charClanRouter.use(ensureAuthenticated);
charClanRouter.use(ensureAdmin);

charClanRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      clan_id: Joi.string().required(),
      character_id: Joi.string().required(),
    },
  }),
  charClanController.create,
);

charClanRouter.post(
  '/bunch',
  celebrate({
    [Segments.BODY]: {
      items: Joi.required(),
      character_id: Joi.string().required(),
    },
  }),
  charClanController.createBunch,
);

export default charClanRouter;
