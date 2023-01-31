import Axios from '../../hoc/axios';
import { toast } from 'react-toastify';
import * as actionTypes from './types';
import AES256 from 'aes-everywhere';
import base64 from 'react-native-base64';
const $ = window.$;


const parsingData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
    return encrypted;
}

const extractData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = JSON.parse(AES256.decrypt(data, finalvalue));
    return decrypted;
}


// LOGIN
export const LoginAction = (url, body, $this) => {
    return (dispatch) => {
        Axios.post(url, parsingData(body))
            .then(res => {
                var resp = extractData(res.data);
                if (body.authflag === "1") {
                    $('#login').modal('hide');
                }
                if (resp.respcode === "200") {
                    if (resp.role === "1") {
                        toast.success(resp.respdesc);
                        sessionStorage.setItem("sessionid", resp.sessionid);
                        sessionStorage.setItem("role", resp.role);
                        sessionStorage.setItem("username", resp.username);
                        sessionStorage.setItem("userid", resp.userid);
                        $this.props.history.push("/vciplist");
                    } else {
                        toast.error("Please login with Agent Credentials");
                    }
                } else if (resp.respcode === "468") {
                    $this.setState({
                        message: resp.respdesc
                    });
                    $('#login').modal('show');
                } else {
                    // toast.warn(resp.respdesc);
                    console.log("Please Check once")
                }
            })
            .catch(err => {
                if (body.authflag === "1") {
                    $('#login').modal('hide');
                }
                toast.error("Error in Login");
            })
    }
}


// GET ALL USERLIST FOR AGENT
export const LogoutAction = ($this) => {
    return (dispatch) => {
        const URL = "UserLogout";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // toast.success(resp.respdesc);
                    sessionStorage.clear();
                    $this.push("/");
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                toast.error("err");
            })
    }
}



// RESET ALL REDUCERES
export const ResetRdrAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESET,
            payload: undefined
        })
    }
}

// RESET ALL REDUCERES
export const ResetRdrPicAction = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.RESETPIC,
            payload: undefined
        })
    }
}