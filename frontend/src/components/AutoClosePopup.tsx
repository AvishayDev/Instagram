import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { Timings } from '../consts/enums/Timings';


interface AutoClosePopupProps {
    message?:string,
    open?:boolean,
    onClose?:()=>void,
    color?: AlertColor,
    closeDuration?:number
}


const AutoClosePopup = (props:AutoClosePopupProps) => {
  const [open, setOpen] = useState(false);

  const closeDuration = props.closeDuration || Timings.AutoClosePopup;

  const handleOpen = () => {

    setOpen(true);
    setTimeout(() => handleClose(), closeDuration);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose?.()
  };

  useEffect(()=>{
    props.open && handleOpen();
  },[props.open])

  return (
    <div>
      <Snackbar 
        open={open} 
        autoHideDuration={null} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <Alert color={props.color} onClose={handleClose} severity="info">
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AutoClosePopup;
