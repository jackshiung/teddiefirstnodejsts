export interface IBaseSearchParams{
    id?:number;
}


export interface ISearchResult<T>{
    rows:T;
    count: number;
}

export interface ISort{
    sort:SortType;
}

export enum SortType {
    Ascend = 'ASC',
    Descend = 'DESC'
}