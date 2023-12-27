import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import RegisterNavigation from "../../components/RegisterNavigation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikContext, FormikErrors, FormikValues, useFormik,yupToFormErrors } from "formik";
import { isAlpha, isAlphanumeric, isStrongPassword } from "class-validator";
import * as Yup from 'yup';
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";
import { useLazyRegisterUserQuery } from "../../redux/features/Api/users/usersApiSlice";
import { User } from "../../redux/features/Api/users/types/User";
import AutoClosePopup from "../../components/AutoClosePopup";
import { clearFormValues } from "../../HelpFunctions";
import { Messages } from "../../consts/enums/Messages";
import { Titles } from "../../consts/enums/Titles";
import { Colors } from "../../consts/enums/Colors";
import { Paths } from "../../consts/enums/Paths";
import { ValidationMessages } from "../../consts/ValidationErrorMessages";
import { MaxLengths, MinLengths } from "../../consts/MinMax";
import { getValidationScheme, validateYupSchema } from "../../Validation/ValidationFunctions";
import { ConnectedTvOutlined } from "@mui/icons-material";
import RegisterStep from "./RegisterStep";


const validationSchemaStep1 = getValidationScheme(['username','password','rePassword'])

const validationSchemaStep2 = getValidationScheme(['imageUrl','firstName','lastName'],{'imageUrl':'profileImageUrl'})

const validationSchemaStep3 = getValidationScheme(['bio'])


export enum Pages {
    Step1,
    Step2,
    Step3
}

const initialPage = 0;

interface RegisterProps {
    onRegister:(user: User)=>void
}

function Register(props: RegisterProps) {

    const [currentPage,setCurrentPage] = useState<Pages>(initialPage);
    const navigate = useNavigate();
    const [registerTrigger, {isLoading,isError}] = useLazyRegisterUserQuery();

    const [openError,setOpenError] = useState(false);
    useEffect(()=>setOpenError(isError),[isError])

    const formik = useFormik<RegisterUser>({
        initialValues: {

            username:'',
            password:'',
            rePassword:'',

            profileImageUrl:'',
            firstName:'',
            lastName:'',

            bio:''
        },
        validate: async (values)=>{
            let errors:FormikErrors<typeof values> = {}
            if (currentPage === Pages.Step1){
                const {username,password,rePassword} = values;
                errors = await validateYupSchema({username,password,rePassword}, validationSchemaStep1)
            } else if (currentPage === Pages.Step2){

                const {firstName,lastName,profileImageUrl} = values;
                errors = await validateYupSchema({firstName,lastName,profileImageUrl}, validationSchemaStep2)
            } else {
                const {bio} = values;
                errors = await validateYupSchema({bio},validationSchemaStep3)
            }

            return errors
        },
        onSubmit: async (values,formikHelpers)=>{

            if (currentPage === Pages.Step1){
                formikHelpers.setTouched({username:true,password:true,rePassword:true})
                setCurrentPage(currentPage + 1)
            } else if (currentPage === Pages.Step2){
                setCurrentPage(currentPage + 1)
            } else {
                const sendValues = clearFormValues(values) as RegisterUser;

                const {data,isSuccess,error} = await registerTrigger({...sendValues});

                console.log(error)

                if (isSuccess)
                    props.onRegister(data);

            }
        },
        validateOnBlur:true
    })

    const handleBack = () => {
        if (currentPage > initialPage)
            setCurrentPage(currentPage - 1)
        else
            navigate(Paths.LOGIN)
    }

    useEffect(()=>console.log(formik.values.profileImageUrl),[formik.values.profileImageUrl])
    return ( 
        <>
            {openError && <AutoClosePopup 
                message={Messages.ServerError}
                open={openError}
                color={Colors.ERROR}
                onClose={()=>setOpenError(false)}
                />}

            <Box sx={{width:'50vw', marginTop:4}} onKeyDown={event => event.key === 'Enter' && formik.handleSubmit()}>

                <Box sx={{marginBottom:4}}>
                    <Typography variant="h4" >{Titles.RegisterTitle1}</Typography>
                    <Typography variant="subtitle1">{Titles.RegisterTitle2}</Typography>
                </Box>

                <FormikContext.Provider value={formik}>
                    <RegisterStep currentPage={currentPage}/>
                </FormikContext.Provider>
                
                <RegisterNavigation 
                        onBack={handleBack}
                        onNext={formik.handleSubmit}
                        isLoading={isLoading}
                        currentPage={currentPage}
                        />
            </Box>
            <LinearProgress sx={{ 
                    width:'100%', 
                    position:'absolute', 
                    bottom:10
                
                }} variant="determinate" value={currentPage * 33} />
        </>
     );
}

export default Register;