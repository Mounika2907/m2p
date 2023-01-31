import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import UserFormCmp from '../../../Component/Forms/UserForm/UserFormCmp';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { LoginAction } from '../../../Store/Actions/Login';
import base64 from 'react-native-base64';
const $ = window.$;

class Login extends Component {
    state = {
        email: '',
        password: '',
        // authflag: '0',
        message: ''
        // error: {
        //     emailErr: '',
        //     pwdErr: ''
        // }
    }

    componentDidMount() {
        this.checkLoginUrl();
    }

    checkLoginUrl = () => {
        // console.log(this.props.location.pathname);
        const log = sessionStorage.getItem("sessionid");
        const log1 = sessionStorage.getItem("username");
        const log2 = sessionStorage.getItem("userid");
        if (log || log1 || log2) {
            this.props.history.push("/vciplist");
        } else {
            if (this.props.location.pathname === "/") {
                sessionStorage.clear();
            }
        }
    }

    // HANDLE INPUT
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    HandleSubmit = (event, authflag) => {
        event.preventDefault();       
        if (this.state.email && this.state.password) {
            const $this = this;
            const url = "UserLogin";
            // const role = "agent";
            let val = base64.encode(this.state.password);
            const body = {
                "username": this.state.email,
                "password": val,
                "role": "1",
                authflag: authflag
            }
            this.props.LoginAction(url, body, $this);
        } else {
            toast.warning("Please fill all the Form data");
        }
    }

    render() {

        return (
            <Aux>
                <section className="dashboad" style={{minHeight: "100vh",}}>
                    <UserFormCmp
                        change={this.handleChange}
                        login={(authflag, event) => this.HandleSubmit(authflag, event)}
                        message={this.state.message}
                        check={!(this.state.email && this.state.password)}
                    />
                </section>
            </Aux>
        )
    }
}

// const mapStateToProps = (state) => {
//     const { pincodeRdr } = state;
//     return { pincodeRdr }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        LoginAction: (url, body, $this) => dispatch(LoginAction(url, body, $this))
    }
}

export default connect(null, mapDispatchToProps)(Login);
