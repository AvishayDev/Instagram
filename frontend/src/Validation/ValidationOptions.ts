import * as Yup from 'yup';
import { ValidationMessages } from '../consts/ValidationErrorMessages';
import { MaxLengths, MinLengths } from '../consts/MinMax';
import { isAlpha, isAlphanumeric, isStrongPassword } from 'class-validator';


export type ValidationOptionsType = keyof typeof ValidationOptions;

export const ValidationOptions = {
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

    imageUrl: Yup.string()
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
                    .test('isAlpha','Last name' + ValidationMessages.LETTERS,(value)=>isAlpha(value)),

    bio: Yup.string().max(MaxLengths.BIO,ValidationMessages.TOO_LONG),

    postText: Yup.string().max(MaxLengths.POST_TEXT,ValidationMessages.TOO_LONG),

}