import * as dotenvFlow from 'dotenv-flow';
const env = dotenvFlow.config();
process.env.NODE_ENV = env.parsed!.NODE_ENV;


import db from '../src/database';


async function init(){
    try{
        await db.sequelize.sync();
    }catch(error){
        console.error(error);
    }
}

init();