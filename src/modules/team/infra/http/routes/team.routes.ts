import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import TeamController from '../controllers/TeamController';
// import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const teamRouter = Router();
const teamController = new TeamController();

// teamRouter.use(ensureAuthenticated);

teamRouter.post(
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
  teamController.create,
);
teamRouter.get('/', teamController.index);

teamRouter.get(
  '/:team_id/',
  celebrate({
    [Segments.QUERY]: {
      team_id: Joi.string(),
    },
  }),
  teamController.show,
);

teamRouter.put(
  '/:team_id',
  celebrate({
    [Segments.QUERY]: {
      team_id: Joi.string(),
    },
  }),
  teamController.update,
);

teamRouter.delete(
  '/:team_id/',
  celebrate({
    [Segments.QUERY]: {
      team_id: Joi.string(),
    },
  }),
  teamController.delete,
);

export default teamRouter;
