import charactersRouter from '@modules/characters/infra/http/routes/characters.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/character', charactersRouter);

export default routes;
