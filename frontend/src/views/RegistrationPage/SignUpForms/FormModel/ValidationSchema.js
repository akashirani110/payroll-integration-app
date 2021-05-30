import * as Yup from 'yup';
import SignUpFormModel from './SignUpFormModel';

const {
    formField: {
        fullName,
        position,
        email,
        password
    }
} = SignUpFormModel;

export default [
    Yup.object().shape({
        [fullName.name]: Yup.string().required(`${fullName.requiredErrorMsg}`),
        [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
        [email.name]: Yup.string().required(`${email.requiredErrorMsg}`),
        [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),

    })
];