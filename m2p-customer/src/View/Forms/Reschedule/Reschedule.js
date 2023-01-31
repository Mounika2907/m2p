import React, { Component } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Aux from '../../../hoc/Aux';
import { Text } from '../../Language/Language';
import {
    GetLanguagesAction, GetCalenderAction, CreateScheduleAction,
    InitiateConferenceQueueAction, UpdatedTokenNumbeAction, JoinVideoAction,
    EndVideoAction, GetQuestionsAction, GetVcipStatusAction, GetScheduleDetailsAction, CancelScheduleAction
} from '../../../Store/Actions/ProcessAction';
import RescheduleCmp from '../../../Component/Forms/RescheduleCmp/RescheduleCmp';
import { chatCreateSession, chatCreateToken } from '../../../Store/Actions/UsersActions/ChatAction';
import { GetNotificationAction, PushNotificationAction, StageUpdateAction } from '../../../Store/Actions/GenerateAction';
import { ResetEndRdrAction, ResetRdrAction } from '../../../Store/Actions/UsersActions/UserActions';
import ChatCmp from '../../../Component/ChatCmp/ChatCmp';
import UserVideoComponent from './UserVideoComponent';
import SoundCalling from './SoundCalling';
import {SytledINPUT, SytledSMALL, SytledBUTTON, SytledH5, SytledH2, SytledH6} from '../../../hoc/style_component';
// import callingSound from './assets/audio/tone_new.np3';

const $ = window.$;

class Reschedule extends Component {
    state = {
        langid: '',
        stime: '',
        sdate: '',
        mySessionId: 'syz',
        myUserName: '',
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        message: '',
        myMessage: '',
        bankerMessage: '',
        msgArr: [],
        intervalId: undefined,
        intervalId1: undefined,
        createScheduleStatus: false,
        joinBtnDisable: false,
    }

    inpRef = React.createRef();

    componentDidMount() {
        this.GetVcipStatus();
        window.addEventListener('beforeunload', this.onbeforeunload);

        // const vcipid = sessionStorage.getItem("vcipid");
        // const langid = sessionStorage.getItem("langid");
        const status = this.props.pincodeRdr.statuses?.videoconfstatus || sessionStorage.getItem("videoconfstatus");
        const isscheduled = this.props.pincodeRdr.statuses?.isscheduled || sessionStorage.getItem("isscheduled");

        if (status !== "3") {
            const stage = {
                height: "76%",
                step: 4
            }
            this.props.StageUpdateAction(stage);
        }
        if (isscheduled === "1") {
            this.initiate("1");
        } else {
            this.getLanguages();
            $('#info').modal('show');
        }
        // if (vcipid) {
        //     if (status !== undefined || status === "0") {
        //         if (status !== "3") {
        //             this.props.InitiateConferenceQueueAction(langid);
        //             let intervalId1 = setInterval(() => {
        //                 if (this.props.VideoReducer.waitingList?.isscheduled === "1") {
        //                     if (this.props.PanRdr.scheduleDetails?.joinstatus === "1") {
        //                         clearInterval(this.state.intervalId1);
        //                     } else {
        //                         this.props.GetScheduleDetailsAction();
        //                     }
        //                 } else {
        //                     if (this.props.VideoReducer.waitingList?.token === "0") {
        //                         clearInterval(this.state.intervalId1);
        //                     } else {
        //                         this.checkToken();
        //                     }
        //                 }
        //             }, 15000);
        //             this.setState({ intervalId1: intervalId1 });
        //         }
        //     }
        // }
        // this.setState({
        //     myUserName: vcipid
        // });
    }


