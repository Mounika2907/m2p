import React from 'react'
import Aux from '../../../hoc/Aux';

const ChatCmp = (props) => {
    const val = sessionStorage.getItem('connectionId');
    return (
        <Aux>
            <div className="info sr1 border-right-0">
                <h2 className="info-title">CHAT</h2>
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
                                        <img src="images/user.png" className="ml-2 chat-img" alt="no img" />
                                    </div>
                                </div>
                            </div>) :
                            (<div className="message-box message-box2">
                                <div className="user-msg">
                                    <div className="media">
                                        <img src="images/live.png" className="mr-2 chat-img" alt="no img" />
                                        <div className="media-body chat-left">
                                            <p className="chat-msg">{res.data}</p>
                                            <p className="chat-time text-left">{props.time(res.from.creationTime)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        )}
                        {/* ) : (props.bulk.map((res, i) => (
                             <div key={i} className={`message-box ${res.from.connectionId !== val ? 'message-box1' : 'message-box2'}`}>
                                <div className="bank-msg">
                                    <div className="media">
                                        <div className="media-body chat-right">
                                            <p className="chat-msg">{res.data}</p>
                                            <p className="chat-time text-right">{props.time(res.from.creationTime)}</p>
                                        </div>
                                        <img src="images/user.png" className="ml-2 chat-img" alt="no img" />
                                    </div>
                                </div>
                            </div>
                            <div key={i} className="message-box message-box2">
                                <div className="bank-msg">
                                    <div className="media">
                                        <div className="media-body chat-right">
                                            <p className="chat-msg">{res.data}</p>
                                        </div>
                                        <img
                                            src="images/user.png"
                                            className="ml-2 chat-img"
                                            alt="no img"
                                        />
                                    </div>
                                </div>
                            </div>
                        )))} */}
                        {/* <div className="message-box message-box1">
                            <div className="bank-msg">
                                <div className="media">
                                    <div className="media-body chat-right">
                                        <p className="chat-msg">
                                            Lorem ipsum
              </p>
                                        <p className="chat-time text-right">7.30</p>
                                    </div>
                                    <img src="images/user.png" className="ml-2 chat-img" alt="no img" />
                                </div>
                            </div>
                        </div>
                        <div className="message-box message-box2">
                            <div className="user-msg">
                                <div className="media">
                                    <img src="images/live.png" className="mr-2 chat-img" alt="no img" />
                                    <div className="media-body chat-left">
                                        <p className="chat-msg">
                                            Lorem ipsum Lorem ipsum dolor sit.
                                            Lorem ipsum dolor sit amet.
              </p>
                                        <p className="chat-time text-left">7.30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="message-box message-box2">
                            <div className="user-msg">
                                <div className="media">
                                    <img src="images/live.png" className="mr-2 chat-img" alt="no img" />
                                    <div className="media-body chat-left">
                                        <p className="chat-msg">
                                            Lorem ipsum Lorem ipsum dolor sit.
                                            Lorem ipsum dolor sit amet.
              </p>
                                        <p className="chat-time text-left">7.30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="message-box message-box1">
                            <div className="bank-msg">
                                <div className="media">
                                    <div className="media-body chat-right">
                                        <p className="chat-msg">
                                            Lorem ipsum
              </p>
                                        <p className="chat-time text-right">7.30</p>
                                    </div>
                                    <img src="images/user.png" className="ml-2 chat-img" alt="no img" />
                                </div>
                            </div>
                        </div>
                        <div className="message-box message-box1">
                            <div className="bank-msg">
                                <div className="media">
                                    <div className="media-body chat-right">
                                        <p className="chat-msg">
                                            Lorem ipsum
              </p>
                                        <p className="chat-time text-right">7.30</p>
                                    </div>
                                    <img src="images/user.png" className="ml-2 chat-img" alt="no img" />
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <form className="chat-form" onSubmit={props.send} id="chatform">
                        <div className="form-group position-relative">
                            <button type="button" className="chat-icon icon1">
                                <i className="fas fa-paperclip" />
                            </button>
                            <input
                                type="text"
                                className="chat-inp"
                                name="message"
                                onChange={props.changeMsg}
                                placeholder="Type Your Message"
                            />
                            <button type="button" className="chat-icon icon2">
                                <i className="fas fa-microphone" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Aux>
    )
}

export default ChatCmp;
