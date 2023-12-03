import { Box, Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";


interface LinkButtonProps extends ButtonProps{
    to:string
    children:ReactNode
}

function LinkButton(props:LinkButtonProps) {
    return (<>
            <Button {...props}>
                    <Link to={props.to} style={{ textDecoration: 'none',color:props.variant === 'contained' ? '#ffffff': '#1976d2' }}>
                        {props.children}
                    </Link>
            </Button>

            </> 
        );
}

export default LinkButton;