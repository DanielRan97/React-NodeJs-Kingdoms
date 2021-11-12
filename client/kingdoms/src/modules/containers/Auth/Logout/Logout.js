import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as action from '../../../../core/store/actions/index';

const Logout = props => {

    const {onLogout,userId, userToken} = props;

    useEffect(() => {
        onLogout(userId, userToken);
    }, [onLogout,userId, userToken]);

    return (
        <Redirect to='/'/>
    );

};

const mapStateToPros = state => {

    return {
        userId: state.auth.userId,
        userToken: state.auth.token
        
    };

};

const mapDispatchToProps = dispatch => {
    return {
        onLogout : (userId, userToken) => dispatch(action.logOut(userId,userToken))
        };
};

export default connect(mapStateToPros, mapDispatchToProps) (Logout);