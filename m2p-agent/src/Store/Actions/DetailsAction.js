import * as actionTypes from './types';
import { toast } from 'react-toastify';
import Axios from '../../hoc/axios';
import CryptoJS from 'node-cryptojs-aes';
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

// END VIDEO CONFERENCE WITH SESSION ID
export const GetInfoAction = (vcipid, $this) => {
    return (dispatch) => {
        const URL = "GetVCIPIDDetails";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: vcipid,
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    const location = resp.custloc;
                    const locationSplit = location.split(",");
                    // const model = {
                    //     lat: locationSplit[0],
                    //     long: locationSplit[1]
                    // };                    
                    $this.setState({
                        loader: false
                    });
                    toast.success(resp.respdesc);
                    sessionStorage.setItem("vcipid", resp.vcipid);
                    dispatch({
                        type: actionTypes.ALLINFO,
                        payload: resp
                    });
                    const adr = resp.kycdetails[0]?.pht;
                    const pan = resp.pandetails[0]?.pancard;
                    dispatch(FaceMatchPanAdrAction(pan, adr));
                    // dispatch(LocationAction(model));
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
export const GetTimeAction = () => {
    return (dispatch) => {
        const URL = "GetServerDateAndTime";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // toast.success(resp.respdesc);                    
                    const model = {
                        date: resp.date,
                        time: resp.time
                    }
                    dispatch({
                        type: actionTypes.TIME,
                        payload: model
                    });
                } else {
                    // toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                // toast.error("err");
            })
    }
}


// GET QUESTIONS FROM THE BANKER
export const GetQuestionsAction = () => {
    return (dispatch) => {
        const URL = "GetQuestions";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            // quesid: "1"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // sort by value
                    // const qtns = resp.questions
                    // qtns.sort((a, b) => {
                    //     return parseInt(a.quesid) - parseInt(b.quesid);
                    // });
                    dispatch({
                        type: actionTypes.QUESTIONS,
                        payload: resp.questions
                    });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}

// ACTION TO GET SINGLE QUESTION FRO THE LIST OF QUESTION
export const GetSingleQuestion = (id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SINGLEQUESTION,
            payload: id
        });
    }
}


