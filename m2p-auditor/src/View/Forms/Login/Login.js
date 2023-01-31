import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import UserFormCmp from '../../../Component/Forms/UserForm/UserFormCmp';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { LoginAction, ForgotPasswordAction } from '../../../Store/Actions/Login';
import base64 from 'react-native-base64';

class Login extends Component {
    state = {
        email: '',
        password: '',
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
        if (this.props.location.pathname === "/") {
            sessionStorage.clear();
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
            let val = base64.encode(this.state.password);
            const body = {
                "username": this.state.email,
                "password": val,
                "role": "2",
                authflag: authflag
            }
            this.props.LoginAction(url, body, $this)
        } else {
            toast.warning("Please fill all the Form data");
        }
    }

    handleForgotPass = (event) => {
        event.preventDefault();
        if (this.state.email) {
            this.props.ForgotPasswordAction(this.state.email)
        } else {
            toast.error("Please enter email")
        }
    }

    render() {
            // console.log(this.props.pincodeRdr.modal);
        return (
            <Aux>
                <section className="dashboad" style={{minHeight: "100vh",}}>
                    <UserFormCmp
                        change={this.handleChange}
                        login={(authflag, event) => this.HandleSubmit(authflag, event)}
                        message={this.state.message}
                        check={!(this.state.email && this.state.password)}
                        ForgotPass={this.handleForgotPass}
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
        LoginAction: (url, body, $this) => dispatch(LoginAction(url, body, $this)),
        ForgotPasswordAction: (email) => dispatch(ForgotPasswordAction(email)),

    }
}

export default connect(null, mapDispatchToProps)(Login);
