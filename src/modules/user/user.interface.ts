export interface IUserParams{
    name: string;
}


export interface ICreateUserParams extends IUserParams{
    address:string;
}


export interface IUpdateUserParams extends IUserParams{
    userId:number;
    address:string;
}