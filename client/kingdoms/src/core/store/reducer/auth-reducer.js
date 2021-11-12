import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility/upadateObjUtility';

const initialState = {

    token: null,
    userId: null,
    email: undefined,
    name: undefined,
    nickName: undefined,
    kingdomName: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    error: null,
    userExists: {},
    isExists: false,
    isLogin: false,
    role: null,
    loading: false,
    logoutFail: false
};

const authReset = (state) => {
    return updateObject(state, { error: null, loading: false, userExists: {}, isExists: false, logoutFail: false})
};

const authStart = (state) => {
    return updateObject(state, { error: null, loading: true, userExists: {}, isExists: false})
};

const authSuccess = (state, action) => {
    
    let data = action.authData;
    
    if(action.connectType === '/login'){

        return updateObject(state, { 
            token: data.token,
            userId: data.user._id,
            error: null,
            loading: false,
            email: data.user.email,
            name: data.user.name,
            nickName: data.user.nickName,
            kingdomName: data.user.kingdomName,
            role: data.user.role,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            userExists: {},
            isLogin: true,
            isExists: false
         });
    } else {
        return updateObject(state, { 
            error: null,
            userExists: {},
            token: data.token,
            isExists: false
         });
    }
};

const authFail = (state, action) => {

    let error = 'Login Faild. Probably Incorrect email or password or something went wrong with the network';
    if(action.target === '/sign-up') error = 'Sign up Faild. Probably because the user already exists or something went wrong with the network'

    return updateObject(state,{  
        error,
        loading: false,
        email: undefined,
        name: undefined,
        nickName: undefined,
        kongdomeName: undefined,
        userExists: {},
        isLogin: false
    });
    
};

const logoutFail = (state) => {
    return updateObject(state,{  
        logoutFail: true
    });
};

const userExists = (state, action) => {

    let user = action.exists;
    let isExists = false;
    let i = 0;

    for (const [key] of Object.entries(user)) {
            if(user[key] === true) i++ ;
            if(i !== 0 ) isExists = true;
        };

    return updateObject(state,{  
        userExists: user,
        isExists
    });
};

const authLogOut = state => {
    console.log('logOut');
    return updateObject(state, {
        token: null,
        userId: null,
        email: undefined,
        name: undefined,
        nickName: undefined,
        kingdomName: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        error: null,
        userExists: {},
        isExists: false,
        isLogin: false,
        role: null,
        loading: false
    });
};


const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        
        case actionTypes.AUTH_RESRT: return authReset(state);

        case actionTypes.CHECK_IF_USER_EXISTS: return userExists(state, action);
        
        case actionTypes.AUTH_START: return authStart(state);

        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);

        case actionTypes.AUTH_FAIL: return authFail(state, action);

        case actionTypes.AUTH_LOGOUT: return authLogOut(state);

        case actionTypes.AUTH_LOGOUT_FAIL: return logoutFail(state);
                
        default: return state;
    };

};

export default authReducer;