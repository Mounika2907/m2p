import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
// import VideoChat from '../../View/Forms/VideoChat/VideoChat';
import ChatApp from '../OpenVidu/ChatApp';
import PAN from '../Forms/PAN/PAN';
import Aadhar from '../Forms/Aadhar/Aadhar';
import Chat from '../Forms/Chat/Chat';
import FaceMatch from '../FaceMatch/FaceMatch';
import { GetInfoAction, GetTimeAction, ScreenVideoUrl } from '../../Store/Actions/DetailsAction';
import { connect } from 'react-redux';
// import record from './record';
import { ReactMediaRecorder } from "react-media-recorder";
var $ = window.$;

class Home extends Component {
    state = {
        loader: true,
        bot: false,
        mediaRecorder: '',
        chunks: [],
        count: 0,
        localStream: null,
        micNumber: 0
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", id)
        if (id) {
            // $('#btn_record_start').click();
            const $this = this;
            this.props.GetInfoAction(id, $this);
            this.props.GetTimeAction();
        }
        // this.loadScripts();
    }
    // loadScripts = () => {
    //     const dynamicScripts = [
    //         '/js/adapter-latest.js',
    //     ];
    //     for (let i = 0; i < dynamicScripts.length; i++) {
    //         const node = document.createElement('script');
    //         node.src = dynamicScripts[i];
    //         node.type = 'text/javascript';
    //         node.async = false;
    //         node.charset = 'utf-8';
    //         document.getElementsByTagName('head')[0].appendChild(node);
    //     }
    // }


    componentWillUnmount() {
        const id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", this.props.match.params.id)
        if (id) {
            const $this = this;
            this.props.GetInfoAction(id, $this);
            this.props.GetTimeAction();
        }
        // this.loadScripts();
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

    render() {
        const push = this.props.history;

        return (
            <Aux>
                {this.state.loader ? (
                    <div className="loader">
                        <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>)
                    : (<div className="row">
                        {/* VIDEO  */}
                        <div className="col-md-3">
                            {/* <ReactMediaRecorder
                                screen
                                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                                    <div>
                                        <p className="d-none">{status}</p>
                                        <button id="btn_record_start" onClick={startRecording} >Start Recording</button>
                                        <button id="btn_record_end" onClick={stopRecording}>Stop Recording</button>
                                        <video src={mediaBlobUrl} controls autoPlay loop /> */}
                                        {/* <button type="button" className="custom-btn" onClick={() => this.finishCheck(mediaBlobUrl)}>Finish</button> */}
                                        {/* <button type="button" className="custom-btn" onClick={() => this.storeVideo(mediaBlobUrl)}>store</button> */}
                                        {/* <VideoChat /> */}
                                        {/* <ChatApp push={push} videoSource={(mediaBlobUrl) => this.props.ScreenVideoUrl(mediaBlobUrl)} /> */}
                                        <ChatApp push={push} />
                                    {/* </div>
                                )}
                            /> */}
                        </div>
                        <div className="col-md-9">
                            <div className="display">
                                <PAN />
                                <div className="row m-0">
                                    <div className="col-md-5 p-0">
                                        <div className="info sr1">
                                            <Aadhar />
                                        </div>
                                    </div>
                                    <div className="col-md-7 p-0">
                                        <div className="info sr1 border-right-0">
                                            <FaceMatch />
                                            {/* <Chat /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }

                <div className="bot">
                    <button className="chat-bot" id="bot" onClick={this.openbot}>
                        <span className="notify-msg"></span>
                        {this.state.bot ?
                            <span className="close-chat"><i className="fas fa-times"></i></span> :
                            <span className="close-chat"><i className="far fa-comment-alt"></i></span>
                        }
                    </button>
                    <div className="bot-box" id="chat-id">
                        <Chat />
                    </div>
                </div>

            </Aux>
        )
    }
}

// const mapStateToProps = (state) => {
//     const { ChatReducer, VideoReducer } = state;
//     return { ChatReducer, VideoReducer }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        GetInfoAction: (vcipid, $this) => dispatch(GetInfoAction(vcipid, $this)),
        GetTimeAction: () => dispatch(GetTimeAction()),
        ScreenVideoUrl: (val) => dispatch(ScreenVideoUrl(val))
    }
}

export default connect(null, mapDispatchToProps)(Home);
