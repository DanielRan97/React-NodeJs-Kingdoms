import classes from './Button.module.css';
import PropType from 'prop-types';


const Button = (props) => (

    <button
     type="button"
     disabled={props.disabled}
     onClick={props.clicked}
     className={[classes.Button,classes[props.btnType]].join(' ')}>{props.children}</button>
);

Button.prototype = {
    disabled: PropType.func,
    clicked: PropType.func,
    btnType: PropType.string    

};

export default Button;