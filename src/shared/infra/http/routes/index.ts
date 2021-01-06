import charactersRouter from '@modules/characters/infra/http/routes/characters.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/character', charactersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
