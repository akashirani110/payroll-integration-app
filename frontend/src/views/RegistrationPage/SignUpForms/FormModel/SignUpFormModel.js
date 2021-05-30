export default {
    formId: 'signUpForm',
    formField: {
        organisationName:{
        name: 'organisationName'
        },
        organisationABN:{
        name: 'orgnaisationABN'
        },
        fullName:{
        name: 'fullName',
        requiredErrorMsg: 'Name is Required'
        },
        position:{
            name: 'position',
            requiredErrorMsg: 'Position in organisation is required'
        },
        email:{
            name: 'email',
            requiredErrorMsg: 'Email id is required'
        },
        password:{
            name: 'password',
            requiredErrorMsg: 'Password is required'
        }
    }
};