    componentWillUnmount() {
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            window.removeEventListener('beforeunload', this.onbeforeunload);
            this.leaveCallSession();
        }
        clearInterval(this.state.intervalId);
        clearInterval(this.state.intervalId1);
    }

    GetVcipStatus = async () => {
        await this.props.GetVcipStatusAction();
    };

    

    initiate = async (langid) => {
        const vcipid = sessionStorage.getItem("vcipid");
        // const langid = sessionStorage.getItem("langid");
        const status = this.props.pincodeRdr.statuses?.videoconfstatus || sessionStorage.getItem("videoconfstatus");
        // const isscheduled = this.props.pincodeRdr.statuses?.isscheduled || sessionStorage.getItem("isscheduled");

        // if (isscheduled === "1") {
        if (vcipid) {
            if (status !== undefined || status === "0") {
                if (status !== "3") {
                    await this.props.InitiateConferenceQueueAction(langid);
                    let intervalId1 = setInterval(() => {
                        if (this.props.VideoReducer.waitingList?.isscheduled === "1") {
                            if (this.props.PanRdr.scheduleDetails?.joinstatus === "-1") {
                                clearInterval(this.state.intervalId1);
                                sessionStorage.clear();
                                this.props.ResetRdrAction();
                                this.props.history.replace("/");
                                window.location.reload(true);
                                return
                            } else {
                                this.props.GetScheduleDetailsAction();
                            }
                        } else {
                            if (this.props.VideoReducer.waitingList?.token === "0") {
                                clearInterval(this.state.intervalId1);
                            } else {
                                this.checkToken();
                            }
                        }
                    }, 15000);
                    this.setState({ intervalId1: intervalId1 });
                }
            }
        }
        // } else {
        //     this.getLanguages();
        //     $('#info').modal('show');
        // }
    }


    checkToken = () => {
        this.props.UpdatedTokenNumbeAction();
    }

    waitingCall = () => {
        $('#videomodel').modal('hide');
    }

    endVideoCall = () => {
        $('#endCallModal').modal('show');
    }

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
        clearInterval(this.state.intervalId1);
        this.setState({
            joinBtnDisable: true
        })
        setTimeout(() => {
            this.OV = new OpenVidu();
            this.setState({
                session: this.OV.initSession(),
            }, () => {
                var mySession = this.state.session;
                mySession.on('streamCreated', (event) => {
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    // sessionStorage.setItem("connectionId", event.stream.connection.connectionId);

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
                // const name = sessionStorage.getItem("vcipid");
                const name = sessionStorage.getItem("videoconfsessionid");
                // const name = this.props.VideoReducer.waitingList?.videoconfsessionid;
                this.props.chatCreateSession(name, $this, this.OV);
                this.props.JoinVideoAction();
                this.props.GetQuestionsAction();
                this.props.GetNotificationAction();
            });

            let intervalId = setInterval(() => {
                this.props.GetQuestionsAction();
                this.props.GetNotificationAction();
            }, 2000);
            this.setState({ intervalId: intervalId });
        }, 5000);

    }

    leaveCallSession = () => {
        const mySession = this.state.session;
        if (mySession) {
            mySession.disconnect();
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
        sessionStorage.removeItem("session");
        // this.props.EndVideoAction();
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("videoconfsessionid");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        // this.props.history.replace("/end");
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
            mySessionId: '',
            myUserName: '',
            mainStreamManager: undefined,
            publisher: undefined
        });
        sessionStorage.removeItem("session");
        this.props.EndVideoAction();
        sessionStorage.removeItem("connectionId");
        sessionStorage.removeItem("publisher");
        sessionStorage.removeItem("session");
        const endCall = this.props.VideoReducer.endVideoCall;
        if (endCall === "2") {
            $('#endCallModalByAgent').modal('show');
            this.props.ResetEndRdrAction();
            setTimeout(() => {
                $('#endCallModalByAgent').modal('hide');
                sessionStorage.setItem("width", "100%");
                sessionStorage.setItem("step", 5);
                const stage = {
                    height: "100%",
                    step: 5
                }
                this.props.StageUpdateAction(stage);
                this.props.history.replace("/end");
            }, 3000);
        } else {
            const model = {
                id: "3",
                msg: "customer ended Call"
            }
            this.props.PushNotificationAction(model);
            $('#endCallModal').modal('hide');
            sessionStorage.setItem("width", "100%");
            sessionStorage.setItem("step", 5);
            sessionStorage.setItem("step", 5);
            const stage = {
                height: "100%",
                step: 5
            }
            this.props.StageUpdateAction(stage);
            this.props.history.replace("/end");
        }
    }

    handleChangeMsg = (event) => {
        event.preventDefault();
        this.setState({
            message: event.target.value
        });
    }

    sendMessage = (event) => {
        event.preventDefault();
        const vcipid = sessionStorage.getItem("vcipid");
        const model = {
            sender: vcipid,
            vcipid: vcipid
        }
        this.state.mainStreamManager.stream.session.signal({
            data: this.state.message,
            to: [],
            type: JSON.stringify(model)
        }).then(() => {
        }).catch(error => {
        });
        this.setState({
            ...this.state,
            message: ''
        });
        document.getElementById("chatform").reset();
    }

    time = (val) => {
        return new Date(val).toLocaleTimeString("en-IN");
    }

    // TO OPEN CHAT BOX
    openbot = () => {
        $('#bot').toggleClass('botactive');
        $('#chat-id').toggleClass('chatshow');
        $('.notify-msg').removeClass('notifyactive');
        this.setState({
            bot: !this.state.bot
        })
    }

    getLanguages = async () => {
        await this.props.GetLanguagesAction();
    }

    handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    submitLanguage = async (event) => {
        event.preventDefault();
        const langid = this.state.langid;
        sessionStorage.setItem("langId", langid);
        if (langid) {
            $('#info').modal('hide');
            await this.props.GetCalenderAction(langid);
            await this.initiate(langid);
        } else {
            toast.error("Please select language");
        }
    }

    formateDate = (val) => {
        const oldDate = val;
        let newDate = oldDate?.split("-").reverse().join("-");
        return newDate;
    }

    createSchedule = async () => {
        const { langid, stime, sdate } = this.state;
        const languageId = langid || sessionStorage.getItem("langId");
        if (languageId && stime && sdate) {
            const model = {
                langid: languageId,
                stime: stime,
                sdate: sdate
            };
            const $this = this;
            await this.props.CreateScheduleAction(model, $this);
            setTimeout(() => {
                try {
                    this.initiate("1");
                } catch (error) {

                }
            }, 2000)

            // if (this.state.createScheduleStatus) {
            //     return;
            // }
            // await this.GetVcipStatus();
        } else {
            toast.error("Please select all fields");
        }
    }

    cancelSchedule = () => {
        try {
            const $this = this.props.history;
            this.props.CancelScheduleAction($this);
            this.getLanguages();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {

        }
        // await this.GetVcipStatus();
        // this.initiate("1");
    }
    redirectHome = () => {
        // $('#refreshpagemodel').modal('hide');
        sessionStorage.clear();
        this.props.history.replace("/");
        this.props.ResetRdrAction();
        window.location.reload(true);
    }

    render() {
        const languagesList = this.props.PanRdr.languagesList;
        const calenderDetails = this.props.PanRdr.calenderDetails;
        const scheduleDetails = this.props.PanRdr.scheduleDetails;

        const myUserName = this.state.myUserName || sessionStorage.getItem("vcipid");
        const liveStatus = this.state.session;
        const status = this.props.pincodeRdr.statuses?.videoconfstatus;
        const endCall = this.props.VideoReducer.endVideoCall;
        const waitingList = this.props.VideoReducer.waitingList;
        const subscribers = this.state.subscribers;
        const mainStreamManager = this.state.mainStreamManager;
        sessionStorage.setItem('token', waitingList?.token)

        if (endCall === "2") {
            this.leaveSession();
        }
        // if (status !== undefined || status === "3") {
        //     return <Redirect to="/end" />
        // }

        return (
            <Aux>
                {(status === undefined || status !== "3") ? (<Aux>
                    {liveStatus === undefined
                        ? <RescheduleCmp
                            languagesList={languagesList}
                            calenderDetails={calenderDetails}
                            scheduleDetails={scheduleDetails}
                            handleChange={this.handleChange}
                            submitLanguage={this.submitLanguage}
                            formateDate={this.formateDate}
                            createSchedule={this.createSchedule}
                            cancelSchedule={this.cancelSchedule}
                            inpRef={this.inpRef}

                            myUserName={myUserName}
                            waitingList={waitingList}
                            handleChangeUserName={this.handleChangeUserName}
                            joinSession={this.joinSession}
                            joinBtnDisable={this.state.joinBtnDisable}
                            redirectHome={this.redirectHome}
                            color={this.props.pincodeRdr.color}
                        />
                        : <Aux>
                            <SytledH5 color={this.props.pincodeRdr.color} className="heading mb-0">
                                <Text tid="video_call_process" />
                            </SytledH5>
                            <p className="small text-danger text-center mb-4">
                                <Text tid="under_recording_mode" />
                            </p>
                            <div className="row justify-content-center mt-4">
                                <div className="col-md-8">
                                    <div className="row m-0">
                                        <div className="col-md">
                                            <div className="video-chat border-left-0  sr1">
                                                <SytledH2 color={this.props.pincodeRdr.color} className="live-title">
                                                    <Text tid="user" />
                                                    - {myUserName}
                                                </SytledH2>
                                                <SoundCalling play={true} />

                                                <div className="customer-video" style={{ margin: "auto", textAlign: "center" }}>
                                                    {subscribers.length !== 0 ? (
                                                        // <SoundCalling play={true} />
                                                        null

                                                    )
                                                        : (
                                                            <>
                                                                <p className="text-center text-danger">
                                                                    <Text tid="waiting_for_banker" />
                                                                </p>
                                                                <span className="icon-phone trin-trin is-animating">
                                                                </span>
                                                                {/* <audio autoPlay loop>
                                                                
                                                                    <source src="./assets/audio/tone_new.np3" type="audio/mpeg" />
                                                                </audio> */}

                                                                {/* <SoundCalling play={true} /> */}

                                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="mb-2"
                                                                    width="60px" height="10px" viewBox="0 0 80 20">
                                                                    <circle cx="10" cy="10" r="10" fill="#666" >
                                                                        <animate attributeName="cx" from="10" to="40" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                    </circle>
                                                                    <circle cx="10" cy="10" r="0" fill="#555">
                                                                        <animate attributeName="r" from="0" to="10" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                    </circle>
                                                                    <circle cx="40" cy="10" r="10" fill="#777">
                                                                        <animate attributeName="cx" from="40" to="70" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                    </circle>
                                                                    <circle cx="70" cy="10" r="10" fill="#666">
                                                                        <animate attributeName="r" from="10" to="0" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                    </circle>
                                                                </svg>

                                                            </>
                                                        )
                                                    }
                                                    {subscribers.map((sub, i) => {
                                                        if (sub.stream.typeOfVideo !== "SCREEN") {
                                                            return <div key={i} className="stream-container othervideo">
                                                                <UserVideoComponent streamManager={sub} />
                                                            </div>
                                                        }
                                                    })}
                                                    <div className="myvideo">
                                                        {mainStreamManager !== undefined ? (
                                                            <div id="main-video">
                                                                <UserVideoComponent streamManager={mainStreamManager} />
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    <div className="qtn-display">
                                                        <p className="qtn-display-p">
                                                            {this.props.PanRdr?.singleQuestion.map((res) => (
                                                                res.ques
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-100 text-center">
                                                    {subscribers.length !== 0 ? (
                                                        <button className="custom-btn bg-danger mt-2" onClick={this.endVideoCall} style={{ width: "auto" }}>
                                                            <i className="fas fa-phone" style={{ transform: "rotate(-135deg)" }}></i>
                                                        </button>

                                                    ) : (
                                                        <>
                                                            <button className="custom-btn mt-2" onClick={this.endVideoCall} style={{ width: "auto", backgroundColor: "#53d553" }}>
                                                                <span className="icon-phone trin-trin is-animating">
                                                                </span>
                                                            </button>
                                                        </>

                                                    )

                                                    }
                                                </div>
                                                <div className="questions mt-2">
                                                    <ul className="nav qtn-nav">
                                                        <li className="qtn-item">
                                                            <div className="dropdown">
                                                                <button className="bg-info qtn-btn qtn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Q</button>
                                                            </div>
                                                        </li>
                                                        {this.props.PanRdr.questions?.map((qtn, i) => <li className="qtn-item" key={i}>
                                                            <button className={`qtn-btn ${qtn.status === '0' ? '' : qtn.status === '-1' ? 'reject' : 'active'}`}>
                                                                {qtn.status === "0" ? qtn.sno : qtn.status === "-1" ? <i className="fas fa-times"></i> : <i className="fas fa-check" />}
                                                            </button>
                                                        </li>)
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bot">
                                    <button className="chat-bot" id="bot" onClick={this.openbot}>
                                        <span className="notify-msg"></span>
                                        {this.state.bot ?
                                            <span className="close-chat"><i className="fas fa-times"></i></span> :
                                            <span className="close-chat"><i className="far fa-comment-alt"></i></span>
                                        }
                                    </button>
                                    <div className="bot-box" id="chat-id">
                                        <ChatCmp send={this.sendMessage}
                                            changeMsg={this.handleChangeMsg}
                                            myMessage={this.state.myMessage}
                                            bankerStatus={subscribers}
                                            bulk={this.state.msgArr}
                                            time={(val) => this.time(val)}
                                            bankerMessage={this.state.bankerMessage} />
                                    </div>
                                </div>
                            </div>
                        </Aux>
                    }</Aux>) : <Redirect to="/end" />}



                <div className="modal fade" id="endCallModalByAgent" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "auto" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <h6 className="instructions-title text-center m-0">
                                        <Text tid="agent_disconnected" />
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="endCallModal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "auto" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions pt-4 border-right-0">
                                    <SytledH6 color={this.props.pincodeRdr.color} className="instructions-title text-center">
                                        <Text tid="are_you_sure" />
                                    </SytledH6>

                                    <div className="pb-3 text-center">
                                        <SytledBUTTON color={this.props.pincodeRdr.color} type="button" className="btn custom-btn btn-secondary mr-2" data-dismiss="modal">
                                            <Text tid="no" />
                                        </SytledBUTTON>
                                        <SytledBUTTON color={this.props.pincodeRdr.color} type="button" onClick={this.leaveSession} className="btn custom-btn">
                                            <Text tid="yes" />
                                        </SytledBUTTON>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Aux>
        )
    }
};

const mapStateToProps = (state) => {
    const { ChatReducer, VideoReducer, PanRdr, pincodeRdr } = state;
    return {
        ChatReducer, VideoReducer, PanRdr, pincodeRdr
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetLanguagesAction: () => dispatch(GetLanguagesAction()),
        GetCalenderAction: (id) => dispatch(GetCalenderAction(id)),
        CreateScheduleAction: (model, $this) => dispatch(CreateScheduleAction(model, $this)),
        chatCreateSession: (sessionId, $this, OV) => dispatch(chatCreateSession(sessionId, $this, OV)),
        chatCreateToken: (sessionId, $this, OV) => dispatch(chatCreateToken(sessionId, $this, OV)),
        InitiateConferenceQueueAction: (lang) => dispatch(InitiateConferenceQueueAction(lang)),
        UpdatedTokenNumbeAction: () => dispatch(UpdatedTokenNumbeAction()),
        JoinVideoAction: () => dispatch(JoinVideoAction()),
        EndVideoAction: () => dispatch(EndVideoAction()),
        GetQuestionsAction: () => dispatch(GetQuestionsAction()),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        GetNotificationAction: () => dispatch(GetNotificationAction()),
        ResetEndRdrAction: () => dispatch(ResetEndRdrAction()),
        PushNotificationAction: (model) => dispatch(PushNotificationAction(model)),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),
        GetScheduleDetailsAction: () => dispatch(GetScheduleDetailsAction()),
        CancelScheduleAction: ($this) => dispatch(CancelScheduleAction($this)),
        ResetRdrAction: () => dispatch(ResetRdrAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reschedule);
