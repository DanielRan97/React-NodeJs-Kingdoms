import withClass from "../../../hoc/withClass/withClass";
import classes from './Card.module.css';

const Card = props => {

    return props.children

};

export default withClass(Card, classes.Card);