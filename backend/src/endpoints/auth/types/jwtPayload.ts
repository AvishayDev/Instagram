import { UserData } from "./UserData"




export type JwtPayload = {
    sub:number,
    userData:UserData
}