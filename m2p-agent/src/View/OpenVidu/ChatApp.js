import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';
import { connect } from 'react-redux';
import { chatCreateSession, chatCreateToken, RecordingStop } from '../../Store/Actions/UsersActions/ChatAction';
import Aux from '../../hoc/Aux';
import { CaptureAction, GetCaptureImageAction } from '../../Store/Actions/CaptureAction';
import {
    GetQuestionsAction,
    SubmitQuestionsAction, GetSingleQuestion,
    FinishAction, JoinVideoAction,
    EndVideoAction,
    PushNotificationAction,
    GetNotificationAction
} from '../../Store/Actions/DetailsAction';
import { ResetRdrAction, ResetRdrPicAction } from '../../Store/Actions/Login';
import { toast } from 'react-toastify';
import { SendScreenVideo } from '../../Store/Actions/UsersActions/videostore';
const $ = window.$;

class ChatApp extends Component {
    state = {
        mySessionId: 'syz',
        // myUserName: 'Participant' + Math.floor(Math.random() * 100),
        myUserName: '',
        session: undefined,
        session2: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        qtnBnt: true,
        startBtn: true,
        qtnBtnName: "Next",
        videoEnabled: false,
        audioEnabled: false,
        vcipstatus: '',
        remarks: '',
        remarksBy: '',
        btnQtnStatus: false,
        recordStop: undefined,
        intervalId1: undefined,
        storeLoader: false,
        streamCount: 0,
        intervalVideoTime: undefined,
        minutesLabel: 0,
        secondsLabel: 0,
        totalSeconds: 0,
        imageImg: undefined,

    };

    componentDidMount() {
        // $('#startrecord').modal('show');
        // this.props.startRecording();
        // $('.btn_record_start').click();
        // $('#btn_record_start').click();
        // window.addEventListener('beforeunload', this.onbeforeunload);

        this.joinSession();
        let intervalId1 = setInterval(() => {
            const endCall = this.props.CaptureRdr.endVideoCallByCustomer;
            if (endCall === "3") {
                this.leaveByCustomerSession();
                clearInterval(this.state.intervalId1);
            }
            this.props.GetNotificationAction();

        }, 2000);
        this.setState({ intervalId1: intervalId1 });

        this.intervalVideoTime = setInterval(() => this.startVideoTime(),
            2000);

    }

    componentWillUnmount() {
        // window.removeEventListener('beforeunload', this.onbeforeunload);
        this.leaveCallWithoutEndSession();
        clearInterval(this.state.intervalId1);
        clearInterval(this.intervalVideoTime);
    }


