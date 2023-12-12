

export type DataError<T> = {
    data:T,
    error?:string | '',
    isError?:boolean | false,
}

export class DataErrorClass<T> implements DataError<T> {

    constructor(public data:T){}
    
    error:string = '';
    isError:boolean = false;

    setData(newData:T){
        this.data = newData;
    }

    setError(errorMessage:string){
        this.error=errorMessage;
        this.isError = true;
    }

    resetError() {
        this.error = '';
        this.isError = false;
    }
}


