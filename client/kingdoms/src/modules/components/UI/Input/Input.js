import Aux from '../../../hoc/Auxiliary/Auxiliary';
import withClass from '../../../hoc/withClass/withClass';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
      
        case ('input'):
            inputElement = <input 
            className={inputClasses.join(" ")} 
            {...props.elememntConfig} 
            value={props.value}
            onChange={props.changed}
            />
            break;

        case ('textarea'):
            inputElement = <textarea 
            className={classes.InputElement} 
            {...props.elememntConfig} 
            value={props.value}
            onChange={props.changed}/>
          
            break;

        case ('select'):
            inputElement = (
               
               <select
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                {props.elememntConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
               </select>
            )
    
            break;
            
        default:

            inputElement = <input 
            className={inputClasses.join(" ")} 
            {...props.elememntConfig} 
            value={props.value}
            onChange={props.changed}/>
    }


return(

    <Aux>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </Aux>

)

};

export default withClass(input, classes.Input);