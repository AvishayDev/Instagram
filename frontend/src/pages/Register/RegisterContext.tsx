import { createContext,ReactNode } from "react";


interface RegisterContextProps {
    children: ReactNode;
}

export interface RegisterContent {
    currentPage:number
}

const context:RegisterContent ={
    currentPage:2
}

export const RegisterContext = createContext(context);


export function RegisterProvider({children}:RegisterContextProps){
    

    return (
        <RegisterContext.Provider value={context}>
            {children}
        </RegisterContext.Provider>
    );

}