import Axios from '../../hoc/axios';
import { toast } from 'react-toastify';
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


// FORGOT PASSWORD

export const ForgotPasswordAction = (email) => {
    return (dispatch) => {
        const URL = "forgotpassword";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            username: email,
            role: "2",
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // console.log(resp, 'forgot email')
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                toast.error("err");
            })
    }
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
                    if (resp.role === "2") {
                        toast.success(resp.respdesc);
                        sessionStorage.setItem("sessionid", resp.sessionid);
                        sessionStorage.setItem("role", resp.role);
                        sessionStorage.setItem("username", resp.username);
                        sessionStorage.setItem("userid", resp.userid);
                        $this.props.history.push("/vciplist");
                    } else {
                        toast.error("Please login with Auditor Credentials");
                    }
                } else if (resp.respcode === "468") {
                    $this.setState({
                        message: resp.respdesc
                    });
                    $('#login').modal('show');
                } else {
                    toast.warn(resp.respdesc);
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
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    sessionStorage.clear();
                    $this.push("/");
                    toast.success(resp.respdesc);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                toast.error("err");
            })
    }
}