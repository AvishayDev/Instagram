

export type DataError<T> = {
    data:T,
    
    error?:string | '',
    isError?:boolean | false
}