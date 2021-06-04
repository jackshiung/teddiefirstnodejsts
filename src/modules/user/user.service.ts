import db from '../../database';    //db
import { Inject, Service  } from 'typedi';  //套件
import User from '../../models/user.models'; //user model
import { ICreateUserParams, IUpdateUserParams } from './user.interface'; //input
import * as httpError from 'http-errors';   //error套件

@Service()
export class UserService{


    async findOne(userId:number):Promise<User | null>{
        const user = await db.User.findOne({
            where:{
                id: userId
            }
        });
        return user;
    }


    async findOneOrErrror(id:number):Promise<User>{

        let user = await this.findOne(id);
        if(!user){
            throw new httpError.NotFound("User not found");
        }
        return user;
    }

    
    async create(params:ICreateUserParams):Promise<User>{
        //TODO:驗證 params

        const tx = await db.sequelize.transaction();
        try{

            const user = await db.User.build({
                name : params.name,
                address : params.address
            })

            const newUser = await user.save({transaction:tx});
            await tx.commit();

            return newUser;

        }catch(error){

            if(tx) await tx.rollback();
            throw error;
        }

    }

    
    async update(params:IUpdateUserParams):Promise<User>{

        const user = await this.findOneOrErrror(params.userId);
        if(user === null){
            throw new httpError.NotFound("修改用戶時找不到用戶");
        }
        const tx = await db.sequelize.transaction();
        try{

            const updateUser = await user.update({
                name : params.name,
                address : params.address
            });

            await tx.commit();

            return updateUser;

        }catch(error){
            if(tx) await tx.rollback();
            throw error;
        }

    }
}