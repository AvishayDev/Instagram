import { Box, LinearProgress, Typography } from "@mui/material";
import RegisterNavigation from "../../components/RegisterNavigation";
import { useEffect, useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useNavigate } from "react-router-dom";
import { FormikContext, FormikErrors, FormikValues, useFormik,yupToFormErrors } from "formik";
import { isAlpha, isAlphanumeric, isStrongPassword } from "class-validator";
import * as Yup from 'yup';
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";
import { useLazyRegisterUserQuery } from "../../redux/features/Api/users/usersApiSlice";
import useLocalStorage from "../../Hooks/useLocalStorage";
import { User } from "../../redux/features/Api/users/types/User";
import AutoClosePopup from "../../components/AutoClosePopup";
import { clearFormValues } from "../../HelpFunctions";
import { Messages } from "../../consts/enums/Messages";
import { Titles } from "../../consts/enums/Titles";
import { Colors } from "../../consts/enums/Colors";
import { Paths } from "../../consts/enums/Paths";
import { ValidationMessages } from "../../consts/ValidationErrorMessages";
import { MaxLengths, MinLengths } from "../../consts/MinMax";


async function validateYupSchema<T extends FormikValues>(values : T ,schema:Yup.AnyObjectSchema) : Promise<FormikErrors<T>>{

    return await schema.validate(values,{ abortEarly: false })
                        .then(()=>({}))
                        .catch(error => yupToFormErrors(error))    
}

const validationSchemaStep1 = Yup.object({
    username: Yup.string()
                    .required(ValidationMessages.REQUIRED)
                    .min(MinLengths.USERNAME,ValidationMessages.TOO_SHORT)
                    .max(MaxLengths.USERNAME,ValidationMessages.TOO_LONG)
                    .test('isAlphanumeric',
                        'Username' + ValidationMessages.LETTERS_AND_NUMBERS,
                        (value)=> isAlphanumeric(value)),
    password: Yup.string()
                    .required(ValidationMessages.REQUIRED)
                    .max(MaxLengths.PASSWORD,ValidationMessages.TOO_LONG)
                    .test('isStrongPassword',
                            ValidationMessages.STRONG_PASSWORD,
                            (value)=>isStrongPassword(value)),
    rePassword: Yup.string()
                    .required(ValidationMessages.REQUIRED)
                    .oneOf([Yup.ref('password')],ValidationMessages.MATCH_PASSWORDS),
    
});

const validationSchemaStep2 = Yup.object({
    profileImageUrl: Yup.string()
                        .max(MaxLengths.IMAGE_URL,ValidationMessages.TOO_LONG_URL)
                        .url(ValidationMessages.VALID_URL),
    firstName: Yup.string()
                    .required(ValidationMessages.NAME_REQUIRED)
                    .min(MinLengths.FIRSTNAME,ValidationMessages.TOO_SHORT)
                    .max(MaxLengths.FIRSTNAME,ValidationMessages.TOO_LONG)
                    .test('isAlpha','First name' + ValidationMessages.LETTERS,(value)=>isAlpha(value)),
    lastName: Yup.string()
                    .required(ValidationMessages.NAME_REQUIRED)
                    .min(MinLengths.LASTNAME,ValidationMessages.TOO_SHORT)
                    .max(MaxLengths.LASTNAME,ValidationMessages.TOO_LONG)
                    .test('isAlpha','Last name' + ValidationMessages.LETTERS,(value)=>isAlpha(value))
})

const validationSchemaStep3 = Yup.object({
    bio: Yup.string().max(MaxLengths.BIO,ValidationMessages.TOO_LONG)
})

const initialPage = 1;


interface RegisterProps {
    onRegister:(user: User)=>void
}

function Register(props: RegisterProps) {

    const [currentPage,setCurrentPage] = useState(initialPage);
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
            if (currentPage === 1){
                const {username,password,rePassword} = values;
                errors = await validateYupSchema({username,password,rePassword}, validationSchemaStep1)
            } else if (currentPage === 2){

                const {firstName,lastName,profileImageUrl} = values;
                errors = await validateYupSchema({firstName,lastName,profileImageUrl}, validationSchemaStep2)
            } else {
                const {bio} = values;
                errors = await validateYupSchema({bio},validationSchemaStep3)
            }

            return errors
        },
        onSubmit: async (values,formikHelpers)=>{

            if (currentPage === 1){
                formikHelpers.setTouched({username:true,password:true,rePassword:true})
                setCurrentPage(currentPage + 1)
            } else if (currentPage === 2){
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


    return ( 
        <>
            <AutoClosePopup 
                message={Messages.ServerError}
                open={openError}
                color={Colors.ERROR}
                onClose={()=>setOpenError(false)}
                />

            <Box sx={{width:'50vw', marginTop:4}} onKeyDown={event => event.key === 'Enter' && formik.handleSubmit()}>

                <Box sx={{marginBottom:4}}>
                    <Typography variant="h4" >{Titles.RegisterTitle1}</Typography>
                    <Typography variant="subtitle1">{Titles.RegisterTitle2}</Typography>
                </Box>

                <FormikContext.Provider value={formik}>
                    {currentPage === 1 && 
                            <RegisterStep1
                                />}
                    {currentPage === 2 && 
                            <RegisterStep2
                                
                                /> }
                    {currentPage === 3 && 
                            <RegisterStep3
                                
                                /> }
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