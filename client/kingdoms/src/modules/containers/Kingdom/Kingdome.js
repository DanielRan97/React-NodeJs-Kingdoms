import classes from './Kingdom.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withClass from '../../hoc/withClass/withClass';

const Kingdom = () => {



    return (
        <Aux>
            Hello Kingdom
        </Aux>
    );
};

export default withClass(Kingdom, classes.Kingdome);