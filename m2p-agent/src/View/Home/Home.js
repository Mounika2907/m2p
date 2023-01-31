import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
// import VideoChat from '../../View/Forms/VideoChat/VideoChat';
import ChatApp from '../OpenVidu/ChatApp';
import PAN from '../Forms/PAN/PAN';
import Aadhar from '../Forms/Aadhar/Aadhar';
import Chat from '../Forms/Chat/Chat';
import FaceMatch from '../FaceMatch/FaceMatch';
import { GetInfoAction, GetTimeAction } from '../../Store/Actions/DetailsAction';
import { connect } from 'react-redux';
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
        $('#hideSidebar').hide();
        $("main").css("marginLeft", "0px");
        const id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", id)
        if (id) {
            const $this = this;
            this.props.GetInfoAction(id, $this);
        }
        this.loadScripts();
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/js/adapter-latest.js',
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }

    componentWillUnmount() {
        // const vid = sessionStorage.getItem("vcipid");
        // if (!vid) {
        //     if (this.props.match.isExact) {
        //         this.props.history.push(this.props.location.pathname);
        //     }            
        // }
        $('#hideSidebar').show();
        $("main").css("marginLeft", "140px");
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
                    : (<Aux>
                        <div className="row">
                            <div className="col-md-7 p-0">
                                <ChatApp push={push} />
                                <Aadhar />
                            </div>
                            <div className="col-md-5">
                                <div className="display vheight1 bdr-bottom">
                                    <div className="info sr1 border-right-0 pb-0">
                                        <FaceMatch />
                                    </div>
                                </div>
                                <div className="display vheight2">
                                    <PAN />
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-7 p-0">
                                <Aadhar />
                            </div>
                            <div className="col-md-5">
                                <div className="display">
                                    <PAN />
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="row">
                            <div className="col-md-3">
                                <ChatApp push={push} />
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  */}
                    </Aux>)
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
        GetTimeAction: () => dispatch(GetTimeAction())
    }
}

export default connect(null, mapDispatchToProps)(Home);
