import React, { Suspense } from "react";
import { Pages } from "./Register";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";





const pageComponents = [
    RegisterStep1,
    RegisterStep2,
    RegisterStep3
]


interface RegisterStepProps {
    currentPage: Pages
}


function RegisterStep(props:RegisterStepProps) {

    const CurrentStep = pageComponents[props.currentPage]

    return ( 
        <CurrentStep />
    );
}

export default RegisterStep;