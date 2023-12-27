





export function clearFormValues<T extends object>(values:T) {

    return Object.fromEntries(
           Object.entries(values)
           .filter(([_,value]) => value));

}


export function renameKey<T>(obj:T, oldKey:keyof T, newKey:string){
    const { [oldKey]: value, ...rest } = obj;
    return { ...rest, [newKey]: value };  
}