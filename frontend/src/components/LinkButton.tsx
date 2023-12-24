import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";


interface LinkButtonProps extends ButtonProps{
    to:string
    children:ReactNode
    onClick? : () => void
}

function LinkButton(props:LinkButtonProps) {

    const navigate = useNavigate();
    
    return (<>
            <Button {...props} 
                    onClick={()=>{
                        props.onClick && props.onClick();
                        navigate(props.to);
                        }}>
                    {props.children}
            </Button>

            </> 
        );
}

export default LinkButton;