import * as actionTypes from '../types';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { OpenVidu } from 'openvidu-browser';
// import https from 'https';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';
const $ = window.$;

const OPENVIDU_SERVER_URL = process.env.REACT_APP_VIDEO_API;
// const OPENVIDU_SERVER_URL = sessionStorage.getItem('mediaserver');
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


const aesEncrypt = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
    return encrypted;
}

const aesDecrypt = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = AES256.decrypt(data, finalvalue);
    return decrypted;
}

// At instance level
const instance = Axios.create({
    baseURL: OPENVIDU_SERVER_URL
});


export const chatCreateSession = (sessionId, $this, OV) => {
    return (dispatch) => {
        const data = {
            // "mediaMode": "ROUTED",
            "recordingMode": "ALWAYS",
            "customSessionId": sessionId,
            "defaultRecordingLayout": "CUSTOM",
            // "defaultOutputMode": "INDIVIDUAL",
            // "defaultCustomLayout": "CUSTOM_LAYOUT"
        }
        let body = {
            "data": aesEncrypt(data)
        }
        instance.post('/sessions', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            var response = aesDecrypt(resp.data.data);
            dispatch({
                type: actionTypes.CHAT_SESSION_ID,
                payload: response.id
            });
            dispatch(chatCreateToken2(sessionId, $this, OV));
            dispatch(chatCreateToken(sessionId, $this, OV));
        }).catch((err) => {
            
            var error = Object.assign({}, aesDecrypt(err.data.data));
            if (error.response && error.response.status === 409) {
                dispatch({
                    type: actionTypes.CHAT_SESSION_ID,
                    payload: sessionId
                });
                dispatch(chatCreateToken2(sessionId, $this, OV));
                dispatch(chatCreateToken(sessionId, $this, OV));
            } else {
                toast.error("No connection to VCIP");
                $this.props.push.push("/vciplist")
            }
        });
    }
}

export const chatCreateToken = (sessionId, $this, OV) => {
    return (dispatch) => {
        // var data = JSON.stringify({ session: sessionId });
        var data = {
            session: sessionId
        };
        let body = {
            "data": aesEncrypt(data)
        }
        instance.post('/tokens', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            const mySession = $this.state.session;
            var response = JSON.parse(aesDecrypt(resp.data.data));
            sessionStorage.setItem("session", response.session);
            // console.log(response);
            
            mySession.on('signal', (event) => {
                dispatch({
                    type: actionTypes.CHATMESSAGES,
                    payload: event
                });
                const val = sessionStorage.getItem('connectionId');
                if (event.from.connectionId === val) {
                    var audio = new Audio('../images/audio/tone.mp3');
                    audio.play();
                    $('.notify-msg').addClass('notifyactive');
                }
                $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
            });
            mySession.connect(response.token, "agent")
                .then(() => {
                    let publisher = OV.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: true,
                        publishVideo: true,
                        // resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    });
                    sessionStorage.setItem("publisher", Object.keys(publisher));
                    mySession.publish(publisher);
                    $this.setState({
                        mainStreamManager: publisher,
                        publisher: publisher,
                    });
                    dispatch({
                        type: actionTypes.CHAT_PUBLISHER,
                        payload: publisher
                    });
                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error.code, error.message);
                });
            dispatch({
                type: actionTypes.CHAT_TOKEN,
                payload: response.token
            });
        }).catch((error) => {
            console.log(error);
        })
    }
}

export const chatCreateToken2 = (sessionId, $this, OV) => {
    return (dispatch) => {
        // var data = JSON.stringify({ session: sessionId });
        var data = {
            session: sessionId
        };
        let body = {
            "data": aesEncrypt(data)
        }
        instance.post('/tokens', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            const mySession = $this.state.session;
            var response = JSON.parse(aesDecrypt(resp.data.data));
            sessionStorage.setItem("session", response.session)
            let OV2 = new OpenVidu();
            let mySession2 = OV2.initSession();
            // mySession.on('signal', (event) => {
            //     dispatch({
            //         type: actionTypes.CHATMESSAGES,
            //         payload: event
            //     });
            //     const val = sessionStorage.getItem('connectionId');
            //     if (event.from.connectionId === val) {
            //         var audio = new Audio('../images/audio/tone.mp3');
            //         audio.play();
            //         $('.notify-msg').addClass('notifyactive');
            //     }
            //     $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
            // });
            mySession2.connect(response.token, "screen")
                .then(() => {
                    let publisher2 = OV2.initPublisher(undefined, {
                        audioSource: undefined,
                        videoSource: 'screen',
                        publishAudio: true,
                        publishVideo: true,
                        // resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    });
                    // sessionStorage.setItem("publisher", Object.keys(publisher));
                    mySession2.publish(publisher2);
                    $this.setState({
                        session2: mySession2
                    });
                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error.code, error.message);
                });
            dispatch({
                type: actionTypes.CHAT_TOKEN,
                payload: response.token
            })
        }).catch((error) => {
            console.log(error);
        })
    }
}



export const RecordingStart = (sessionId) => {
    return (dispatch) => {
        var data = JSON.stringify({
            session: sessionId
        });
        instance.post('/api/recordings/start', data, {
            headers: {
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            sessionStorage.setItem("recordingId", response.data.id);
        }).catch((error) => {
            console.log(error);
        })
    }
}



export const RecordingStop = () => {
    return (dispatch) => {
        const id = sessionStorage.getItem("recordingId");
        instance.post('/api/recordings/stop' + id, {
            headers: {
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        }).then((response) => {
        }).catch((error) => {
            console.log(error);
        })
    }
}