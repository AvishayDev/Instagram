import { useState } from 'react';
import { DataError } from "../types/DataError";



function useDataError<T>(initialState:T): [DataError<T>, (newValue: T) => void, (errorMessage: string) => void, () => void] {
    const [value,setValue] = useState<DataError<T>>({data:initialState})

    const setNewValue = (newValue:T) => {
        setValue({
            ...value,
            data:newValue
        })
    }

    const setError = (errorMessage:string) => {

        setValue({
            data:value.data,
            isError:true,
            error:errorMessage
        });
    }

    const resetError = () =>{
        setValue({
            ...value,
            isError:false,
            error:''
        })
    }

    return [value,setNewValue,setError,resetError];
}

export default useDataError;