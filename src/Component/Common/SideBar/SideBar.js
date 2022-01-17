import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResetRdrAction } from '../../../Store/Actions/UsersActions/UserActions';
import { Text } from '../../../View/Language/Language';

class Sidebar extends Component {
    state = {
        width: '',
        classes: {
            steps: ''
        }
    }

    handleSteps = (val, steps) => {
        // this.setState({
        //     ...this.state,
        //     width: val
        // });
        // let step = "step"+steps;
        // let classes = "completed"+steps;
        sessionStorage.setItem("width", val);
        sessionStorage.setItem("step", steps);
        this.setState({
            ...this.state,
            width: val,
            classes: {
                steps: steps
            }
        })
    }

    logout = () => {
        sessionStorage.clear();
        // this.props.urlPath.replace("/");
        this.props.ResetRdrAction();
        // const url = "vkycapp://syntizen"
        // window.location.replace(url);
        var app = {
            launchApp: function () {
                //  const andri =  "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
                //  const andri =  "intent://192.168.0.52:5007/#Intent;scheme=http;package=com.syntizen.V_kycwebview;end";
                const url = "vkycapp://syntizen"
                window.location.replace(url);
                //   window.location.replace("com.syntizen.V_kycwebview://share?");
                // this.props.history.replace("com.syntizen.V_kycwebview://")
                this.timer = setTimeout(this.openWebApp, 3000);
            },

            openWebApp: function () {
                window.location.replace("https://vcip.syntizen.com");
            }
        };

        app.launchApp();

        // this.props.urlPath.push("/");
        // window.location.reload(true);
        // this.props.history.replace("/");
        // window.location.reload(true);
        // var app = {
        //     launchApp: function() {
        //     //  const andri =  "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
        //     //  const andri =  "intent://192.168.0.52:5007/#Intent;scheme=http;package=com.syntizen.V_kycwebview;end";
        // const url = "vkycapp://syntizen"
        //   window.location.replace(url);
        //     //   window.location.replace("com.syntizen.V_kycwebview://share?");
        //     // this.props.history.replace("com.syntizen.V_kycwebview://")
        //     //   this.timer = setTimeout(this.openWebApp, 3000);
        //     },

        //     // openWebApp: function() {
        //     //   window.location.replace("https://vcip.syntizen.com");
        //     // }
        //   };

        //   app.launchApp();
    }

