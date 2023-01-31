import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
// import VideoChat from '../../View/Forms/VideoChat/VideoChat';
import ChatApp from '../../View/OpenVidu/ChatApp';
import PAN from '../../View/Forms/PAN/PAN';
import Aadhar from '../../View/Forms/Aadhar/Aadhar';
import Chat from '../Forms/Chat/Chat';
import FaceMatch from '../FaceMatch/FaceMatch';
import { GetInfoAction, GetTimeAction } from '../../Store/Actions/DetailsAction';
import { connect } from 'react-redux';

class Home extends Component {
    state = {
        loader: true,
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", this.props.match.params.id)
        if (id) {
            const $this = this;
            this.props.GetInfoAction(id, $this);
            this.props.GetTimeAction();
        }
    }

    componentWillUnmount(){
        const id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", this.props.match.params.id)
        if (id) {
            const $this = this;
            this.props.GetInfoAction(id, $this);
            this.props.GetTimeAction();
        }
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
                            {/* <VideoChat /> */}
                            <ChatApp push={push} />
                        </div>
                        <div className="col-md-9">
                            <div className="display">
                                <PAN />
                                <div className="row m-0">
                                    <div className="col-md-5 p-0">
                                        <div className="info sr1">
                                            <Aadhar />
                                            <FaceMatch />
                                        </div>
                                    </div>
                                    <div className="col-md-7 p-0">
                                        <Chat />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
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
