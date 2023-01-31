import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    state = {
        width: '',
        username: '',
        role: '',
        vcipid: '',
        classes: {
            steps: ''
        },
        time: undefined
    }
    componentDidMount() {
        // this.intervalID = setInterval(() => this.tick(),
        //     1000);
        const username = sessionStorage.getItem("username");
        const vcipid = sessionStorage.getItem("vcipid");
        const role = sessionStorage.getItem("role");
        this.setState({
            username: username,
            role: role,
            vcipid: vcipid
        })

    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    // tick() {
    //     if (this.props.InfoRdr.time.time) {
    //         // let timer =new Date().getTime(this.props.InfoRdr.time.time).toLocaleString()
    //         // let timer = new Date().toLocaleString();
    //         // timer.getTime();
    //         // console.log(timer);

    //         this.setState({
    //             time: new Date().toLocaleString()
    //         });
    //     }
    // }

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
            className: {
                steps: steps
            }
        })
    }

    render() {
        // const progress = {
        //     width: this.state.width || sessionStorage.getItem("width")
        // }
        // const completedSteps = this.state.classes.steps || sessionStorage.getItem("step");
        // console.log(completedSteps);

        // console.log(this.props.InfoRdr.time.time);
        const id = sessionStorage.getItem("vcipid");

        return (
            <Aux>{/* HEADER */}
                <header>
                    <nav className="navbar navbar-expand-lg">
                        {/* <a class="navbar-brand" href="#home"> */}
                        {/* <img src="images/logo.jpeg" alt="crypto" /> */}
                        {/* <h4 class="logo">Traxfolio</h4> */}
                        {id ? (<h2 className="vcip-id">
                            v-cip id: <span>{id}</span>
                        </h2>) : (null)}
                        {/* </a> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="menu">
                            {/* {id ? (<ul className="nav nav-fill custom-navbar-nav">
                                <li className="nav-item">
                                    <div className="media header-info">
                                        <div className="align-self-center mr-2 header-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                        <div className="media-body">
                                            <p className="banker-name">
                                                Lat: <span>{this.props.InfoRdr.info.custloc?.split(",")[0]}</span>
                                                | Long: <span>{this.props.InfoRdr.info.custloc?.split(",")[1]}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="media header-info">
                                        <div className="align-self-center mr-2 header-icon">
                                            <i className="far fa-clock" />
                                        </div>
                                        <div className="media-body">
                                            <p className="banker-name" style={{ width: "160px" }}>
                                                Time:
                                                <span>{this.state.time}</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item border-right-0">
                                    <div className="media header-info">
                                        <div className="align-self-center mr-2 header-icon red">
                                            <i className="fas fa-video" />
                                        </div>
                                        <div className="media-body">
                                            <p className="banker-name">
                                                Video Recording: <span>ON</span>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>) : (<ul className="nav nav-fill custom-navbar-nav">
                                <li className="nav-item">
                                   
                                </li>
                            </ul>)} */}
                            <ul className="nav nav-fill custom-navbar-nav">
                                <li className="nav-item">

                                </li>
                            </ul>
                            {/* <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                          </form> */}
                            <div className="form-inline">
                                <div className="media banker-info">
                                    <div className="align-self-center mr-2 banker-img">
                                        <img src="../images/Sample_User_Icon.png" alt="no img" />
                                    </div>
                                    <div className="media-body">
                                        <p className="banker-name">
                                            {this.state.username}
                                        </p>
                                        <p className="banker-id">{this.state.role === "1" ? "Treasury Officer/Bank Officer" : "Auditor"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>


            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return {
        InfoRdr
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         FaceMatchAction: (data) => dispatch(FaceMatchAction(data))
//     }
// }

export default connect(mapStateToProps)(Header);
