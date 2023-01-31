import React, { Component } from 'react';
// import './App.css';
import Aux from './hoc/Aux';
import { Switch, Route, Redirect } from 'react-router-dom';
// import Home from './View/Home/Home';
import Login from './View/Forms/Login/Login';
import PageNotFound from './Component/PageNotFound/PageNotFound';
import Register from './View/Forms/Register/Register';
import Layout from './Component/Common/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Aux>
        <Switch>
          <Route path="/" exact name="Login" render={props => <Login {...props} />} />
          <Route path="/register" exact name="Register" render={props => <Register {...props} />} />
          <Route path="/404" exact name="404" render={props => <PageNotFound {...props} />} />
          <Route path="/" name="Home" render={props => <Layout {...props} />} />
          <Redirect to="/404" from="*" />
        </Switch>
      </Aux>
    );
  }
}

export default App;