// SUBMIT QUESTIONS FROM THE BANKER
export const SubmitQuestionsAction = (id, status, time) => {
    return (dispatch) => {
        const URL = "SubmitQuestions";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            quesid: id,
            status: status,
            time: time,
            remarks: "Banker-Status",
            userid: sessionStorage.getItem("userid")
        }
        console.log(body, 'req')
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    dispatch(GetQuestionsAction());
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
export const PushNotificationAction = (model) => {
    return (dispatch) => {
        const URL = "PushNotifications";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            notificationid: model.id,
            notifymsg: model.msg,
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    // console.log(resp);
                    // dispatch({
                    //     type: actionTypes.QUESTIONS,
                    //     payload: resp.questions
                    // });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}



// TO SAVE EDITED PAN DETAILS
export const SavePanDataAction = ($this, model) => {
    return (dispatch) => {
        const URL = "SavePanData";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            userid: sessionStorage.getItem("userid"),
            edtname: model.edtname,
            edtfname: model.edtfname,
            edtdob: model.edtdob
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    $this.setState({
                        check: true
                    })
                    // dispatch({
                    //     type: actionTypes.QUESTIONS,
                    //     payload: resp.questions
                    // });
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}


var count = 0;
var successCount = 0;
// GET ALL USERLIST FOR AGENT
export const UserListAction = ($this) => {
    return (dispatch) => {
        const URL = "GetVCIPIDList";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            userid: sessionStorage.getItem("userid"),
            showall: "0"
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    if (successCount == 1) {
                        toast.success(resp.respdesc);
                        successCount++
                    }
                    dispatch({
                        type: actionTypes.USERS,
                        payload: resp
                    });
                } else if (resp.respcode === "398" || resp.respcode === "399") {
                    sessionStorage.clear();
                    toast.warn(resp.respdesc);
                    $this.push("/");

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





// UPDATE VCIPT STAUTS(FINISH)
export const FinishAction = (model, $this) => {
    return (dispatch) => {
        const URL = "UpdateVCIPIDStatusByAgent";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            userid: sessionStorage.getItem("userid"),
            vcipstatus: model.vcipstatus,
            remarks: model.remarks
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    $('#finish').modal('hide');
                    toast.success(resp.respdesc);
                    $('#success').modal('show');
                    const mySession2 = $this.state.session2;
                    setTimeout(() => {
                        if (mySession2) {
                            mySession2.disconnect();
                        }
                        dispatch(ResetRdrPicAction())
                        $('#success').modal('hide');
                        sessionStorage.removeItem("vcipid");
                        $this.props.push.push("/vciplist");
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



// InitiateVideoConferenceQueue
// export const InitiateConferenceQueueAction = ($this, id) => {
//     return (dispatch) => {
//         const URL = "InitiateVideoConferenceQueue";
//         const body = {
//             slk: process.env.REACT_APP_SLK_KEY,
//             vcipid: sessionStorage.getItem("vcipid"),
//             langid: "1"
//         }
//         Axios.post(URL, parsingData(body))
//             .then((res) => {
//                 var resp = extractData(res.data);
//                 // console.log(resp);                
//                 if (resp.respcode === "200") {
//                     toast.success(resp.respdesc);
//                     dispatch(JoinVideoAction($this, id))
//                 } else {
//                     toast.warn(resp.respdesc);
//                 }
//             })
//             .catch(
//                 err => {
//                     const val = JSON.stringify(err);
//                     toast.error(JSON.parse(val).message);
//                 }
//             )
//     }
// }

// JOINING VIDEO CONFERENCE WITH SESSION ID
export const JoinVideoAction = ($this, model) => {
    return (dispatch) => {
        const URL = "JoinVideoConferenceSessionID";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: model.id,
            usertype: "2",
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    sessionStorage.setItem("videoconfsessionid", model.videoconfsessionid)
                    $this.push("/customer/" + model.id);
                } else if (resp.respcode === "469") {
                    toast.error(resp.respdesc);
                    // $this.push("/users");
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(
                err => {
                    toast.error("err");
                }
            )
    }
}


// GET VIDEO CONFERANCE STATUS(foR VIDEO CALL)
export const JoinStatusAction = () => {
    return (dispatch) => {
        const URL = "GetVideoConfAgentJoinStatus";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    const model = {
                        status: resp.customerjoinstatus,
                        vcipid: resp.vcipid
                    }
                    dispatch({
                        type: actionTypes.JOINSTATUS,
                        payload: model
                    });
                    if (resp.customerjoinstatus === "1") {
                        $('#join').modal('show');
                        toast.success("Customer is ready to take video call");
                        var audio = new Audio('../images/audio/ring.mp3');
                        audio.play();
                    }
                    // $('#success').modal('show');
                    // setTimeout(() => {
                    //     $('#success').modal('hide');
                    //     sessionStorage.removeItem("vcipid");
                    // }, 3000);
                }
                // else {
                //     toast.warn(resp.respdesc);
                // }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}


// END VIDEO CONFERENCE WITH SESSION ID
export const EndVideoAction = () => {
    return (dispatch) => {
        const URL = "EndVideoConferenceSessionID";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                } else {
                    toast.warn(resp.respdesc);
                }
            })
            .catch(
                err => {
                    toast.error("err");
                }
            )
    }
}


// GET SCREEN VIDEO URL
export const ScreenVideoUrl = (val) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SCREENURL,
            payload: val
        });
    }
}


// FACE MATCH WITH PAN AND AADHAAR
export const FaceMatchPanAdrAction = (img1, img2) => {
    // console.log(modal);
    return (dispatch) => {
        const URL = "FaceMatch";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            vcipid: sessionStorage.getItem("vcipid"),
            image1: img1,
            image2: img2,
            matchtype: "1",
            sid: "8",
            rrn: Math.floor(Math.random() * 100)
        }

        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    toast.success(resp.respdesc);
                    dispatch({
                        type: actionTypes.FACEMATCH,
                        payload: resp.confidence
                    });
                } else {
                    toast.warn(resp.respdesc);
                    dispatch({
                        type: actionTypes.FACEMATCH,
                        payload: resp.confidence
                    });
                }
            })
            .catch((err) => {
                toast.error("err");
            })
    }
}


// GET NOTIFICATION FROM THE BANKER
export const GetNotificationAction = () => {
    return (dispatch) => {
        const URL = "GetNotifications";
        const body = {
            slk: process.env.REACT_APP_SLK_KEY,
            // vcipid: sessionStorage.getItem("vcipid"),
            vcipid: sessionStorage.getItem("vcipid"),
            userid: sessionStorage.getItem("userid")
        }
        Axios.post(URL, parsingData(body))
            .then((res) => {
                var resp = extractData(res.data);
                if (resp.respcode === "200") {
                    if (resp.notificationid === "3") {
                        dispatch({
                            type: actionTypes.ENDVIDEOCALL,
                            payload: "3"
                        });
                        toast.success(resp.notifications);
                    }
                } else {
                    // toast.warn(resp.respdesc);
                }
            })
            .catch(err => {
                // toast.error("err");
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


// TTO GET LACATION BASED ON THE LAT AND LONG
// export const LocationAction = (model) => {
//     return (dispatch) => {
//         const url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + model.lat + "&longitude=" + model.long;
//         Axios.get(url)
//             .then(res => {
//                 // debugger
//                 // if (res.status === 200) {
//                 // var cityName;
//                 // if (res.city || res.city !== null || res.city !== undefined) {
//                 //     cityName = res.city;
//                 // } else {
//                 //     cityName = res.locality;
//                 // }
//                 const data = {
//                     country: res.data.countryName,
//                     state: res.data.principalSubdivision,
//                     city: res.data.city ? res.data.city : res.data.locality
//                 }
//                 dispatch({
//                     type: actionTypes.LOCATION,
//                     payload: data
//                 });
//                 // }
//             })
//             .catch(err => {
//                 toast.error("Error in location");
//             })
//     }
// }