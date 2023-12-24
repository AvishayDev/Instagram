import { useState } from "react";



function getSavedValue<T>(key:string,initialState:T){

    let savedValue = localStorage.getItem(key);
    if (savedValue) return JSON.parse(savedValue);

    return initialState
}


function useLocalStorage<T>(key:string, initialState:T | null = null):[T,(newValue: T | null)=>void] {
    const [value,setValue] = useState(()=>getSavedValue(key,initialState));

    const setNewValue = ( newValue:T | null )=>{
        setValue(newValue);
        localStorage.setItem(key,JSON.stringify(newValue));
    }


    return [value,setNewValue];
}

export default useLocalStorage;