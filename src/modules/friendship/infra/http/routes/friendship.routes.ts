import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import FriendshipController from '../controllers/FriendshipController';

const friendshipRouter = Router();
const friendshipController = new FriendshipController();

friendshipRouter.use(ensureAuthenticated);

friendshipRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_tag: Joi.string(),
    },
  }),
  friendshipController.create,
);
friendshipRouter.get('/', friendshipController.index);

friendshipRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      friend_id: Joi.string(),
    },
  }),
  friendshipController.delete,
);

export default friendshipRouter;
