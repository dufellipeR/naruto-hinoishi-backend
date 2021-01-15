import cardsRouter from '@modules/cards/infra/http/routes/cards.routes';
import randomCardsRouter from '@modules/cards/infra/http/routes/randomcards.routes';
import charactersRouter from '@modules/characters/infra/http/routes/characters.routes';
import charkekkeiRouter from '@modules/char_kg/infra/http/routes/charkekkei.routes';
import friendshipRouter from '@modules/friendship/infra/http/routes/friendship.routes';
import kekkeiRouter from '@modules/kekkei/infra/http/routes/kekkei.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/kekkei', kekkeiRouter);
routes.use('/charkekkei', charkekkeiRouter);
routes.use('/character', charactersRouter);
routes.use('/card', cardsRouter);
routes.use('/cards', randomCardsRouter);
routes.use('/friends', friendshipRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