    startVideoTime = () => {
        ++this.state.totalSeconds;
        this.setState({
            secondsLabel: this.pad(this.state.totalSeconds % 60),
            minutesLabel: this.pad(parseInt(this.state.totalSeconds / 60))
        })
        // secondsLabel.innerHTML = pad(totalSeconds % 60);
        // minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    pad = (val) => {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
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

    capturePhoto = () => {
        // // var video = document.getElementById("live-vd").getElementsByClassName("customer-video-box");

        // // const canvas = document.getElementById("canvas");
        // // const context = canvas.getContext('2d');
        // // context.drawImage(this.props.CaptureRdr?.mode, 0, 0, 1280, 720);
        var video = document.querySelector(".video-image-capture #live-vd");
        const canvas = document.getElementById("canvas");
        // var image = new Image(video.videoWidth, video.videoHeight);
        // image.src = canvas.toDataURL("image/png");
        // var image1 = image.src.split(',')[1];
        // console.log(image1, 'fsec')
        // canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        // let images = canvas.toDataURL("image/png");
        // console.log(images, 'first')
        // console.log(video.videoWidth, video.videoHeight);
        setTimeout(() => {

            this.imageCapture();
            this.imageCapture();
        }, 1000);
    }

    imageCapture = () => {
        var video = document.querySelector(".video-image-capture #live-vd");
        const canvas = document.getElementById("canvas");

        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        let image_data_url = canvas.toDataURL('image/png');
        var image1 = image_data_url.split(',')[1];
        // data url of the image

        const model = {
            mode: video,
            img: image1,
            widht: video.videoWidth,
            height: video.videoHeight
        }
        this.props.CaptureAction(model);
        this.props.GetCaptureImageAction(image1)

    }

    // cameraCapture = () => {
    //     var canvas = document.getElementById("canvas");
    //     var context = canvas.getContext('2d');
    //     var btn = document.getElementById("capture");
    //     context.drawImage(video, 0, 0, 400, 400);
    // }


    // onbeforeunload = (event) => {
    //     this.leaveSession();
    // }

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
        const $this = this.props.push;
        // this.props.JoinVideoAction($this);
        this.setState({
            session: this.OV.initSession(),
        }, () => {
            sessionStorage.setItem("mySession", this.state.session);
            var mySession = this.state.session;
            mySession.on('streamCreated', (event) => {
                var subscriber = mySession.subscribe(event.stream, undefined);
                // console.log("==================",event.stream.connection.connectionId);
                if (event.stream.typeOfVideo !== "SCREEN") {
                    sessionStorage.setItem("connectionId", event.stream.connection.connectionId);
                }
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
            const name = sessionStorage.getItem("videoconfsessionid");
            this.props.chatCreateSession(name, $this, this.OV)
            // this.props.chatCreateToken(name, $this, this.OV)
            this.props.GetQuestionsAction();
        });
    }

    // END CALL WITHOUT CLICKING END BUTTON
    leaveCallWithoutEndSession = () => {
        const mySession = this.state.session;
        // const mySession2 = this.state.session2;
        if (mySession) {
            mySession.disconnect();
            // mySession2.disconnect();
            // toast.error("Customer Disconnected");
        }
        // this.props.RecordingStop();
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
        // this.props.ResetRdrAction();
        // this.props.EndVideoAction();
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
    }

    // END VIDEO CALL
    leaveSession = () => {
        clearInterval(this.state.intervalId1);
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
            // toast.error("Customer Disconnected");
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
        this.props.ResetRdrAction();
        this.props.EndVideoAction();
        const model = {
            id: "2",
            msg: "Call End"
        }
        this.props.PushNotificationAction(model);
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        $('#endCallModal').modal('hide');
        // this.finishCheck();
    }


    // END VIDEO CALL
    leaveByCustomerSession = () => {
        clearInterval(this.state.intervalId1);
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
            // toast.error("Customer Disconnected");
        }
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
        this.props.EndVideoAction();
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        // $('#endCallModalByAgent').modal('show');
        // setTimeout(() => {
        //     $('#endCallModalByAgent').modal('hide');
        // }, 3000);
        // this.finishCheck();
    }


    endVideoCall = () => {
        $('#endCallModal').modal('show');
    }

    // DISPLAY FIRST QUESTION
    startQuestion = () => {
        this.props.GetSingleQuestion("1");
        sessionStorage.setItem("qtnId", 1);
        const model = {
            id: "1",
            msg: "1"
        }
        this.props.PushNotificationAction(model);
        this.setState({
            qtnBnt: false,
            startBtn: false,
            btnQtnStatus: true
        });
    }

    // PREVIOUS QUESTION DISPLAY
    previousQtn = () => {
        let id1 = sessionStorage.getItem("qtnId");
        if (id1 >= 2) {
            this.setState({
                qtnBnt: false,
                btnQtnStatus: true
            });
            --id1;
            sessionStorage.setItem("qtnId", id1);
            this.props.GetSingleQuestion(id1.toString());
            const model = {
                id: "1",
                msg: id1.toString()
            }
            this.props.PushNotificationAction(model);
        } else {
            toast.error("No Question available")
        }
    }

    // SUBMIT QUESTION
    submitQuestion = () => {
        this.setState({
            btnQtnStatus: true
        });
        let id1 = sessionStorage.getItem("qtnId");
        let count = parseInt(this.props.InfoRdr.info?.totalquestions);
        if (id1 <= count) {
            id1++;
            sessionStorage.setItem("qtnId", id1);
            this.props.GetSingleQuestion(id1.toString());
            const model = {
                id: "1",
                msg: id1.toString()
            }
            this.props.PushNotificationAction(model);
        } else {
            this.setState({
                qtnBnt: true,
                qtnBtnName: "End"
            });
        }
    }

    // ACCEPT QUESTION
    acceptQuestion = (val) => {
        const status = "1";
        const time = this.state.minutesLabel + ":" + this.state.secondsLabel;
        this.props.SubmitQuestionsAction(val, status, time);
        this.setState({
            btnQtnStatus: false
        });
        // try {
        //     // const video = document.querySelector(".video-image-capture #live-vd");
        //     const canvas = document.getElementById("canvas");

        //     var image = new Image();
        // } catch (error) {
        //     console.log(error, 'asdfkj')
        // }

    }

    // REJECT QUESTION
    rejectQuestion = (val) => {
        const status = "-1";
        const time = this.state.minutesLabel + ":" + this.state.secondsLabel;
        this.props.SubmitQuestionsAction(val, status, time);
        this.setState({
            btnQtnStatus: false
        });
    }


    // MUTE AUDIO
    muteAudio = () => {
        this.setState({
            audioEnabled: !this.state.audioEnabled
        });
        this.state.publisher.publishAudio(this.state.audioEnabled);
    }

    // MUTE VIDEO
    muteVideo = () => {
        this.setState({
            videoEnabled: !this.state.videoEnabled
        });
        this.state.publisher.publishVideo(this.state.videoEnabled);
    }


    // FOR FINISH INPUT HANDLE
    handleFinish = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // CHECK WHETHER THE AGENT CAPTURE IMAGES OR NOT 
    finishCheck = () => {
        $('#finish').modal('show');
    }

    // FINISH
    finish = () => {
        if (this.state.vcipstatus || this.state.remarks) {
            if (this.state.vcipstatus === '2') {
                const model = {
                    vcipstatus: this.state.vcipstatus,
                    remarks: this.state.remarksBy,
                };
                const $this = this;
                this.props.FinishAction(model, $this);
            } else {
                if (this.state.remarks === '7') {
                    if (this.state.remarksBy) {
                        const model = {
                            vcipstatus: this.state.vcipstatus,
                            remarks: this.state.remarksBy
                        };
                        const $this = this;
                        this.props.FinishAction(model, $this);
                    } else {
                        toast.error("Please type remarks");
                    }
                } else {
                    if (this.state.remarks) {
                        const model = {
                            vcipstatus: this.state.vcipstatus,
                            remarks: this.state.remarks
                        };
                        const $this = this;
                        this.props.FinishAction(model, $this);
                    } else {
                        toast.error("Please select reason");
                    }
                }
            }
            // this.leaveSession();
        } else {
            toast.error("Please Enter fields");
        }
    }

    storeVideo = async () => {
        this.props.ResetRdrPicAction();
        const mySession2 = this.state.session2;
        mySession2.disconnect();
        // this.props.RecordingStop();
        this.props.push.push("/vciplist");
    }

    render() {
        const { vcipstatus, remarks } = this.state;
        return (
            <Aux>
                <div className="row m-0">
                    <div className="col-md pr-0">
                        <div className={`live-video sr1 vheight1 bdr-left bdr-bottom  ${this.state.session !== undefined ? '' : ' btn-center'}`}>
                            {this.state.session !== undefined ? (<div className="customer-video">
                                <h2 className="live-title">
                                    BANKER
                                    {/* {this.state.minutesLabel + ":" + this.state.secondsLabel} */}
                                </h2>
                                <div className="customer-video-box">
                                    {this.state.publisher !== undefined ? (
                                        <UserVideoComponent
                                            streamManager={this.state.publisher} />
                                    ) : null}
                                </div>
                                <div className="w-100 text-center box-gap">
                                    <button className="custom-btn video-btn" onClick={this.muteVideo}>
                                        {this.state.videoEnabled ?
                                            <i className="fas fa-video-slash"></i> :
                                            <i className="fas fa-video"></i>
                                        }
                                    </button>

                                    <button className="custom-btn video-btn" onClick={this.muteAudio}>
                                        {this.state.audioEnabled ?
                                            <i className="fas fa-microphone-slash"></i> :
                                            <i className="fas fa-microphone-alt"></i>
                                        }
                                    </button>

                                    <button className="custom-btn video-btn bg-danger" onClick={this.endVideoCall}>
                                        <i className="fas fa-phone" style={{ transform: "rotate(-135deg)" }}></i>
                                    </button>
                                </div>

                            </div>) : (null)}
                            <div className={`customer-video   ${this.state.session !== undefined ? '' : ' btn-center'}`}>
                                <div className="w-100 text-center box-gap">
                                    <button type="button" disabled={this.state.session !== undefined} className="custom-btn mt-1 mb-0" onClick={this.finishCheck}>
                                        Finish
                                    </button>
                                </div>
                                {/* <hr className="custom-hr" /> */}
                            </div>
                        </div>
                    </div>
                    {this.state.session !== undefined ? (<div className="col-md pr-0">
                        <div className="live-video sr1 vheight1 bdr-left bdr-bottom">
                            <div className="customer-video">
                                <h2 className="live-title">
                                    CUSTOMER
                                </h2>
                                <div className="customer-video-box video-image-capture">
                                    {this.state.subscribers.map((sub, i) => {
                                        if (sub.stream.typeOfVideo !== "SCREEN") {
                                            return <Aux key={i}>
                                                <UserVideoComponent streamManager={sub} />
                                            </Aux>
                                        }
                                    })}
                                    {this.props.InfoRdr.singleQuestion[0]?.sno ? (
                                        <div className="qtn-display">
                                            <p className="qtn-display-p">
                                                {this.props.InfoRdr.singleQuestion[0]?.sno} . {this.props.InfoRdr.singleQuestion[0]?.ques}
                                                {this.state.btnQtnStatus ? (<Aux>
                                                    <button onClick={() => this.rejectQuestion(this.props.InfoRdr.singleQuestion[0]?.quesid)} style={{ width: "30px", height: "30px" }} className="btn btn-sm btn-danger rounded-circle ml-1">
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                    <button onClick={() => this.acceptQuestion(this.props.InfoRdr.singleQuestion[0]?.quesid)} style={{ width: "30px", height: "30px" }} className="btn btn-sm btn-success rounded-circle ml-1">
                                                        <i className="fas fa-check" />
                                                    </button></Aux>) : (null)}
                                            </p>
                                        </div>) : (null)}
                                </div>

                                {/* <div className="w-100 text-center mt-2">
                                    <button className="custom-btn video-btn" onClick={this.capture}>
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div> */}

                                <div className="row box-gap justify-content-center align-items-center">
                                    {this.state.startBtn ? (<button className="custom-btn mb-1 mt-1 mr-2" style={{ backgroundColor: "#434343" }} onClick={this.startQuestion}>
                                        Start <br /> Question
                                    </button>) : (<button className="custom-btn mb-1 mr-2 mt-2" style={{ backgroundColor: "#434343" }} onClick={this.previousQtn}>
                                        Previous <br /> Question
                                    </button>)}
                                    {this.state.qtnBnt ? (<button className="custom-btn mb-1 mt-1 disabled">
                                        {this.state.qtnBtnName}   <br /> Question
                                    </button>) : (<button className="custom-btn mb-1 mt-2" onClick={this.submitQuestion}>
                                        Next  <br /> Question
                                    </button>
                                    )}
                                    <button id="clickme" className="custom-btn video-btn mt-1 my-0 bg-secondary" onClick={this.capturePhoto}>
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>

                                <div className="questions mt-1 box-gap">
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
                                            <button className={`qtn-btn 
                                            ${qtn.status === '0' ? '' : qtn.status === '-1' ? 'reject' : 'active'} 
                                            ${parseInt(this.props.InfoRdr.info?.totalquestions) > 10 ? 'btn-qtn-size' : ''}`}>
                                                {qtn.status === "0" ? qtn.sno : qtn.status === "-1"
                                                    ? <i className="fas fa-times"></i>
                                                    : <i className="fas fa-check" />}
                                            </button>
                                        </li>
                                        )}
                                        {/* <li className="qtn-item">
                                            <button className="custom-btn video-btn my-0" onClick={this.capture}>
                                                <i className="fas fa-camera"></i>
                                            </button>
                                        </li> */}
                                    </ul>

                                </div>
                                {/* <hr className="custom-hr" /> */}
                            </div>
                        </div>
                    </div>) : (null)}
                </div>

                <div>
                    {/* <button type="button" className="custom-btn" onClick={this.finishCheck}>Finish</button> */}


                    <div className="modal fade" id="finish" tabIndex={-1} role="dialog" aria-labelledby="finishLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-center" id="finishLabel">Summary Report</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-info">V-CIP ID: {this.props.InfoRdr.info.vcipid}</th>
                                                <th scope="col" className="text-primary" colSpan="2">Result</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="banker-name">
                                                        Geo Location
                                                        <span className="text-danger ml-2">Lat: </span> <span>{parseFloat(this.props.InfoRdr.info.custloc?.split(",")[0]).toFixed(4)}</span>
                                                        | <span className="text-danger">Long: </span> <span>{parseFloat(this.props.InfoRdr.info.custloc?.split(",")[1]).toFixed(4)}</span>
                                                    </p>
                                                </td>
                                                <td>99%</td>
                                                {/* <td>
                                                    <div className="">
                                                        <input type="checkbox" className="switch" readOnly checked={this.props.InfoRdr.info.custloc?.split(",")[0]} />
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td>
                                                    Face match score between Aadhaar photo and PAN photo:
                                                </td>
                                                <td className="text-primary">
                                                    {this.props.CaptureRdr.facematch ? parseFloat(this.props.CaptureRdr.facematch).toFixed(2) + "%" : "Pending"}
                                                </td>
                                                {/* <td>
                                                    <div className="">
                                                        <input type="checkbox" className="switch" readOnly checked={this.props.CaptureRdr.facematch} />
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td>
                                                    Face Match Score between Aadhaar photo and Live Photo:
                                                </td>
                                                <td className="text-primary">
                                                    {this.props.CaptureRdr.facematchAadhaar ? parseFloat(this.props.CaptureRdr.facematchAadhaar).toFixed(2) + "%" : "Pending"}
                                                </td>
                                                {/* <td>
                                                    <div className="">
                                                        <input type="checkbox" className="switch" readOnly checked={this.props.CaptureRdr.facematchAadhaar} />
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td>
                                                    Face Match Score between PAN Card photo and Live Photo:
                                                </td>
                                                <td className="text-primary">
                                                    {this.props.CaptureRdr.facematchPan ? parseFloat(this.props.CaptureRdr.facematchPan).toFixed(2) + "%" : "Pending"}
                                                </td>
                                                {/* <td>
                                                    <div className="">
                                                        <input type="checkbox" className="switch" readOnly checked={this.props.CaptureRdr.facematchPan} />
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td>
                                                    Liveness confidence Score:
                                                </td>
                                                <td className="text-primary">
                                                    {this.props.CaptureRdr.livecheck ? parseFloat(this.props.CaptureRdr.livecheck).toFixed(2) + "%" : "Pending"}
                                                </td>
                                                {/* <td>
                                                    <div className="">
                                                        <input type="checkbox" className="switch" readOnly checked={this.props.CaptureRdr.livecheck} />
                                                    </div>
                                                </td> */}
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    Question and answers session:
                                                    <ol className="qtn-list" type={1}>
                                                        {this.props.InfoRdr.questions?.map((qtn, i) => <li key={i}>
                                                            {qtn.ques}
                                                            {qtn.status === "0" ? <i className="far fa-times-circle text-danger ml-2"></i> : <i className="far fa-check-circle text-success ml-2" />}
                                                        </li>)}
                                                    </ol>
                                                </td>
                                                {/* <td>99%</td> */}
                                                {/* <td>
                                                    <div className="">
                                                        <input type="checkbox" className="switch" readOnly checked={this.props.CaptureRdr.livecheck} />
                                                    </div>
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>


                                    <form>
                                        <div className="form-group">
                                            <label>Select VCIP Status</label>
                                            <select className="form-control" defaultValue={'DEFAULT'} name="vcipstatus" required onChange={this.handleFinish}>
                                                <option value="DEFAULT" disabled>Please Select Option</option>
                                                <option value="2">V-KYC Completed/Success</option>
                                                <option value="3">V-Kyc Failed</option>
                                                <option value="-2">Incorrect Details Submitted</option>
                                                <option value="-3">Call Disconnected</option>
                                            </select>
                                        </div>
                                        {(vcipstatus === '3' || vcipstatus === '-2' || vcipstatus === '-3') ?
                                            <div className="form-group">
                                                <label>Select Reason:</label>
                                                <select className="form-control" defaultValue={'DEFAULT'} name="remarks" required onChange={this.handleFinish}>
                                                    <option value="DEFAULT" disabled>Please Select Option</option>
                                                    <option>Wrong person on the Video call. </option>
                                                    <option>Wrong PAN card submitted.</option>
                                                    <option>PAN details do not match with NSDL details. </option>
                                                    <option>Customer’s answers did not match with the details. </option>
                                                    <option>Wrong Aadhaar details. </option>
                                                    <option> System suggested status for Face match and Liveness check is Unsuccessful.</option>
                                                    <option>Call Dropped.</option>
                                                    <option value="7">Reason not in the list.</option>
                                                </select>
                                            </div> : (null)}
                                        {vcipstatus === '2' || remarks === '7' ?
                                            <div className="form-group">
                                                <label htmlFor="message-text" className="col-form-label">Remarks:</label>
                                                <textarea className="form-control" name="remarksBy" onChange={this.handleFinish} required />
                                            </div> : (null)}

                                        <button type="button" onClick={this.finish} className="custom-btn">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade custom-modal" id="success" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                {/* <div className="modal-header border-0">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div> */}
                                <div className="modal-body">
                                    <div className="modal-data">
                                        <img src="../images/success.svg" alt="no img" />
                                        <h1 className="modal-data-title">V-CIP ID verification successfull</h1>
                                        <div>
                                            <svg width="40px" height="40px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                                <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                                <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                    <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                                </circle>
                                            </svg>
                                        </div>

                                        {/* <div className="pb-3 text-center">
                                            <button className="btn custom-btn mt-3" onClick={this.storeVideo}>
                                                Go To Home {this.state.storeLoader ? <span className="spinner"></span> : null}
                                            </button>
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="endCallModal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "40%" }} role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="instructions pt-4 border-right-0">
                                        <h6 className="instructions-title text-center">
                                            {/* It looks like all the steps of V-CIP process are not completed for this V-CIP ID.
                                            <br /> */}
                                            Are you sure you want to disconnect the Video Call?
                                        </h6>

                                        <div className="pb-3 text-center">
                                            <button type="button" className="btn custom-btn btn-secondary mr-2" data-dismiss="modal">No</button>
                                            <button type="button" onClick={this.leaveSession} className="btn custom-btn">Yes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="endCallModalByAgent" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "auto" }} role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="instructions pt-4 border-right-0">
                                        <h6 className="instructions-title text-center">
                                            Customer has disconnected the Video Call.
                                        </h6>

                                        {/* <div className="pb-3 text-center">
                                        <button type="button" className="btn custom-btn btn-secondary mr-2" data-dismiss="modal">No</button>
                                        <button type="button" onClick={this.leaveSession} className="btn custom-btn">Yes</button>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="modal fade" id="startrecord" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "25%" }} role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="instructions pt-4 border-right-0">
                                        <h6 className="instructions-title text-center">
                                            Screen Record
                                        </h6>

                                        <div className="pb-3 text-center">
                                            <button className="btn_record_start custom-btn" data-dismiss="modal" onClick={this.props.startRecording}>
                                                <span className="text-white mr-2">
                                                    <i className="fas fa-desktop"></i>
                                                </span>
                                                Start
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>


            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    const { ChatReducer, InfoRdr, CaptureRdr } = state;
    return { ChatReducer, InfoRdr, CaptureRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chatCreateSession: (sessionId, $this, OV) => dispatch(chatCreateSession(sessionId, $this, OV)),
        chatCreateToken: (sessionId, $this, OV) => dispatch(chatCreateToken(sessionId, $this, OV)),
        CaptureAction: (mode) => dispatch(CaptureAction(mode)),
        GetCaptureImageAction: (image) => dispatch(GetCaptureImageAction(image)),
        GetQuestionsAction: () => dispatch(GetQuestionsAction()),
        SubmitQuestionsAction: (id, status, time) => dispatch(SubmitQuestionsAction(id, status, time)),
        GetSingleQuestion: (id) => dispatch(GetSingleQuestion(id)),
        FinishAction: (model, $this) => dispatch(FinishAction(model, $this)),
        ResetRdrAction: () => dispatch(ResetRdrAction()),
        ResetRdrPicAction: () => dispatch(ResetRdrPicAction()),
        JoinVideoAction: ($this) => dispatch(JoinVideoAction($this)),
        EndVideoAction: () => dispatch(EndVideoAction()),
        PushNotificationAction: (model) => dispatch(PushNotificationAction(model)),
        GetNotificationAction: () => dispatch(GetNotificationAction()),
        SendScreenVideo: (body, $this) => dispatch(SendScreenVideo(body, $this)),
        RecordingStop: () => dispatch(RecordingStop())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
