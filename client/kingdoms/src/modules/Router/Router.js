import Aux from '../hoc/Auxiliary/Auxiliary';
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import PageNotFound from '../containers/Page-not-found/Page-not-found';
import { connect } from 'react-redux';
const AsyncAuth = asyncComponent(() => import('../containers/Auth/Auth'));
const AsyncHome = asyncComponent(() => import('../containers/Home/Home'));
const AsyncKingdom = asyncComponent(() => import('../containers/Kingdom/Kingdome'));
const AsyncLogOut = asyncComponent(() => import('../containers/Auth/Logout/Logout'));

const Router = props => {

    let routes =(
    <Switch>
        <Route path="/" exact component={AsyncHome}  />
        <Route path="/home" component={AsyncHome}  />
        <Route path="/auth" component={AsyncAuth}  />
        <Redirect to={"/"} />
        <Route render={() => <PageNotFound/> } />
    </Switch>
    );

    if(props.isLogin){
        routes = (
    <Switch>
        <Route path="/" exact component={AsyncKingdom}  />
        <Route path="/kingdom" component={AsyncKingdom}  />
        <Route path="/logOut" component={AsyncLogOut}/>
        <Redirect to={"/"} />
        <Route render={() => <PageNotFound/> } />
    </Switch>
        );
    }

    return (
        <Aux>
            {routes}
        </Aux>
    );

};

const mapStateToPros = state => {

    return {

        isLogin: state.auth.isLogin
        
    };

};

export default connect(mapStateToPros)(Router);