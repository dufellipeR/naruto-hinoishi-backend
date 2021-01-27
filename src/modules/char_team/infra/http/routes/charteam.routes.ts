import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import CharTeamController from '../controllers/CharTeamController';

const charTeamRouter = Router();
const charTeamController = new CharTeamController();

charTeamRouter.use(ensureAuthenticated);
charTeamRouter.use(ensureAdmin);

charTeamRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      team_id: Joi.string().required(),
      character_id: Joi.string().required(),
    },
  }),
  charTeamController.create,
);

charTeamRouter.post(
  '/bunch',
  celebrate({
    [Segments.BODY]: {
      items: Joi.required(),
      character_id: Joi.string().required(),
    },
  }),
  charTeamController.createBunch,
);

export default charTeamRouter;
