import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';
import { connect } from 'react-redux';
import { chatCreateSession, chatCreateToken } from '../../Store/Actions/UsersActions/ChatAction';
import Aux from '../../hoc/Aux';
import { CaptureAction } from '../../Store/Actions/CaptureAction';
import { GetQuestionsAction, SubmitQuestionsAction, GetSingleQuestion } from '../../Store/Actions/DetailsAction';


class ChatApp extends Component {
    state = {
        mySessionId: 'syz',
        // myUserName: 'Participant' + Math.floor(Math.random() * 100),
        myUserName: '',
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        qtnBnt: true,
        videoEnabled: false,
        audioEnabled: false
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    getCameraMode = () => {
        var video = document.getElementById("video");

        // TO GET CAMERA CAMEARA ACCESS FROM THE BROWSER
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stram) {
                video.srcObject = stram;
                video.play();
            });
        }
        else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia({ video: true }, function (stream) {
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, null);
        } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
            navigator.mozGetUserMedia({ video: true }, function (stream) {
                video.srcObject = stream;
                video.play();
            }, null);
        }
    }

    capture = () => {
        var video = document.getElementById("live-vd");
        this.props.CaptureAction(video);
    }

    // cameraCapture = () => {
    //     var canvas = document.getElementById("canvas");
    //     var context = canvas.getContext('2d');
    //     var btn = document.getElementById("capture");
    //     context.drawImage(video, 0, 0, 400, 400);
    // }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload = (event) => {
        this.leaveSession();
    }

    handleChangeSessionId = (e) => {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName = (e) => {
        this.setState({
            myUserName: e.target.value,
        });
    }

    // handleMainVideoStream = (stream) => {
    //     if (this.state.mainStreamManager !== stream) {
    //         this.setState({
    //             mainStreamManager: stream
    //         });
    //     }
    // }

    deleteSubscriber = (streamManager) => {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession = () => {
        this.OV = new OpenVidu();
        this.setState({
            session: this.OV.initSession(),
        }, () => {
            sessionStorage.setItem("mySession", this.state.session)
            var mySession = this.state.session;
            mySession.on('streamCreated', (event) => {
                var subscriber = mySession.subscribe(event.stream, undefined);
                sessionStorage.setItem("connectionId", event.stream.connection.connectionId);
                var subscribers = this.state.subscribers;
                subscribers.push(subscriber);
                sessionStorage.setItem("subscribers", Object.keys(subscribers))
                this.setState({
                    subscribers: subscribers,
                });
            });
            mySession.on('streamDestroyed', (event) => {
                this.deleteSubscriber(event.stream.streamManager);
            });

            const $this = this;
            this.props.chatCreateSession("syz")
            this.props.chatCreateToken("syz", $this, this.OV)
            this.props.GetQuestionsAction();
        },
        );
    }

    leaveSession = () => {
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'syz',
            myUserName: '' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    // SUBMIT QUESTION
    submitQuestion = () => {
        let id1 = sessionStorage.getItem("qtnId");
        if (id1 <= 5) {
            this.props.SubmitQuestionsAction(id1.toString());
            id1++;
            sessionStorage.setItem("qtnId", id1);
            this.props.GetSingleQuestion(id1.toString());
            // this.props.GetQuestionsAction();
        }
    }

    muteAudio = () => {
        this.setState({
            audioEnabled: !this.state.audioEnabled
        });
        // console.log(this.state.audioEnabled);
        this.state.publisher.publishAudio(this.state.audioEnabled);
    }

    muteVideo = () => {
        this.setState({
            videoEnabled: !this.state.videoEnabled
        });
        this.state.publisher.publishVideo(this.state.videoEnabled);
    }

    startQuestion = () => {
        this.props.GetSingleQuestion("1");
        sessionStorage.setItem("qtnId", 1);
        this.setState({
            qtnBnt: false
        });
    }

    render() {
        const myUserName = this.state.myUserName;
        return (
            <Aux>
                {this.state.session === undefined ? (<div className="">
                    <div className="">
                        <form className="custom-form sr1" onSubmit={this.joinSession}>
                            <div className="form-group position-relative">
                                <label className="custom-label" htmlFor="">V-CIP Number</label>
                                <input
                                    type="text"
                                    className="form-control custom-inp"
                                    id="userName"
                                    value={myUserName}
                                    onChange={(e) => this.handleChangeUserName(e)}
                                    required
                                    placeholder="V-CIP Number"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="custom-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>) : (null)}


                {this.state.session !== undefined ? (<div className="live-video sr1">
                    <h2 className="live-title">
                        CUSTOMER
                    </h2>
                    <div className="customer-video" style={{ height: "auto" }}>
                        <div className="customer-video-box">
                            {this.state.subscribers.map((sub, i) => (
                                <UserVideoComponent streamManager={sub} />
                            ))}
                            <div className="qtn-display">
                                <p className="qtn-display-p">
                                    {this.props.InfoRdr.singleQuestion[0]?.quesid} . {this.props.InfoRdr.singleQuestion[0]?.ques}
                                </p>
                            </div>
                        </div>

                        <div className="w-100 text-center row m-0">
                            <button className="custom-btn col-md mb-1 mr-2" onClick={this.startQuestion}>
                                Start <br /> Question
                            </button>
                            <button className="custom-btn col-md mb-1" disabled={this.state.qtnBnt} onClick={this.submitQuestion}>
                                Next  <br /> Question
                            </button>
                        </div>
                    </div>
                    <div className="customer-video live-banker" style={{ height: "auto" }}>
                        {this.state.publisher !== undefined ? (
                            <UserVideoComponent
                                streamManager={this.state.publisher} />
                        ) : null}
                        <div className="w-100 text-center">
                            <button className="custom-btn bg-dark mr-2" style={{ width: "auto" }} onClick={this.muteVideo}>
                                {this.state.videoEnabled ?
                                    <i class="fas fa-video-slash"></i> :
                                    <i class="fas fa-video"></i>
                                }
                            </button>

                            <button className="custom-btn bg-dark mr-2" style={{ width: "auto" }} onClick={this.muteAudio}>
                                {this.state.audioEnabled ?
                                    <i class="fas fa-microphone-slash"></i> :
                                    <i class="fas fa-microphone-alt"></i>
                                }
                            </button>

                            <button className="custom-btn bg-dark mr-2" style={{ width: "auto" }} onClick={this.capture}>
                                <i className="fas fa-camera"></i>
                            </button>

                            <button className="custom-btn bg-danger" style={{ width: "auto" }} onClick={this.leaveSession}>
                                <i className="fas fa-phone" style={{ transform: "rotate(-135deg)" }}></i>
                            </button>
                        </div>
                    </div>
                    <div className="questions">
                        <ul className="nav qtn-nav">
                            <li className="qtn-item">
                                <div className="dropdown">
                                    <button className="qtn-btn qtn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Q</button>
                                    <div className="dropdown-menu qtn-dropdown dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <h3 className="qtn-title">Questions</h3>
                                        <ol className="qtn-list" type={1}>
                                            {this.props.InfoRdr.questions?.map((qtn, i) => <li key={i}>{qtn.ques}</li>)}
                                        </ol>
                                    </div>
                                </div>
                            </li>
                            {this.props.InfoRdr.questions?.map((qtn, i) => <li className="qtn-item" key={i}>
                                <button className={`qtn-btn ${qtn.status === '0' ? '' : 'active'}`}>
                                    {qtn.status === "0" ? qtn.quesid : <i className="fas fa-check" />}
                                </button>
                            </li>)
                            }
                        </ul>
                    </div>
                </div>) : (null)}
            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    const { ChatReducer, InfoRdr } = state;
    return { ChatReducer, InfoRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chatCreateSession: (sessionId) => dispatch(chatCreateSession(sessionId)),
        chatCreateToken: (sessionId, $this, OV) => dispatch(chatCreateToken(sessionId, $this, OV)),
        CaptureAction: (mode) => dispatch(CaptureAction(mode)),
        GetQuestionsAction: () => dispatch(GetQuestionsAction()),
        SubmitQuestionsAction: (id) => dispatch(SubmitQuestionsAction(id)),
        GetSingleQuestion: (id) => dispatch(GetSingleQuestion(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
