import React from 'react'
import Aux from '../../../hoc/Aux';

const ChatCmp = (props) => {
    const val = sessionStorage.getItem('connectionId');
    return (
        <Aux>
            <div className="info border-right-0">
                <h5 className="info-title">VIDEO KYC CHAT</h5>
                <div className="chat">
                    <div className="chat-box" id="chatbox">
                        {/* {props.CustomerId ? ( */}
                        {props.bulk.map((res, i) => res.from.connectionId !== val ?
                            (<div key={i} className="message-box message-box1">
                                <div className="bank-msg">
                                    <div className="media">
                                        <div className="media-body chat-right">
                                            <p className="chat-msg">{res.data}</p>
                                            <p className="chat-time text-right">{props.time(res.from.creationTime)}</p>
                                        </div>
                                        <img src="../images/sample_icon.png" className="ml-2 chat-img border" alt="no img" />
                                    </div>
                                </div>
                            </div>) :
                            (<div key={i} className="message-box message-box2">
                                <div className="user-msg">
                                    <div className="media">
                                        <img src="../images/user.png" className="mr-2 chat-img border" alt="no img" />
                                        <div className="media-body chat-left">
                                            <p className="chat-msg">{res.data}</p>
                                            <p className="chat-time text-left">{props.time(res.from.creationTime)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        )}
                        
                    </div>
                    <form className="chat-form" autoComplete="off" onSubmit={props.send} id="chatform">
                        <div className="form-group position-relative">
                            <button type="button" className="chat-icon icon1">
                                {/* <i className="fas fa-paperclip" /> */}
                                <i className="fas fa-laugh"></i>
                            </button>
                            <input
                                type="text"
                                className="chat-inp"
                                name="message"
                                onChange={props.changeMsg}
                                placeholder="Type Your Message"
                                required
                            />
                            <button type="submit" className="chat-icon icon2">
                                {/* <i className="fas fa-microphone" /> */}
                                <i className="fas fa-paper-plane" style={{transform: "rotate(45deg)"}}></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Aux>
    )
}

export default ChatCmp;
