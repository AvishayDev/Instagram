import { createContext,ReactNode, useContext, useState } from "react";


interface RegisterContextProps {
    children: ReactNode;
}

interface RegisterContextVariables { 
    currentPage: number; 
    nextPage: ()=> void; 
    backPage: ()=> void; 
    registerFlow: string[]; 
}

const RegisterContext = createContext<RegisterContextVariables>({
    currentPage:0,
    nextPage:()=>{},
    backPage:()=>{},
    registerFlow:[]
});

export const useRegisterContext = () => useContext(RegisterContext);


export function RegisterProvider({children}:RegisterContextProps){
    
    const [currentPage,setCurrentPage] = useState(0)

    const registerFlow = [
        '/login',
        '/register/1',
        '/register/2',
        '/register/3',
        '/feed'
    ]

    const context ={
        currentPage,
        nextPage:()=>setCurrentPage(currentPage + 1),
        backPage:()=>setCurrentPage(currentPage - 1),
        registerFlow
    }
    
    return (
        <RegisterContext.Provider value={context}>
            {children}
        </RegisterContext.Provider>
    );

}