import classes from './Side-bar.module.css';
import withClass from '../../../hoc/withClass/withClass';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Links from '../Links/Links';

const SideBar = () => {

    return (
    <Aux>
        <h1 className={classes.menuTitle}>MENU</h1>

        <div className={classes.menuOptions}>
            <Links />
        </div>
    </Aux>
    );
};

export default withClass(SideBar, classes.SideBar);