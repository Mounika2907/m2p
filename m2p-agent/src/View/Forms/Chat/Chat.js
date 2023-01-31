import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import ChatCmp from '../../../Component/Forms/ChatCmp/ChatCmp';
import { connect } from 'react-redux';
const $ = window.$;

class Chat extends Component {
    state = {
        // myUserName: 'Participant' + Math.floor(Math.random() * 100),
        myUserName: '',
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        message: '',
        myMessage: '',
        msgArr: [],
        customerConnectionID: '',
        agentConnectionID: ''

    };
    // componentWillUpdate(){
    //     $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
    // }

    handleChangeMsg = (event) => {
        event.preventDefault();
        this.setState({
            message: event.target.value
        })
    }
    sendMessage = (event) => {
        event.preventDefault();
        const userid = sessionStorage.getItem("userid");
        const vcipid = sessionStorage.getItem("vcipid");
        const model = {
            sender: userid,
            vcipid: vcipid
        }
        this.props.CaptureRdr.chatPublisher.stream.session.signal({
            data: this.state.message,  // Any string (optional)
            to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
            type: JSON.stringify(model)             // The type of message (optional)
        }).then(() => {
            // console.log('Message successfully sent');
            this.setState({
                customerConnectionID: this.state.myUserName
            });
        }).catch(error => {
            console.error(error);
        });
        this.setState({
            ...this.state,
            message: ''
        });
        document.getElementById("chatform").reset();
        $('.notify-msg').removeClass('notifyactive');
    }

    time = (val) => {
        return new Date(val).toLocaleTimeString("en-IN");
    }


    render() {
        // data.connectionId !== _this4.props.user.getConnectionId()

        return (
            <Aux>
                <ChatCmp
                    send={this.sendMessage}
                    changeMsg={this.handleChangeMsg}
                    myMessage={this.state.myMessage}
                    bulk={this.props.CaptureRdr.chatMessages}
                    time={(val) => this.time(val)}
                    CustomerId={this.state.customerConnectionID}
                />
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { CaptureRdr } = state;
    return {
        CaptureRdr
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         FaceMatchAction: (img1, img2, id) => dispatch(FaceMatchAction(img1, img2, id)),
//         LiveCheckAction: (img) => dispatch(LiveCheckAction(img))
//     }
// }


export default connect(mapStateToProps)(Chat);
