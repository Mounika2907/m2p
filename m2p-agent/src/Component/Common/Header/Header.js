import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    state = {
        width: '',
        username: '',
        role: '',
        time: new Date().toLocaleString(),
        classes: {
            steps: ''
        },
        time: undefined
    }
    componentDidMount() {
        this.intervaltimer = setInterval(() => this.tick(),
            1000);
        const username = sessionStorage.getItem("username");
        const role = sessionStorage.getItem("role");
        this.setState({
            username: username,
            role: role
        });

    }
    componentWillUnmount() {
        clearInterval(this.intervaltimer);
    }

    tick() {
        const id = sessionStorage.getItem("mySession");
        if (id) {
            // let timer =new Date().getTime(this.props.InfoRdr.time.time).toLocaleString()
            // let timer = new Date().toLocaleString();
            // console.log(timer);

            // timer.getTime();
            // // console.log(timer);
            // this.setState({
            //     time: new Date().toLocaleString()
            // });
            this.setState({
                time: new Date().toLocaleString()
            });
        }
        // console.log(this.state.time);        
    }

    changeCSS = (cssFile, cssLinkIndex) => {

        var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFile);

        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    }


    render() {
        const id = sessionStorage.getItem("vcipid");
        // const location = this.props.InfoRdr.location;

        return (
            <Aux>{/* HEADER */}
                <header>
                    <nav className="navbar navbar-expand-lg">
                        {id ? (<h2 className="vcip-id">
                            v-cip id: <span>{this.props.InfoRdr.info.vcipid}</span>
                        </h2>) : (null)}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="menu">
                            {id ? (<ul className="nav nav-fill custom-navbar-nav">
                                <li className="nav-item">
                                    <div className="media header-info">
                                        <div className="align-self-center mr-2 header-icon">
                                            <i className="fas fa-map-marker-alt" />
                                        </div>
                                        <div className="media-body">
                                            <p className="banker-name">
                                                Lat: <span className="mr-1">{parseFloat(this.props.InfoRdr.info.custloc?.split(",")[0]).toFixed(4)}</span>
                                                | Long: <span>{parseFloat(this.props.InfoRdr.info.custloc?.split(",")[1]).toFixed(4)}</span>
                                            </p>
                                            {/* <p className="banker-id">{location.city + "," + location.state + "," + location.country}</p> */}
                                            <p className="banker-id">{this.props.InfoRdr.info.ref1}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="media header-info">
                                        <div className="align-self-center mr-2 header-icon">
                                            <i className="far fa-clock" />
                                        </div>
                                        <div className="media-body">
                                            <p className="banker-name" style={{ width: "164px" }}>
                                                Time:
                                                <span>{this.state.time}</span>
                                                {/* <span>{this.props.InfoRdr.time.time}</span>  */}
                                                {/* | Date: <span>{this.props.InfoRdr.time.date}</span> */}
                                            </p>
                                            {/* <p class="banker-id">ROAD NO: 45, JUBLIEE HILLS, HYDERABAD</p> */}
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
                                            {/* <p class="banker-id">ROAD NO: 45, JUBLIEE HILLS, HYDERABAD</p> */}
                                        </div>
                                    </div>
                                </li>
                            </ul>) : (<ul className="nav nav-fill custom-navbar-nav">
                                <li className="nav-item">

                                </li>
                            </ul>)}
                            {/* <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                          </form> */}
                            <div className="form-inline">
                                <div className="media banker-info">
                                    <div className="align-self-center mr-2 banker-img">
                                        <img src="../images/sample_icon.png" alt="no img" />
                                    </div>
                                    <div className="media-body">
                                        <p className="banker-name">
                                            {this.state.username}
                                        </p>
                                        <p className="banker-id">{this.state.role === "1" ? "Agent" : "Auditor"}</p>
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
