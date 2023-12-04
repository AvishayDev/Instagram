import { keys } from 'ts-transformer-keys';


export function validateObjectKeys<T extends object>(expectedKeys:string[], testObject:any) {
    return (
            typeof testObject === 'object' &&
            testObject.keys().length === expectedKeys.length &&
            keys<T>()
        ) 

}