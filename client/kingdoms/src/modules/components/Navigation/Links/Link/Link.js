import { NavLink } from 'react-router-dom'
import PropType from 'prop-types';
import classes from './Link.module.css';

const Link = props => {
    return (
    <li className={props.link === props.page ? classes.linkSelected : classes.link}>
        <NavLink 
            to={props.link}
            onClick={() => props.clicked(props.link)}
        >
                
            {props.children}
    
        </NavLink> 
    </li>
    );
};

Link.prototype = {

    link: PropType.string,
    children: PropType.string,
    page: PropType.string,
    clicked: PropType.func

}

export default Link;