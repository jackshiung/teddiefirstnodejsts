import * as Router from 'koa-router';
import userRouter from './user.router';

const router = new Router();

router.use('/user',userRouter);

export default router.routes;