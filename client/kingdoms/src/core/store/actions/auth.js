import * as actionTypes from './actionTypes';
import axiosUseres from '../../../core/axios/axios-users';

export const authReset = () => {

    return {
        type: actionTypes.AUTH_RESRT
    };

};

export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };

};

export const authSuccess = (data, connectType) => {

    let authData = data.data;

    return {
        type: actionTypes.AUTH_SUCCESS,
        authData,
        connectType
    };

};

export const authFail = (target) => {
    return {
        type: actionTypes.AUTH_FAIL,
        target
    };

};

export const userExists = exists => {
    return {
        type: actionTypes.CHECK_IF_USER_EXISTS,
        exists
    };
};

export const checkIfUserExists = (userData) => {
    
    return dispatch => {
        
        axiosUseres.post('/sign-up/checkIfUserExists', userData).then(res => {
         let exists = res.data.exists;
         dispatch(userExists(exists));
    });

    };
};

export const userLogOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (data, connectAction) => {

    return dispatch => {

        dispatch(authStart());

        let authData = {
            ...data,
            role: 'user'
        };

        let connectType = '/login';

        if(connectAction === false) connectType = '/sign-up';

        axiosUseres.post(connectType, authData)
        .then(resData => {
          dispatch(authSuccess(resData, connectType));
          localStorage.setItem('kingdomsAppAuthToken', resData.data.token);
        }).catch(error => {
          dispatch(authFail(connectType));
        });
    }

};

export const logoutFail = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_FAIL
    };
}


export const logOut = (userId, userToken ) => {

    return dispatch => {

        dispatch(authStart())

        axiosUseres.post('/logout', userId , {
            headers: {
                Authorization: 'Bearer ' + userToken
              }
        })
        .then(res => {
            localStorage.removeItem('kingdomsAppAuthToken');
            dispatch(userLogOut());
        }).catch (error => {
            dispatch(logoutFail());
        });
    
    };
};

