import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import CharAffiliationController from '../controllers/CharAffiliationController';

const charAffiliationRouter = Router();
const charAffiliationController = new CharAffiliationController();

// charAffiliationRouter.use(ensureAuthenticated);

charAffiliationRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      affiliation_id: Joi.string().required(),
      character_id: Joi.string().required(),
    },
  }),
  charAffiliationController.create,
);

charAffiliationRouter.post(
  '/bunch',
  celebrate({
    [Segments.BODY]: {
      items: Joi.required(),
      character_id: Joi.string().required(),
    },
  }),
  charAffiliationController.createBunch,
);

export default charAffiliationRouter;
