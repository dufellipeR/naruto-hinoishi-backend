import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import KekkeiController from '../controllers/KekkeiController';

const kekkeiRouter = Router();
const kekkeiController = new KekkeiController();

// kekkeiRouter.use(ensureAuthenticated);

kekkeiRouter.post(
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
  kekkeiController.create,
);
kekkeiRouter.get('/', kekkeiController.index);

kekkeiRouter.get(
  '/:kekkei_id/',
  celebrate({
    [Segments.QUERY]: {
      kekkei_id: Joi.string(),
    },
  }),
  kekkeiController.show,
);

kekkeiRouter.put(
  '/:kekkei_id',
  celebrate({
    [Segments.QUERY]: {
      kekkei_id: Joi.string(),
    },
  }),
  kekkeiController.update,
);

kekkeiRouter.delete(
  '/:kekkei_id/',
  celebrate({
    [Segments.QUERY]: {
      kekkei_id: Joi.string(),
    },
  }),
  kekkeiController.delete,
);

export default kekkeiRouter;
