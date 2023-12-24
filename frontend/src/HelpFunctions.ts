





export function clearFormValues<T extends object>(values:T) {

    return Object.fromEntries(
           Object.entries(values)
           .filter(([_,value]) => value));

}