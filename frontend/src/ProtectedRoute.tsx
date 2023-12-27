import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";


interface ProtectedRouteProps {
    isAllowed:boolean
    redirectPath:string
    children:ReactNode
}


function ProtectedRoute(props:ProtectedRouteProps) {
    
    const {isAllowed, redirectPath, children} = props;
    
    return ( 
        <>
            {
               !isAllowed ?  <Navigate to={redirectPath} replace />
                : children ? children : <Outlet/>
            }
        </>);

}

export default ProtectedRoute;