import * as actionTypes from './types';
import { toast } from 'react-toastify';
import Axios from '../../hoc/axios';
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
// FOR CLICK IMAGE
export const CaptureAction = (model) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CLICK,
            payload: model
        });
        dispatch(GetCaptureImageAction(model.img))
    }
}

// TO GET IMAGE
export const GetCaptureImageAction = (image) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CANVASIMAGE,
            payload: image
        });
    }
}



// CHECKING LIVENESS OF THE CUSTOMER(IMAGE)
export const LiveCheckAction = (model, $this) => {
    return (dispatch) => {
        const URL = "CheckImageLiveness";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            liveimage: model.live,
            sid: "9",
            rrn: Math.floor(Math.random() * 100)
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                $this.setState({
                    spinner: false
                });
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    dispatch({
                        type: actionTypes.LIVECHECK,
                        payload: resp.confidence
                    });
                    // dispatch(FaceMatchAction(model.live, model.pan, "1", $this));
                    // dispatch(FaceMatchAction(model.live, model.adr, "2", $this));
                    // dispatch(FaceMatchAction(model.pan, model.adr, "3", $this));
                } else {
                    $this.setState({
                        spinner: false
                    });
                    toast.warn(resp.respdesc);
                    dispatch({
                        type: actionTypes.LIVECHECK,
                        payload: resp.confidence
                    });
                }
            })
            .catch((err) => {
                $this.setState({
                    spinner: false
                });
                toast.error("err");
            })
    }
}

// FACE MATCH WITH PAN, AADHAAR AND LIVE
export const FaceMatchAction = (img1, img2, id, $this) => {
    // console.log(modal);
    return (dispatch) => {
        const URL = "FaceMatch";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            image1: img1,
            image2: img2,
            matchtype: id,
            sid: "8",
            rrn: Math.floor(Math.random() * 100)
        }

        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $this.setState({
                        spinner1: false,
                        spinner2: false,
                        spinner3: false
                    });
                    toast.success(resp.respdesc);
                    if (id === "1") {
                        dispatch({
                            type: actionTypes.FACEMATCH,
                            payload: resp.confidence
                        });
                    } else if (id === "2") {
                        dispatch({
                            type: actionTypes.FACEMATCHAADHAAR,
                            payload: resp.confidence
                        });
                    } else {
                        dispatch({
                            type: actionTypes.FACEMATCHPAN,
                            payload: resp.confidence
                        });
                    }
                } else {
                    $this.setState({
                        spinner1: false,
                        spinner2: false,
                        spinner3: false
                    });
                    toast.warn(resp.respdesc);
                    if (id === "1") {
                        dispatch({
                            type: actionTypes.FACEMATCH,
                            payload: resp.confidence
                        });
                    } else if (id === "2") {
                        dispatch({
                            type: actionTypes.FACEMATCHAADHAAR,
                            payload: resp.confidence
                        });
                    } else {
                        dispatch({
                            type: actionTypes.FACEMATCHPAN,
                            payload: resp.confidence
                        });
                    }
                }
            })
            .catch((err) => {
                $this.setState({
                    spinner1: false,
                    spinner2: false,
                    spinner3: false
                });
                toast.error("err");
            })
    }
}
