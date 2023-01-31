import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import { connect } from 'react-redux';
import { UserListAction, JoinStatusAction, JoinVideoAction } from '../../Store/Actions/DetailsAction'
const $ = window.$;

class UserList extends Component {
    state = {
        intervalId: undefined,

    }
    componentDidMount() {
        // window.location.reload(true);
        const userid = sessionStorage.getItem("userid");
        sessionStorage.removeItem("vcipid");
        sessionStorage.removeItem("videoconfsessionid");
        const $this = this.props.history;
        if (userid) {
            this.props.UserListAction($this);
            let intervalId = setInterval(() => {
                this.props.UserListAction($this);
            }, 2000);
            this.setState({ intervalId: intervalId });
        }

        // if (this.props.InfoRdr.joinStatus?.status === undefined || this.props.InfoRdr.joinStatus?.status === "0") {
        //     let intervalId = setInterval(() => {
        //         this.props.JoinStatusAction();
        //     }, 3000);
        //     this.setState({ intervalId: intervalId })
        //     // return
        // } 
        // else {
        //     clearInterval(this.state.intervalId)
        // }
    }

    componentWillUnmount() {
        // this.props.UserListAction();
        clearInterval(this.state.intervalId);
        //     if (this.props.match.isExact) {
        //         // custom back button implementation
        //         alert("")
        //         this.props.history.push(this.props.location.pathname);
        //     }
    }
    timedisplay = (time) => {
        const hms = time;
        // in arrary we can use seconds also 
        const [hours, minutes] = hms.split(':');
        const totalSeconds = (hours) + ":" + (minutes);
        return totalSeconds;
    }


    // join = () => {
    //     $('#join').modal('hide');
    //     sessionStorage.setItem("vcipid", this.props.InfoRdr.joinStatus?.vcipid)
    //     this.props.history.push("/customer/" + this.props.InfoRdr.joinStatus?.vcipid)
    // }

    joinCheck = (vcipid, videoconfsessionid) => {
        const $this = this.props.history;
        const model = {
            id: vcipid,
            videoconfsessionid: videoconfsessionid
        }
        this.props.JoinVideoAction($this, model);
    }

    render() {
        // if (this.props.InfoRdr.joinStatus?.status === "1") {
        //     clearInterval(this.state.intervalId)
        // }
        return (
            <Aux>
                <div className="container">
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-10">
                            {this.props.InfoRdr.userList ? (
                                <div className="my-3 p-3 bg-white rounded shadow-sm">
                                    <h6 className="border-bottom border-gray pb-2 mb-0">
                                        VCIP LIST
                                        <span className="float-right">
                                            {this.props.InfoRdr.userList?.vciplistcount}
                                        </span>
                                    </h6>
                                    {/* old code below */}
                                    {/* {this.props.InfoRdr.userList?.vciplist?.map((res, i) => (res?.isscheduled === "0"
                                        ? <div className="media text-muted pt-3" key={i}>
                                            <svg className="bd-placeholder-img mr-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <div>
                                                        <strong className="text-gray-dark">{res.vcipid}</strong>
                                                        <br></br>
                                                        <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Generated on: {res.createdon}</span>
                                                        <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Video call requested on: {res.lastsessionon}</span>
                                                    </div>

                                                    {res?.joinstatus === "1" ? (
                                                        <div style={{ textAlign: "end", }}>
                                                            <button className="btn btn-sm btn-primary" onClick={() => this.joinCheck(res.vcipid, res.videoconfsessionid)} >Join</button>
                                                            <p className="py-2">Customer is waiting since <strong style={{ color: "red" }}>{this.timedisplay(res.wtime)} </strong> (HH:MM:SS)</p>
                                                        </div>

                                                    ) : (
                                                        "Completed"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        : <div className={`media text-muted pt-3 scheduled ${res?.joinstatus === "1" ? '' : ''}`} key={i}>
                                            <div className="schedule-cal">
                                                <i className="far fa-calendar-alt"></i>
                                            </div>
                                            <div className="media-body pb-3 mb-0 small lh-125">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <strong className="text-gray-dark">
                                                        {res.vcipid}
                                                    </strong>
                                                    {res?.joinstatus === "1"
                                                        ? <button className="btn btn-sm btn-primary" onClick={() => this.joinCheck(res.vcipid, res.videoconfsessionid)}>Join</button>
                                                        : <button className="btn btn-sm btn-danger">Scheduled</button>
                                                    }
                                                </div>
                                                <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Generated on: {res.createdon}</span>
                                                <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Video call requested on: {res.lastsessionon}</span>
                                            </div>
                                        </div>
                                    ))} */}




                                    {this.props.InfoRdr.userList?.vciplist?.map((res, i) =>
                                        <div className="media text-muted pt-3" key={i}>
                                            {/* <i className="far fa-calendar-alt"></i> */}
                                            <svg className="bd-placeholder-img mr-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                            {/* <div className="schedule-cal">
                                                <i className="far fa-calendar-alt">
                                                </i>
                                            </div> */}
                                            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                                <div className="d-flex justify-content-between align-items-center w-100">
                                                    <div>
                                                        <strong className="text-gray-dark">{res.vcipid}</strong>
                                                        <br></br>
                                                        <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Generated on: {res.createdon}</span>
                                                        <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Video call requested on: {res.lastsessionon}</span>
                                                    </div>

                                                    {res?.joinstatus === "1" ? (
                                                        <div style={{ textAlign: "end", }}>
                                                            <button className="btn btn-sm btn-primary" onClick={() => this.joinCheck(res.vcipid, res.videoconfsessionid)} >Join</button>
                                                            <p className="py-2">Customer is waiting since <strong style={{ color: "red" }}>{this.timedisplay(res.wtime)} </strong> (HH:MM:SS)</p>
                                                        </div>

                                                    ) : (
                                                        "Completed"
                                                    )}
                                                </div>
                                                {/* <span className="d-block">{res.lastsessionon}</span> */}
                                            </div>
                                        </div>

                                    )}




                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>


                <div className="modal fade custom-modal" id="join" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    {/* <img src="../images/success.svg" alt="no img" /> */}
                                    <h1 className="modal-data-title">
                                        Ready to take Video conferance with
                                        {this.props.InfoRdr.joinStatus?.vcipid}
                                    </h1>

                                    <div className="row justify-content-center">
                                        <div className="col-md-5">
                                            <div className="video-join">
                                                <div className="form-group position-relative">
                                                    <div className="video-join-box">
                                                        M
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="button" className="custom-btn" onClick={this.join}>
                                                        Join Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <svg width="50px" height="50px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                    </div>
                                    {/* <p className="modal-data-content">
                                            Please wait, We are taking you to the next step
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return { InfoRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        UserListAction: ($this) => dispatch(UserListAction($this)),
        JoinStatusAction: () => dispatch(JoinStatusAction()),
        JoinVideoAction: ($this, id) => dispatch(JoinVideoAction($this, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
