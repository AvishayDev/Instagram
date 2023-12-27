import * as Yup from 'yup';
import { ValidationOptions, ValidationOptionsType } from './ValidationOptions';
import { FormikErrors, FormikValues, yupToFormErrors } from 'formik';
import { renameKey } from '../HelpFunctions';




export function getValidationScheme(validationOptionsNames: ValidationOptionsType[],renameKeys?: { [key in ValidationOptionsType]?: string }):Yup.AnyObjectSchema{
    

    const validationObject = Object.fromEntries(
                             validationOptionsNames.map(name=>[name,ValidationOptions[name]]))
    
    renameKeys && Object.entries(renameKeys).forEach(([oldName,newName])=>renameKey(validationObject,oldName,newName))

    return Yup.object({
        ...validationObject
    });
}

export async function validateYupSchema<T extends FormikValues>(values : T ,schema:Yup.AnyObjectSchema) : Promise<FormikErrors<T>>{

    return await schema.validate(values,{ abortEarly: false })
                        .then(()=>({}))
                        .catch(error => yupToFormErrors(error))    
}
