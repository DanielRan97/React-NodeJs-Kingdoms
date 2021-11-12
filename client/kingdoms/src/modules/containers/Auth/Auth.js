import classes from './Auth.module.css';
import withClass from '../../hoc/withClass/withClass';
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Card from "../../components/UI/Card/Card";
import authForm from '../../Forms/authForm';
import Input from '../../components/UI/Input/Input';
import { checkFormsValidations } from '../../../core/utility/checkFormsValidationsUtility';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as action from '../../../core/store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {  useEffect, useState } from 'react';

const Auth =  props => {

    const [authState, setAuthState] = useState({
        ...authForm,
        formIsValid: false,
        formMode: false
    });

  const {authStateToken, onAuthReset, onCheckIfUserExists} = props;

  useEffect(() => {
    onAuthReset();

    if( authState.authForm.email.valid && 
        authState.authForm.password.valid){
            setAuthState(authState => ({...authState, formIsValid: true}));
        };
    if(authState.formMode === true){
        let isValid = true;
        let i = 0;

        for (const [key] of Object.entries(authState.authForm)) {
                authState.authForm[key].valid === true? i++ : i--;
                onCheckIfUserExists(authState.authForm);
            };

            if(i !== Object.keys(authState.authForm).length) isValid = false;
    
        setAuthState(authState => ({...authState, formIsValid: isValid}));
    };
  }, [authState.authForm , authState.formMode, onAuthReset, onCheckIfUserExists,]);

    useEffect(() => {
        setAuthState(authState => ({...authState, formMode: false}));
    }, [authStateToken]);

    let authenticationForm = authState.authForm;

    const authFormModeHandler = () => {
        setAuthState({...authState, formMode: !authState.formMode});
    };

    const inputChangeHandler = (event, inputlName) => {

        const updatedAuthForm ={
            ...authenticationForm 
        } 
        const updatedFormElement = {
            ...updatedAuthForm[inputlName]
         };
         let targetValue = event.target.value.replace(/\s/g, '');
         updatedFormElement.value = targetValue;
         updatedFormElement.valid = checkFormsValidations(updatedFormElement.value, updatedFormElement.validation);
         updatedFormElement.touched = true;
         updatedAuthForm[inputlName] = updatedFormElement;
         let formIsValid = true;
         
         if(authState.formMode === true){
            for(let input in updatedAuthForm){
                formIsValid =  updatedAuthForm[input].valid && formIsValid;
            };
         } else {
            
            formIsValid =  updatedAuthForm['email'].valid && updatedAuthForm['password'].valid;

         };

         setAuthState({...authState, authForm: updatedAuthForm, formIsValid});
         authenticationForm = updatedAuthForm;

         if(authState.formMode && updatedFormElement.uniq) onCheckIfUserExists(updatedAuthForm);
        
    };

    const formElementsArry = [];

    if(authenticationForm ) {
        for (let key in authenticationForm ){
            formElementsArry.push({
                id: key,
                config: authenticationForm[key],
            });
        };
        
    };
    

       let signUpForm = formElementsArry.map( (formElement, i) => (
            <div key={i}>
                 <Input 
                   key={formElement.id}
                   elementType={formElement.config.elementType} 
                   elememntConfig={formElement.config.elememntConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid || props.authStateUserExists[formElement.id] === true}
                   touched={formElement.config.touched}
                   changed={(event) => inputChangeHandler(event, formElement.id)}
                   />
                    
                   {!formElement.config.valid && 
                    formElement.config.touched ?
                    <p className={classes.inputError}>
                        {`* ${formElement.config.error}`} 
                    </p>: null}

                    {props.authStateUserExists[formElement.id] === true &&
                     formElement.config.uniq ?
                     <p className={classes.inputError}>
                        {`* This ${formElement.config.elementName} is alredy exists`} 
                     </p>: null}  
            </div>
             ));


       let loginForm = formElementsArry.map( (formElement, i) => (
 
            <div key={i}>
                {formElement.config.target === 'login' ?
                 <Input 
                 key={formElement.id}
                 elementType={formElement.config.elementType} 
                 elememntConfig={formElement.config.elememntConfig}
                 value={formElement.config.value}
                 invalid={!formElement.config.valid}
                 touched={formElement.config.touched}
                 changed={(event) => inputChangeHandler(event, formElement.id)}/> :
                 null
            } 

                    {!formElement.config.valid &&
                     formElement.config.touched &&
                     formElement.config.target === 'login'?
                    <p className={classes.inputError}>
                        * {formElement.config.error} 
                    </p>: null}  
            </div>   
            ));
    
    let forms = authState.formMode === true ? signUpForm : loginForm;

    let loginError = null;

    const authHandler = () => {

        let data = {};
        for (const key in authenticationForm) {
            data[key] = authenticationForm[key].value;
        };

        props.onAuth(data, authState.formMode) ;

    };

    let spinner = <Spinner />

    let title = <h1 className={classes.title}>{authState.formMode? 'SIGN UP' : 'LOGIN'}</h1>;

    let authFormCard = (
        <Card>
                    
            {title}
            
        <form className={classes.authForm}>

            {props.authStateLoading ? spinner : forms}

            <Button
            disabled={ !authState.formIsValid || props.isExists}
            btnType={"authButton"}
            clicked={() => authHandler()}>{authState.formMode? 'SIGN UP' : 'LOGIN'}</Button>
            {props.authStatError ? <p className={classes.errorTitle}>{`${props.authStatError}`}</p> : null}
            <li className={classes.authModeLink} onClick={authFormModeHandler}>{!authState.formMode? "Don't have account? SIGN UP" : "Alredy have account? LOGIN"}</li>

            {loginError}
        </form>

    </Card>
    );

    

    return (
        <Aux>
            <div className={classes.authCard}>
                {authFormCard}
            </div>
        </Aux>
    );

};

const mapStateToPros = state => {

    return {
        authStatError: state.auth.error,
        userExistsError: state.auth.userExists,
        authStateLoading: state.auth.loading,
        authStateToken: state.auth.token,
        authStateUserExists: state.auth.userExists,
        isExists : state.auth.isExists,
        isLogin: state.auth.isLogin
    }

}

const mapDispatchToProps = dispatch => {

    return {
        onAuth: (authData, isSignUp) => dispatch(action.auth(authData, !isSignUp)),
        onAuthReset: () => dispatch(action.authReset()),
        onCheckIfUserExists: (userData) => dispatch(action.checkIfUserExists(userData))
    };
};

export default connect(mapStateToPros, mapDispatchToProps) (withClass(Auth, classes.Auth));