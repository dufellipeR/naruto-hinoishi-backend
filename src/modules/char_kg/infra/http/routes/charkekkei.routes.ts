import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import CharKekkeiController from '../controllers/CharKekkeiController';

const charkekkeiRouter = Router();
const charkekkeiController = new CharKekkeiController();

// charkekkeiRouter.use(ensureAuthenticated);

charkekkeiRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      kekkei_id: Joi.string().required(),
      character_id: Joi.string().required(),
    },
  }),
  charkekkeiController.create,
);

charkekkeiRouter.post(
  '/bunch',
  celebrate({
    [Segments.BODY]: {
      items: Joi.required(),
      character_id: Joi.string().required(),
    },
  }),
  charkekkeiController.createBunch,
);

export default charkekkeiRouter;
