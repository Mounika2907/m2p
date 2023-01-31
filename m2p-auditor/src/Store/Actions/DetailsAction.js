import * as actionTypes from './types';
import { toast } from 'react-toastify';
import Axios from '../../hoc/axios';
import base64 from 'react-native-base64';
import CryptoJS from 'node-cryptojs-aes';
import AES256 from 'aes-everywhere';
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

// DownloadPdf
export const DownloadPdf = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.DOWNLOADPDF,
            payload: data
        })
    }
}
export const spinnerAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SPINNER,
            payload: data
        })
    }
}

// CHANGE PASSWORD
export const ChangePasswordAction = (modal) => {
    return (dispatch) => {
        const URL = "ChangePassword";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            userid: sessionStorage.getItem("userid"),
            role: "2",
            oldpassword: base64.encode(modal.oldpassword),
            newpassword: base64.encode(modal.newpassword)
        }
        // console.log(body, 'hitting');
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // console.log(resp, "change Password");
                if (resp.respcode === "200") {
                    // dispatch({
                    //     type: actionTypes.CHANGEPASSWORD,
                    //     payload: resp
                    // });
                    toast.success(resp.respdesc)
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                toast.error("err");
            })
    }
}

// END VIDEO CONFERENCE WITH SESSION ID
export const GetInfoAction = (vcipid, id, $this) => {
    return (dispatch) => {
        const URL = "GetVCIPIDDetails";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: vcipid,
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                // console.log(resp, "get vcipid details");
                if (resp.respcode === "200") {
                    $('#aadharCompletemodal').modal('hide');
                    // $this.setState({
                    //     spinner: false
                    // })
                    dispatch({
                        type: actionTypes.VIDEOURL,
                        // payload: val
                        payload: resp
                    });
                    // dispatch(spinnerAction(false))

                    setTimeout(() => {
                        if (id === "01") {
                            $('#finish').modal('show')
                        }
                    }, 1000);

                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                toast.error("err");
            })
    }
}

// TO GET SERVER TIME FOR COMMON USER AND BANKER 

// export const GetTimeAction = () => {
//     return (dispatch) => {
//         const URL = "GetServerDateAndTime";
//         const body = {
//             slk: "JRFHK-EBCWQ-VUKGC-HGUKS"
//         }
//         Axios.post(URL, body)
//             .then((res) => {
//                 if (resp.respcode === "200") {
//                     // toast.success(resp.respdesc);                    
//                     const model = {
//                         date: resp.date,
//                         time: resp.time
//                     }
//                     dispatch({
//                         type: actionTypes.TIME,
//                         payload: model
//                     });
//                 } else {
//                     // toast.warn(resp.respdesc);
//                 }
//             })
//             .catch(err => {
//                 // toast.error("err");
//             })
//     }
// }


// GET QUESTIONS FROM THE BANKER
export const GetQuestionsAction = (id) => {
    return (dispatch) => {
        const URL = "GetQuestions";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: id
            // quesid: "1"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    dispatch({
                        type: actionTypes.QUESTIONS,
                        payload: resp.questions
                    });
                    dispatch(spinnerAction(false))
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}

// SUBMIT QUESTIONS FROM THE AUDITOR
export const SubmitQuestionsAction = (model) => {
    return (dispatch) => {
        const URL = "SubmitQuestions";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            quesid: model.quesid,
            status: model.status,
            remarks: model.remarks,
            userid: sessionStorage.getItem("userid"),
            time: 0
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    dispatch(GetQuestionsAction(sessionStorage.getItem("vcipid")));
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}

// UPDATE BOTH CUSTOMER AND AGENT STATUS BY AUDITOR
export const UpdateBothAction = (model, $this) => {
    return (dispatch) => {
        const URL = "UpdateVCIPIDStatusByAuditor";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            vcipid: sessionStorage.getItem("vcipid"),
            vcipstatus: model.status,
            remarks: model.remarks,
            userid: sessionStorage.getItem("userid")
        };
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    $('#finish').modal('hide');
                    $('#success').modal('show');
                    dispatch({
                        type: actionTypes.AUDITORSTATUS,
                        payload: model.remarks
                    });
                    setTimeout(() => {
                        $('#success').modal('hide');
                        // sessionStorage.removeItem("vcipid");
                        $this.push("/vciplist");
                    }, 3000);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}

// PUSH NOTIFICATION FORM THE AGENT
// export const PushNotificationAction = () => {
//     return (dispatch) => {
//         const URL = "PushNotifications";
//         const body = {
//             slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
//             vcipid: sessionStorage.getItem("vcipid"),
//             notificationid: "",
//             notifymsg: "",
//         }
//         Axios.post(URL, body)
//             .then((res) => {
//                 if (resp.respcode === "200") {
//                     console.log(resp);
//                     // dispatch({
//                     //     type: actionTypes.QUESTIONS,
//                     //     payload: resp.questions
//                     // });
//                 } else {
//                     toast.warn(resp.respdesc);
//                 }
//             })
//             .catch((err) => {
//                 toast.error("err");
//             })
//     }
// }



// // TO SAVE EDITED PAN DETAILS
// export const SavePanDataAction = (model) => {
//     return (dispatch) => {
//         const URL = "SavePanData";
//         const body = {
//             slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
//             vcipid: sessionStorage.getItem("vcipid"),
//             userid: sessionStorage.getItem("userid"),
//             edtname: model.edtname,
//             edtfname: model.edtfname,
//             edtdob: model.edtdob
//         }
//         Axios.post(URL, body)
//             .then((res) => {
//                 if (resp.respcode === "200") {
//                     toast.success(resp.respdesc);
//                     // dispatch({
//                     //     type: actionTypes.QUESTIONS,
//                     //     payload: resp.questions
//                     // });
//                 } else {
//                     toast.warn(resp.respdesc);
//                 }
//             })
//             .catch((err) => {
//                 toast.error("err");
//             })
//     }
// }

var count = 0;
var successCount = 0;

// GET ALL USERLIST FOR AGENT
export const UserListAction = ($this) => {
    return (dispatch) => {
        const URL = "GetVCIPIDList";
        const body = {
            slk: "JRFHK-EBCWQ-VUKGC-HGUKS",
            userid: sessionStorage.getItem("userid"),
            showall: "1"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    if (successCount == 1) {
                        toast.success(resp.respdesc);
                        successCount++
                    }
                    // toast.success(resp.respdesc);
                    dispatch({
                        type: actionTypes.USERS,
                        payload: resp
                    });
                // } else if (resp.respcode === "398" || resp.respcode === "399") {
                //     sessionStorage.clear();
                //     toast.warn(resp.respdesc);
                //     $this.push("/");
                } else {
                    // toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                count++;
                if (count == 1 || count == 4 || count == 10) {
                    toast.error("Error");
                }

            })
    }
}

