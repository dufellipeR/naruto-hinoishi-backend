import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import multer from 'multer';
import AffiliationController from '../controllers/AffiliationController';

const affiliationRouter = Router();
const affiliationController = new AffiliationController();

affiliationRouter.use(ensureAuthenticated);
affiliationRouter.use(ensureAdmin);

const upload = multer(uploadConfig.multer);

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

affiliationRouter.post(
  '/import',
  upload.single('file'),
  affiliationController.import,
);

export default affiliationRouter;
