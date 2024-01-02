import { UserData } from "./UserData"




export interface JwtPayload {
    sub:string
    userData:UserData
}