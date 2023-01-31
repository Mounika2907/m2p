import React, { Component, useContext } from 'react'
// import './App.css';
import Aux from './hoc/Aux';
import { Switch, Route, Redirect, useParams } from 'react-router-dom';
// import Home from './View/Home/Home';
// import Login from './View/Forms/Login/Login';
import PageNotFound from './Component/PageNotFound/PageNotFound';
// import Register from './View/Forms/Register/Register';
import Layout from './Component/Common/Layout/Layout';
import { LanguageProvider } from './View/Language/Language';
import { withRouter } from "react-router";
import queryString from 'query-string';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';

// import { User } from './View/Forms/User/User';
// const MyContext = React.createContext(defaultValue);

class App extends Component {
  Constructor(props) {
    this.state = {
      color: null,
    }
  }

  

  componentWillMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search);
      const data = decodeURI(parsed.d)
      const d = this.extractData(data)
      // this.setState({
      //   color: d.colorcode
      // })

      // localStorage.setItem("colorcode", d.colorcode);
    }
  }


  // componentDidMount() {
  //   console.log('did mount')
  //   if (this.props.location.search) {
  //     const parsed = queryString.parse(this.props.location.search);
  //     const data = decodeURI(parsed.d)
  //     const d = this.extractData(data)
  //     this.setState({
  //       color: d.colorcode
  //     })
  //     localStorage.setItem("colorcode", d.colorcode);
  //   }
  // }


  extractData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase?.substr(0, 4);
    let val2 = passphrase?.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = JSON.parse(AES256.decrypt(data, finalvalue));
    return decrypted;
  }


  render() {
    if (this.state?.colorcode != undefined) {
      localStorage.setItem("colorcode", this.state.colorcode);
    }


    return (
      // <MyContext.Provider value ={colorcode}>
      <LanguageProvider>
        <Aux>
          <Switch>
            {/* <Route path="/application" exact name="Login" render={props => <Login {...props}/>} /> */}
            {/* <Route path="/" exact name="User" render={props => <User {...props}/>} /> */}
            <Route path="/404" exact name="404" render={props => <PageNotFound {...props} />} />
            <Route path="/" strict={true} name="Home" render={props => <Layout {...props} />} />
            {/* <Redirect to="/404" from="*" /> */}
          </Switch>
        </Aux>
      </LanguageProvider>
      // </MyContext.Provider>
    );
  }
}

export default withRouter(App);
