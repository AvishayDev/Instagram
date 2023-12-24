

export function getSelectObject(keys:string[]){
    return Object.fromEntries(keys.map((key) => [key, true]));
}