import * as Router from 'koa-router';
import v1Router from './v1.routers';

const router = new Router();

router.use('/v1',v1Router);

export default router.routes;