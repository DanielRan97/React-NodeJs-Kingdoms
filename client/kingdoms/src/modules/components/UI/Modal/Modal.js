import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop';
import PropType from 'prop-types';

const modal = (props) => (
    <Aux>
       {props.show ? <Backdrop show={props.show}
        clicked={props.modalClosed}/> : null}
    <div 
    className={classes.Modal}
    style={{
        display: props.show ? 'block' : 'none',
    }}>
        {props.children}
    </div>
    </Aux>
);

modal.prototype = {

    show:PropType.bool,
    modalClosed: PropType.func

};

export default modal;