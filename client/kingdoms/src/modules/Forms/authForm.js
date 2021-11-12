const authForm = {

    authForm:{
        nickName: {
            elementType : 'input',
            elememntConfig : {
                type: 'text',
                placeholder: 'Nick Name*'
            },
            target:'sign-up',
            value: '',
            uniq: true,
            elementName: 'Nick Name',
            validation: {
                requierd: true,
                minLength: 3,
                maxLength: 15,
            },
            valid: false,
            touched: false,
            error: 'Must contain 3-15 letters'
        },
        name: {
            elementType : 'input',
            elememntConfig : {
                type: 'text',
                placeholder: 'Name*'
            },
            target:'sign-up',
            value: '',
            elementName: 'Name',
            validation: {
                requierd: true,
                minLength: 2,
                maxLength: 15,
                lettersOnly: true
            },
            valid: false,
            touched: false,
            error: ' Must contain 2-15 letters, Only letters'
        },
        lastName: {
            elementType : 'input',
            elememntConfig : {
                type: 'text',
                placeholder: 'Last Name*'
            },
            target:'sign-up',
            value: '',
            elementName: 'Last Name',
            validation: {
                requierd: true,
                minLength: 2,
                maxLength: 15,
                lettersOnly: true
            },
            valid: false,
            touched: false,
            error: ' Must contain 2-15 letters, Only letters'
        },
        kingdomName: {
            elementType : 'input',
            elememntConfig : {
                type: 'text',
                placeholder: 'Your Kingdom Name*'
            },
            target:'sign-up',
            value: '',
            uniq: true,
            elementName: 'Kingdom Name',
            validation: {
                requierd: true,
                minLength: 3,
                maxLength: 15,
                lettersOnly: true
            },
            valid: false,
            touched: false,
            error: ' Must contain 3-15 letters, Only letters'
        },
        email: {
            elementType : 'input',
            elememntConfig : {
                type: 'email',
                placeholder: 'Mail Adress*'
            },
            target:'login',
            value: '',
            uniq: true,
            elementName: 'Email',
            validation: {
                requierd: true,
                email: true
            },
            valid: false,
            touched: false,
            error: 'Invalid mail address'
        },
        password: {
            elementType : 'input',
            elememntConfig : {
                type: 'password',
                placeholder: 'Password*'
            },
            target:'login',
            value: '',
            elementName: 'Password',
            validation: {
                requierd: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            error: ' Must contain least 6 characters'
        }
    }
};

export default authForm;