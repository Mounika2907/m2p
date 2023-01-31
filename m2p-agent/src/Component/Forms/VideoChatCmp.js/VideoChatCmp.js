import React from 'react';
import Aux from '../../../hoc/Aux';
// import UserVideoComponent from '../../../View/OpenVidu/UserVideoComponent';

const VideoChatCmp = (props) => {
    return (
        <Aux>
            <div className="live-video sr1">
                <h2 className="live-title">
                    CUSTOMER
                </h2>
                <div className="customer-video">
                    {/* <video src="" poster="images/sample_icon.png" width="100%" height="100%"></video> */}
                    <img src="images/sample_icon.png" className="w-100 h-100" alt="no img" />
                </div>
                <div className="customer-video live-banker">
                    {/* <video src=""></video> */}
                    <img src="images/user.png" className="w-100 h-100" alt="no img" />
                </div>
                <div className="questions">
                    <ul className="nav qtn-nav">
                        <li className="qtn-item">
                            <div className="dropdown">
                                <button className="qtn-btn qtn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Q</button>
                                {/* <button className="btn btn-secondary dropdown-toggle" type="button"
                                      id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                      aria-expanded="false">
                                      Dropdown button
                                  </button> */}
                                <div className="dropdown-menu qtn-dropdown dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <h3 className="qtn-title">Questions</h3>
                                    <ol className="qtn-list" type={1}>
                                        <li>WHAT IS YOUR NAME.?</li>
                                        <li>WHAT IS YOUR FATHER’S NAME.?</li>
                                        <li>WHAT IS YOUR dob.?</li>
                                        <li>WHAT IS YOUR pan number.?</li>
                                        <li>WHAT IS YOUR pan number.?</li>
                                    </ol>
                                </div>
                            </div></li>
                        <li className="qtn-item">
                            <button className="qtn-btn active">
                                <i className="fas fa-check" />
                            </button>
                        </li>
                        <li className="qtn-item">
                            <button className="qtn-btn">2</button>
                        </li>
                        <li className="qtn-item">
                            <button className="qtn-btn">3</button>
                        </li>
                        <li className="qtn-item">
                            <button className="qtn-btn">4</button>
                        </li>
                        <li className="qtn-item">
                            <button className="qtn-btn">5</button>
                        </li>
                    </ul>
                </div>
            </div>

        </Aux>
    )
}

export default VideoChatCmp
