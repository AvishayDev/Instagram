import { createContext,ReactNode } from "react";


interface RegisterContextProps {
    children: ReactNode;
  }

export const RegisterContext = createContext({});


export function RegisterProvider({children}:RegisterContextProps){
    
    const context ={
        
    }

    return (
        <RegisterContext.Provider value={context}>
            {children}
        </RegisterContext.Provider>
    );

}