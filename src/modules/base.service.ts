import { ClassConstructor, plainToClass } from 'class-transformer'  //套件
import { validate } from 'class-validator'; //套件
import { IBaseSearchParams, ISearchResult } from './common.interface';  //base input
import * as httpErrors from 'http-errors';  //error套件


export abstract class BaseService<T>{

    abstract findOneOrError(id:number):Promise<T>;
    abstract search(params: IBaseSearchParams): Promise<ISearchResult<T[]>>;

    async findOne(id:number): Promise<T | null> {

        let data = await this.search({id:id});
        let rows = data.rows;
        return rows.length == 1 ? rows[0] : null;

    }

    async findAll(): Promise<T[]> {
        let data = await this.search({});
        return data.rows;
    }

    async validateObject<T, V>(cls:ClassConstructor<T>,plain:V):Promise<void>{

        const parsedClass = plainToClass(cls, plain);

        const errors = await validate(<Object>parsedClass);

        if(errors.length === 0){
            return;
        }
        
        throw new httpErrors.BadRequest("input validation error");
    }


    
}