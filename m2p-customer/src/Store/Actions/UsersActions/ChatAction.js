import * as actionTypes from '../types';
import Axios from 'axios';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';
const $ = window.$;

const OPENVIDU_SERVER_URL = process.env.REACT_APP_VIDEO_API;
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
    baseURL: OPENVIDU_SERVER_URL,
});

export const chatCreateSession = (sessionId, $this, OV) => {
    return (dispatch) => {
        const data = {
            // "mediaMode": "ROUTED",
            "recordingMode": "ALWAYS",
            // "recordingMode": "MANUAL",
            "customSessionId": sessionId,
            // "defaultOutputMode": "OUTPUT_MODE",
            "defaultRecordingLayout": "CUSTOM",
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
            // console.log("************************",resp);

            console.log('CREATE SESION', aesDecrypt(resp.data.data));
            var response = aesDecrypt(resp.data.data);
            dispatch({
                type: actionTypes.CHAT_SESSION_ID,
                payload: response.id
            });
            dispatch(chatCreateToken(sessionId, $this, OV));
        }).catch((err) => {

            var error = Object.assign({}, aesDecrypt(err.data.data));
            if (error.response && error.response.status === 409) {
                dispatch({
                    type: actionTypes.CHAT_SESSION_ID,
                    payload: sessionId
                });
                dispatch(chatCreateToken(sessionId, $this, OV));
            } else {
                console.warn(
                    'No connection to OpenVidu Server. This may be a certificate error at ' + this.OPENVIDU_SERVER_URL,
                );
                if (
                    window.confirm(
                        'No connection to OpenVidu Server. This may be a certificate error at "' +
                        this.OPENVIDU_SERVER_URL +
                        '"\n\nClick OK to navigate and accept it. ' +
                        'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                        this.OPENVIDU_SERVER_URL +
                        '"',
                    )
                ) {
                    window.location.assign(this.OPENVIDU_SERVER_URL + '/accept-certificate');
                }
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
            mySession.on('signal', (event) => {
                $this.setState({
                    msgArr: $this.state.msgArr.concat(event)
                });
                const val = sessionStorage.getItem('connectionId');
                if (event.from.connectionId === val) {
                    var audio = new Audio('../../assets/images/audio/tone.mp3');
                    audio.play();
                    $('.notify-msg').addClass('notifyactive');
                }
                $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
            });
            // OV.getDevices().then(devices => {
            //     console.log(devices)

            //     // Getting only the video devices
            //     const videoDevices = devices.filter(device => device.kind === 'videoinput');
            //     console.log(videoDevices, videoDevices.length, 'asd')                
            //     if (videoDevices && videoDevices.length > 1){
        
            //         // Creating a new publisher with specific videoSource
            //         // In mobile devices the default and first camera is the front one
            //         const newPublisher = OV.initPublisher('html-element-id', {
            //             insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            //             videoSource: this.isFrontCamera ? videoDevices[1].deviceId : videoDevices[0].deviceId,
            //             publishAudio: true,
            //             publishVideo: true,
            //             resolution: '640x480', // The resolution of your video
            //             frameRate: 30, // The frame rate of your video
            //             mirror: !this.isFrontCamera, // Setting mirror enable if front camera is selected
            //         });
            //         // Changing isFrontCamera value
            //         this.isFrontCamera = !this.isFrontCamera;
            //         this.user = 'publisher';
        
            //         // Unpublishing the old publisher
            //         this.session.unpublish(this.publisher);
        
            //         // Assigning the new publisher to our global variable 'publisher'
            //         this.publisher = newPublisher;
            //         console.log(newPublisher);
        
            //         // Publishing the new publisher
            //         this.session.publish(this.publisher);
            //     }
            // });
            mySession.connect(response.token, { clientData: $this.state.myUserName })
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
