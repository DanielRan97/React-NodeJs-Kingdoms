import classes from './Backdrop.module.css';
import PropType from 'prop-types';

const backdrop = (props) => (
    
    props.show ?<div onClick={props.clicked}
    className={classes.Backdrop}></div>:null
);

backdrop.prototype = {

    show: PropType.bool,
    clicked: PropType.func

}

export default backdrop ;