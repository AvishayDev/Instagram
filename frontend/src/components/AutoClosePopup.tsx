import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';


interface AutoClosePopupProps {
    message?:string,
    open?:boolean,
    onClose?:()=>void,
    color?: AlertColor
}


const AutoClosePopup = (props:AutoClosePopupProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {

    setOpen(true);
    setTimeout(() => handleClose(), 3000);
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
