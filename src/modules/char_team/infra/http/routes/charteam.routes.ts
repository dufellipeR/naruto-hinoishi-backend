import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CharTeamController from '../controllers/CharTeamController';
// import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const charTeamRouter = Router();
const charTeamController = new CharTeamController();

// charTeamRouter.use(ensureAuthenticated);

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

export default charTeamRouter;
