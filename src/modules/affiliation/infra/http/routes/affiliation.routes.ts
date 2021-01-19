import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AffiliationController from '../controllers/AffiliationController';
// import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const affiliationRouter = Router();
const affiliationController = new AffiliationController();

// affiliationRouter.use(ensureAuthenticated);

affiliationRouter.post(
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
  affiliationController.create,
);
affiliationRouter.get('/', affiliationController.index);

affiliationRouter.get(
  '/:affiliation_id/',
  celebrate({
    [Segments.QUERY]: {
      affiliation_id: Joi.string(),
    },
  }),
  affiliationController.show,
);

affiliationRouter.put(
  '/:affiliation_id',
  celebrate({
    [Segments.QUERY]: {
      affiliation_id: Joi.string(),
    },
  }),
  affiliationController.update,
);

affiliationRouter.delete(
  '/:affiliation_id/',
  celebrate({
    [Segments.QUERY]: {
      affiliation_id: Joi.string(),
    },
  }),
  affiliationController.delete,
);

export default affiliationRouter;
