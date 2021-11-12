import classes from './Layout.module.css';
import withClass from '../withClass/withClass';
import Aux from '../Auxiliary/Auxiliary';
import Nav from '../../components/Navigation/Nav/Nav';
import SideBar from '../../components/Navigation/Side-Bar/Side-bar';
import { useState } from 'react';

const Layout = props => {

    const [sideBar, setsideBar] = useState(false);

    let checkIfSideBar = null;

    if(sideBar) {
        checkIfSideBar = (
        <div className={classes.SideBar}>
            <SideBar />
        </div>
        );
    } else {
        checkIfSideBar = null;
    }

    const sideBarHandler = () => {
        setsideBar(!sideBar);
    }

    return(
        <Aux>

            <Nav sideBarHandler={() => sideBarHandler}/>

            {checkIfSideBar}
           
            <div className={classes.content}>
            {props.children}
            </div>

        </Aux>
    );
};

export default withClass(Layout, classes.Layout);