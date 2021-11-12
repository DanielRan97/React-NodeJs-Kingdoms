import { useEffect, useState } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withClass from "../../../hoc/withClass/withClass";
import classes from "./Links.module.css"
import Link from "./Link/Link";
import { connect } from "react-redux";


const Links = props => {

    const [state, setState] = useState({
        page: null
      });

    const {isLogin} = props;

      useEffect(() => {
        let pathname = '/' + window.location.pathname.split("/").pop();
        
        if(pathname === '/' || pathname === '/kingdoms'){
            isLogin ? pathname = '/kingdom' : pathname = '/home';
          };
          setState(state => ({...state, page: pathname }));
      },[isLogin]);

    const getPage = (link) => {
        setState({...state, page: link})
    };

    let loginLinks = (
        <div>
            <Link link="/kingdom" clicked={getPage} page={state.page} > Kingdom </Link>
            <Link link="/logOut" clicked={getPage} page={state.page} > Log out </Link>
        </div>
    );

    let unLoginLinks = (
        <div>
            <Link link="/home" clicked={getPage} page={state.page} exact> Home </Link>
            <Link link="/auth" clicked={getPage} page={state.page} >Authenticate</Link>
        </div>
    );

    return (
        <Aux>
            <ul>
                
                {isLogin ? loginLinks : unLoginLinks}
              
            </ul>

        </Aux>
    );
};

const mapStateToPros = state => {

    return {

        isLogin: state.auth.isLogin,
        userToken : state.auth.token
    }

};

export default connect(mapStateToPros) (withClass(Links, classes.Links));