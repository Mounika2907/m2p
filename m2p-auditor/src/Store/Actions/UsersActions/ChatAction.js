import * as actionTypes from '../types';
import Axios from 'axios';
// import https from 'https';
const $ = window.$;

// const OPENVIDU_SERVER_URL = 'https://demos.openvidu.io:4443';
const OPENVIDU_SERVER_URL = 'https://getkyc.syntizen.com:4444';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


// At instance level
const instance = Axios.create({
    baseURL: OPENVIDU_SERVER_URL
});

export const chatCreateSession = (sessionId) => {
    return (dispatch) => {
        const data = {
            // "mediaMode": "ROUTED",
            "recordingMode": "ALWAYS",
            "customSessionId": sessionId,
            // "defaultOutputMode": "OUTPUT_MODE",
            "defaultRecordingLayout": "BEST_FIT",
            // "defaultCustomLayout": "CUSTOM_LAYOUT"
        }
        instance.post('/api/sessions', data, {
            headers: {
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            // console.log('CREATE SESION', response);
            dispatch({
                type: actionTypes.CHAT_SESSION_ID,
                payload: response.data.id
            })
        }).catch((response) => {
            var error = Object.assign({}, response);
            if (error.response && error.response.status === 409) {
                // resolve(sessionId);
                dispatch({
                    type: actionTypes.CHAT_SESSION_ID,
                    payload: sessionId
                })
            } else {
                console.log(error);
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
        var data = JSON.stringify({ session: sessionId });
        instance.post('/api/tokens', data, {
            headers: {
                Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            const mySession = $this.state.session;
            sessionStorage.setItem("session", response.data.session)
            mySession.on('signal', (event) => {
                dispatch({
                    type: actionTypes.CHATMESSAGES,
                    payload: event
                });
                $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
            });
            mySession.connect(response.data.token, { clientData: $this.state.myUserName })
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
                payload: response.data.token
            })
        }).catch((error) => {
            console.log(error);
        })
    }
}