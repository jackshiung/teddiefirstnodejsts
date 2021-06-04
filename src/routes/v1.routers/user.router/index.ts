import * as Router from 'koa-router';
import { Container } from 'typedi';
import { UserService } from '../../../modules/user/user.service';

const router = new Router();

const userService = Container.get(UserService);


router.get('/:userId', async (ctx: Router.IRouterContext) => {

    const { userId } = ctx.params;

    const userInfo = await userService.findOne( parseInt(userId,10));
    const _userInfo = await userService.findOne(+userId);

    ctx.body = userInfo;

}); 


router.post('/create', async (ctx: Router.IRouterContext) => {

    const data = ctx.request.body;
    const userInfo = await userService.create(data);

    ctx.body = userInfo;
});



router.put('/update', async (ctx: Router.IRouterContext) => {

        const data = ctx.request.body;
        const userInfo = await userService.update(data);

        ctx.body = userInfo;
});

export default router.routes();