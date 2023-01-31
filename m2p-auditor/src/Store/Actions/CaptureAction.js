import * as actionTypes from './types';
import { toast } from 'react-toastify';
import Axios from '../../hoc/axios';

// const headers = {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
// }

export const CaptureAction = (mode) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.CLICK,
            payload: mode
        });
    }
}



// CHECKING LIVENESS OF THE CUSTOMER(IMAGE)
export const LiveCheckAction = (img, $this) => {
    return (dispatch) => {
        const URL = "CheckImageLiveness";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            liveimage: img,
            sid: "9",
            rrn: Math.floor(Math.random() * 100)
        }
        Axios.post(URL, body)
            .then((res) => {
                $this.setState({
                    spinner: false
                });
                if (res.data.respcode === "200") {
                    toast.success(res.data.respdesc);
                    dispatch({
                        type: actionTypes.LIVECHECK,
                        payload: res.data.confidence
                    });
                } else {
                    $this.setState({
                        spinner: false
                    });
                    toast.warn(res.data.respdesc);
                    dispatch({
                        type: actionTypes.LIVECHECK,
                        payload: res.data.confidence
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
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            image1: img1,
            image2: img2,
            matchtype: id,
            sid: "8",
            rrn: Math.floor(Math.random() * 100)
        }

        Axios.post(URL, body)
            .then((res) => {
                if (res.data.respcode === "200") {
                    $this.setState({
                        spinner1: false,
                        spinner2: false,
                        spinner3: false
                    });
                    toast.success(res.data.respdesc);
                    if (id === "1") {
                        dispatch({
                            type: actionTypes.FACEMATCH,
                            payload: res.data.confidence
                        });
                    } else if (id === "2") {
                        dispatch({
                            type: actionTypes.FACEMATCHAADHAAR,
                            payload: res.data.confidence
                        });
                    } else {
                        dispatch({
                            type: actionTypes.FACEMATCHPAN,
                            payload: res.data.confidence
                        });
                    }
                } else {
                    $this.setState({
                        spinner1: false,
                        spinner2: false,
                        spinner3: false
                    });
                    toast.warn(res.data.respdesc);
                    if (id === "1") {
                        dispatch({
                            type: actionTypes.FACEMATCH,
                            payload: res.data.confidence
                        });
                    } else if (id === "2") {
                        dispatch({
                            type: actionTypes.FACEMATCHAADHAAR,
                            payload: res.data.confidence
                        });
                    } else {
                        dispatch({
                            type: actionTypes.FACEMATCHPAN,
                            payload: res.data.confidence
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

        // let path = modal.split(',')[1];
        // let formData = new FormData();
        // formData.append('data', path);
        // Axios.post("http://13.127.209.224:8080/check_liveness", formData, { headers: { headers } })
        //     .then(
        //         (res) => {
        //             console.log(res.data);
        //             dispatch({
        //                 type: actionTypes.FACEMATCH,
        //                 payload: modal
        //             });
        //         }
        //     )
        //     .catch(
        //         err => {
        //             toast.error("Error PAN");
        //         }
        //     )
    }
}