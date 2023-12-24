import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router";
import RegisterNavigation from "../../components/RegisterNavigation";
import { useState } from "react";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import { useNavigate } from "react-router-dom";
import { Formik, FormikContext, FormikErrors, FormikValues, useFormik,yupToFormErrors } from "formik";
import { isAlpha, isAlphanumeric, isURL } from "class-validator";
import * as Yup from 'yup';
import { RegisterUser } from "../../redux/features/Api/users/types/RegisterUser";

function validateYupSchemaSync<T extends FormikValues>(values : T ,schema:Yup.AnyObjectSchema) : FormikErrors<T> {

    try {
        schema.validateSync(values,{abortEarly:false})
    } catch (error){
        if(error instanceof Yup.ValidationError) return yupToFormErrors(error)
    }
    return {}
}


async function validateYupSchema<T extends FormikValues>(values : T ,schema:Yup.AnyObjectSchema) : Promise<FormikErrors<T>>{

    return await schema.validate(values,{ abortEarly: false })
                        .then(()=>({}))
                        .catch(error => yupToFormErrors(error))    
}

const validationSchemaStep1 = Yup.object({
    username: Yup.string()
                    .required('Did you forget something?')
                    .test('isAlphanumeric',
                        'Username can be only letters and numbers',
                        (value)=> isAlphanumeric(value)),
    rePassword: Yup.string()
                    .required('Did you forget something?')
                    .oneOf([Yup.ref('password')],"Passwords dosen't match."),
    password: Yup.string()
                    .required('Did you forget something?')
                    .max(100,"it's too long!"),
    
});

const validationSchemaStep2 = Yup.object({
    profileImageUrl: Yup.string()
                        .url('Please provide valid URL'),
    firstName: Yup.string()
                    .required('What is Your name again..?')
                    .test('isAlpha','First name can be only letters',(value)=>isAlpha(value)),
    lastName: Yup.string()
                    .required('What is Your name again..?')
                    .test('isAlpha','First name can be only letters',(value)=>isAlpha(value))
})

const initialPage = 1;
const endPage = 3;

function Register() {

    const [currentPage,setCurrentPage] = useState(initialPage);
    const navigate = useNavigate()

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
            }

            return errors
        },
        onSubmit: (values)=>{
            if (currentPage === endPage)
                setCurrentPage(initialPage)
            else
            setCurrentPage(currentPage + 1)

        },
        validateOnBlur:true
    })

    const handleBack = () => {
        if (currentPage > initialPage)
            setCurrentPage(currentPage - 1)
        else
            navigate('/login')
    }

    return ( 
        <Box sx={{width:'50vw', marginTop:4}}>

            <Box sx={{marginBottom:4}}>
                <Typography variant="h4" >Let's Register!</Typography>
                <Typography variant="subtitle1">Just Few Steps and Your'e In!</Typography>
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
                    />
        </Box>
     );
}

export default Register;