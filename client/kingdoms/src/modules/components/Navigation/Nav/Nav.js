import withClass from '../../../hoc/withClass/withClass';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Nav.module.css';
import Links from '../Links/Links';
import PropType from 'prop-types';
import Button from '../../../components/UI/Button/Button';

const Nav = props => {

    const title = 'KINGDOMS'

    return(
        <Aux>

            <h1 className={classes.title}>{title}</h1>

            <div className={classes.menuButton}>
            <Button btnType='menuButton' clicked={props.sideBarHandler()}>
                <i className="fas fa-bars"></i>
            </Button>
            </div>

            <div className={classes.links}>

            <Links />

            </div>
        </Aux>
    );

};

Nav.prototype = {
    sideBarHandler: PropType.func,
}

export default withClass(Nav, classes.Nav);