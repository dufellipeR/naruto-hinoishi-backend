import affiliationRouter from '@modules/affiliation/infra/http/routes/affiliation.routes';
import cardsRouter from '@modules/cards/infra/http/routes/cards.routes';
import randomCardsRouter from '@modules/cards/infra/http/routes/randomcards.routes';
import charactersRouter from '@modules/characters/infra/http/routes/characters.routes';
import charAffiliationRouter from '@modules/char_aft/infra/http/routes/charkekkei.routes';
import charClanRouter from '@modules/char_clan/infra/http/routes/charclan.routes';
import charkekkeiRouter from '@modules/char_kg/infra/http/routes/charkekkei.routes';
import clanRouter from '@modules/clan/infra/http/routes/clan.routes';
import friendshipRouter from '@modules/friendship/infra/http/routes/friendship.routes';
import kekkeiRouter from '@modules/kekkei/infra/http/routes/kekkei.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/clan', clanRouter);
routes.use('/charclan', charClanRouter);
routes.use('/affiliation', affiliationRouter);
routes.use('/charaffiliation', charAffiliationRouter);
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
