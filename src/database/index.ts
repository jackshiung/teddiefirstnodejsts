import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";

import User from "../models/user.models";


let opts = {
    db: process.env.DB_NAME || 'myfirstnodejs',
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'jj8831300',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00',
}

const sequelize = new Sequelize({
    database: opts.db,
    host: opts.host,
    username: opts.user,
    password: opts.password,
    dialect: opts.dialect as any,
    pool: opts.pool,
    timezone: opts.timezone,
    models:[__dirname + '/../models'],
    logging: process.env.DB_LOGGING == 'true',
});


export default {
    sequelize, Op,
    User
}