    render() {
        const progress = {
            height: this.props.pincodeRdr.stage.height || sessionStorage.getItem("width")
        };
        const completedSteps = this.props.pincodeRdr.stage.step || sessionStorage.getItem("step");
        const urlPath = this.props.urlPath.location.pathname;
        const vcipid = sessionStorage.getItem("vcipid");
        // const vcipStatus = this.props.pincodeRdr?.statuses?.vcipidstatus;
        // const kyc = this.props.pincodeRdr?.statuses?.kycstatus;
        // const pan = this.props.pincodeRdr?.statuses?.panstatus;
        // const video = this.props.pincodeRdr?.statuses?.videoconfstatus;
        if (!vcipid) {
            //     if (urlPath === "/pan") {
            //         if (pan) {
            //             // this.props.history.push("/")
            //             return <Redirect to="/pan" />
            //         }
            //     }            
            // } else {
            if (urlPath === "/start" || urlPath === "/pan" || urlPath === "/aadhaar" || urlPath === "/video-chat" || urlPath === "/end") {
                // if (pan) {
                // this.props.history.push("/")
                sessionStorage.setItem("width", "0%");
                sessionStorage.setItem("step", 1);
                return <Redirect to="/" />
                // }
            }
        }
        return (
            <aside className="user-sidebar" id="menu">
                <h2 className="sidebar-title">
                    Syntizen
                </h2>
                <p className="sidebar-subtitle mb-4">Bank</p>

                <hr className="hr w-75 mx-auto" />

                <div className="user-steps">
                    <div className="step-line">
                        <div className="step-progress" style={progress} />
                    </div>
                    <ul className="nav nav-fill flex-column steps-nav">
                        <li className="nav-item steps-item">
                            <NavLink to="/" exact onClick={() => this.handleSteps("0%", 1)}
                                className="nav-link steps-link">
                                <div className={`step-box ${0 < completedSteps ? 'completed' : ''}`}>
                                    <span className="step-count step-count1">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    <Text tid="start" />
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item steps-item">
                            <NavLink to={(urlPath === '/start' || urlPath === '/aadhaar' || urlPath === '/aadhaaroffline') ? urlPath : '/start'} exact onClick={() => this.handleSteps("26%", 2)}
                                className="nav-link steps-link">
                                <div className={`step-box ${2 < completedSteps ? 'completed' : ''}`}>
                                    <span className="step-count">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    <Text tid="aadhar_verification" />
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item steps-item">
                            <NavLink to="/pan" exact onClick={() => this.handleSteps("38%", 3)}
                                className="nav-link steps-link">
                                <div className={`step-box ${3 < completedSteps ? 'completed' : ''}`}>
                                    <span className="step-count">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    <Text tid="pan_verification" />
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item steps-item">
                            <NavLink to="/video-chat" exact onClick={() => this.handleSteps("54%", 4)}
                                className="nav-link steps-link">
                                <div className={`step-box ${4 < completedSteps ? 'completed' : ''}`}>
                                    <span className="step-count">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    <Text tid="chat_initial_video" />
                                </p>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item steps-item">
                            <NavLink to="/video-chat" exact onClick={() => this.handleSteps("70%", 5)}
                                className="nav-link steps-link">
                                <div className={`step-box ${5 < completedSteps ? 'completed' : ''}`}>
                                    <span className="step-count">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    Q &amp; A
                                    Session
                                    </p>
                            </NavLink>
                        </li>
                        <li className="nav-item steps-item">
                            <NavLink to="/video-chat" exact onClick={() => this.handleSteps("85%", 6)}
                                className="nav-link steps-link">
                                <div className={`step-box ${6 < completedSteps ? 'completed' : ''}`}>
                                    <span className="step-count">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    Capture
                                    Photo
                                    </p>
                            </NavLink>
                        </li> */}
                        <li className="nav-item steps-item">
                            <NavLink to="/end" exact onClick={() => this.handleSteps("100%", 7)}
                                className="nav-link steps-link">
                                <div className="step-box">
                                    <span className="step-count step-count1">
                                        {completedSteps ? <i className="fas fa-check"></i> : ''}
                                    </span>
                                </div>
                                <p className="step-name">
                                    <Text tid="end" />
                                </p>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="text-center">
                    {vcipid ? <button className="logout" data-toggle="modal" data-target="#startEnd">
                        <i className="fas fa-home"></i>
                    </button> : <button className="logout" onClick={this.logout}>
                        <i className="fas fa-home"></i>
                    </button>}
                </div>


                <hr className="hr w-75 my-1 mx-auto" />
                <p className="sidebar-subtitle mb-0 text-muted" style={{ fontSize: "10px" }}>Powered By</p>
                <h2 className="sidebar-title mt-0 text-muted">
                    Syntizen
                </h2>


                {/* <ul className="nav flex-column custom-sidebar">
                    <li className="nav-item custom-sidebar-item">
                        <a className="nav-link custom-sidebar-link" href="#">
                            <i className="fas fa-home" />
                        </a>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <a className="nav-link custom-sidebar-link active" href="#">
                            <i className="fas fa-user-alt" />
                        </a>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <a className="nav-link custom-sidebar-link" href="#">
                            <i className="fas fa-cog" />
                        </a>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <a className="nav-link custom-sidebar-link" href="#">
                            <i className="fas fa-comments" />
                        </a>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <a className="nav-link custom-sidebar-link" href="#">
                            <i className="fas fa-calendar" />
                        </a>
                    </li>
                    <li className="nav-item custom-sidebar-item">
                        <a className="nav-link custom-sidebar-link" href="#">
                            <i className="fas fa-bell" />
                        </a>
                    </li>
                </ul> */}
                {/* <div className="text-center">
                    <button className="logout"><i className="fas fa-power-off" /></button>
                </div> */}
            </aside >

        )
    }
}


const mpaStateToProps = (state) => {
    const { pincodeRdr } = state;
    return {
        pincodeRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ResetRdrAction: () => dispatch(ResetRdrAction()),
    }
}

export default connect(mpaStateToProps, mapDispatchToProps)(Sidebar);
