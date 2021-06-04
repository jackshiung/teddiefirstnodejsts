import 'reflect-metadata';
import * as dotenvFlow from 'dotenv-flow';
const dotenv = dotenvFlow.config();
process.env.NODE_ENV = dotenv.parsed!.NODE_ENV;

import * as Static from 'koa-static';
import * as Router from 'koa-router';
import * as path from 'path';
import * as logger from 'koa-logger';
import * as Koa from 'koa';
import * as etag from 'koa-etag';
import * as cors from 'kcors';
import * as bodyParser from 'koa-bodyparser';
import Container from 'typedi';
import apiRouters from './routes/index';
import { useContainer } from 'class-validator';
import { getErrorResult } from './view-models/error.vm';

useContainer(Container);

const app = new Koa();
const router = new Router();

const staticPath = '../upload'
app.use(Static(
    path.join(__dirname, staticPath)
))

// error handle
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
        await next();
        if ((ctx.status || 404) == 404) {
            ctx.throw(404, 'Path not found');
        }
    } catch (err) {
        console.log(err);
        ctx.status = err.status = (err.status || 500);
        ctx.body = getErrorResult(err);
    }
});

// middlewares
app.use(cors({
    exposeHeaders: ['Content-Disposition', 'Content-Length', 'Content-filename']
}));
app.use(bodyParser({
    formLimit: '100mb', jsonLimit: '100mb', textLimit: '100mb',
}));
app.use(etag());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
router.use('/api', apiRouters);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}...`);
});

process.on('uncaughtException', (error) => {
    console.log(error);
});