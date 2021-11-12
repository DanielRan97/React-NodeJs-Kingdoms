import Router from '../Router/Router'
import Aux from '../hoc/Auxiliary/Auxiliary';
import Layout from '../hoc/Layout/Layout';
import withClass from '../hoc/withClass/withClass';
import classes from './App.module.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import * as action from '../../core/store/actions/index';
import Modal from '../components/UI/Modal/Modal';
import Button from '../components/UI/Button/Button';

const App = props => {

  const {onAuthReset, onAuthCheck, logoutFail} = props;

  useEffect(() => {
    onAuthReset();
  }, [onAuthReset, onAuthCheck]);

  let logoutFailModal = <Modal show={logoutFail} modalClosed={onAuthReset}>
      <p>Network Error, Logot Faild!</p>
      <Button 
      clicked={onAuthReset} btnType="closeModalButton">Close</Button></Modal>

  return (
   <Aux>
     <Layout>
      {logoutFailModal}
      <Router />
      
     </Layout>
   </Aux>
  );
};

const mapStateToPros = state => {

  return {
      logoutFail: state.auth.logoutFail
  }

}

const mapDispatchToProps = dispatch => {

  return {
      onAuthReset: () => dispatch(action.authReset()) 
     };
};


export default connect(mapStateToPros, mapDispatchToProps) (withClass(App, classes.App));
