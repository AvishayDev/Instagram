




export function removeKeys<T extends object>(removedObject : T,keysToRemove: string[]) : T{

    const workObject = { ...removedObject }

    keysToRemove.forEach((key)=>{
        if (key in workObject) delete workObject[key];
    })

    return workObject;
}

export function getSelectObject(keys:string[]){
    return Object.fromEntries(keys.map((key) => [key, true]));
}