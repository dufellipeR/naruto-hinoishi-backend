import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import multer from 'multer';

import uploadConfig from '@config/upload';
import CharactersController from '../controllers/CharactersController';

const charactersRouter = Router();
const charactersController = new CharactersController();

const upload = multer(uploadConfig.multer);

// charactersRouter.use(ensureAuthenticated);

charactersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      render: Joi.string(),
      type: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
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

charactersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  charactersController.delete,
);

charactersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      render: Joi.string().required(),
      type: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
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
  charactersController.update,
);

charactersRouter.post(
  '/import',
  upload.single('file'),
  charactersController.import,
);

export default charactersRouter;
