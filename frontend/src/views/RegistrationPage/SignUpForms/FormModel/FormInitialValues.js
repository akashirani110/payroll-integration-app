import SignUpFormModel from './SignUpFormModel';

const {
    formField: {
        organisationName,
        organisationABN,
        fullName,
        position,
        email,
        password,

    }
} = SignUpFormModel;

export default {
    [organisationName.name]:'',
    [organisationABN]:'',
    [fullName.name]:'',
    [position.name]:'',
    [email.name]:'',
    [password.name]:''
};