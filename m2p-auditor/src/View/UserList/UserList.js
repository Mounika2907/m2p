import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import { connect } from 'react-redux';
import { UserListAction, GetInfoAction, GetQuestionsAction, spinnerAction } from '../../Store/Actions/DetailsAction'
import { Link } from 'react-router-dom';
import Pdf from "react-to-pdf";

const $ = window.$;
const ref = React.createRef();

class UserList extends Component {
    state = {
        spinner: false,
        vcipid: null
    };

    componentDidMount() {
        const userid = sessionStorage.getItem("userid");
        sessionStorage.removeItem("vcipid");
        const $this = this.props.history;
        if (userid) {
            this.props.UserListAction();
            let intervalId = setInterval(() => {
                this.props.UserListAction();
            }, 2000);
            this.setState({ intervalId: intervalId });

        }

    }

    componentWillUnmount() {
        // this.props.GetQuestionsAction(id);
        clearInterval(this.state.intervalId);
    }

    play = () => {
        $('#tutorial').modal({
            keyboard: false
        });
    }

    pause = () => {
        var vid = document.getElementById("myVideo");
        vid.pause();
    }

    // getDetailsForPdf = (event) => {
    //     event.preventDefault();
    //     const uniqueID = "01";
    //     const $this = this;
    //     const { id } = event.target;
    //     this.setState({ vcipid: id })
    //     // this.setState({ vcipid: id, spinner: true })
    //     this.props.GetQuestionsAction(id);
    //     $('#aadharCompletemodal').modal('show');
    //     this.props.GetInfoAction(id, uniqueID, $this);
    // }

    render() {
        // const { spinner } = this.props;
        var date = new Date().toLocaleString()
        let data = this.props.InfoRdr.videourl;
        // let spinner = this.props.InfoRdr.spinner;
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
                                    {this.props.InfoRdr.userList?.vciplist?.map((res, i) => (<div className="media text-muted pt-3" key={i}>
                                        <svg className="bd-placeholder-img mr-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <strong className="text-gray-dark">{res.vcipid}</strong>
                                                {/* <a href={``}>Follow</a> */}
                                                {res.auditstatus === "1" ?
                                                    <Link to={`/audit/${res.vcipid}`}>Check</Link>
                                                    : "Completed"
                                                    // <button type="submit" className="btn btn-sm btn-success" onClick={this.getDetailsForPdf} id={res.vcipid} style={{ width: "150px", paddingRight: "4px" }}>
                                                    //     Download PDF
                                                    //     {this.state.spinner && res.vcipid == this.state.vcipid ? <span className="spinner" style={{
                                                    //         right: "3.5%",
                                                    //         top: "92px"
                                                    //     }}></span> : null}
                                                    // </button>
                                                }
                                                {/* {res.auditstatus === "1" ?
                                                    <Link to={`/audit/${res.vcipid}`}>Check</Link>
                                                    : "Completed"
                                                } */}
                                            </div>
                                            {/* <span className="d-block">{res.lastsessionon}</span> */}
                                            <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Generated on: {res.createdon}</span>
                                            <span className="d-block" style={{ marginTop: "2px" }}>VCIP ID Video call requested on: {res.lastsessionon}</span>

                                        </div>
                                    </div>
                                    ))}
                                    {/* <div className="media text-muted pt-3">
                                    <svg className="bd-placeholder-img mr-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <strong className="text-gray-dark">Full Name</strong>
                                            <a href="#">Follow</a>
                                        </div>
                                        <span className="d-block">@username</span>
                                    </div>
                                </div>
                                <div className="media text-muted pt-3">
                                    <svg className="bd-placeholder-img mr-2 rounded" width={32} height={32} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                                    <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <strong className="text-gray-dark">Full Name</strong>
                                            <a href="#">Follow</a>
                                        </div>
                                        <span className="d-block">@username</span>
                                    </div>
                                </div> */}
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>

                <div className="modal fade custom-modal" id="tutorial" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" onClick={this.pause} aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    {/* <img src="./assets/images/success.svg" alt="no img" /> */}
                                    <video src="https://preprodvcip.syntizen.com:4444/recordings/sample_video/sample_video.mp4" id="myVideo" className="w-75 mx-auto" controls></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download PDF */}

                <div className="modal fade" id="finish" tabIndex={-1} role="dialog" aria-labelledby="finishLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" ref={ref} role="document">
                        <div className="modal-content">
                            <div className="modal-header align-items-center">
                                <img src="./images/Seal_of_Odisha.png" alt="no img" widht="50" height="60" />
                                <h5 className="modal-title ml-2" id="finishLabel">Summary Report & Update Status</h5>
                                <br />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-primary" colSpan="2">Generated On: {date}</th>
                                            {/* <th scope="col" className="text-info">Generated On: {data.vcipid}</th> */}
                                            <th scope="col" className="text-primary" colSpan="2">Audited Date: {data.auditedon ? data.auditedon : null} </th>
                                            <th scope="col" className="text-primary" colSpan="2">empty: {data.auditedon ? data.auditedon : null}</th>
                                        </tr>
                                        <tr>
                                            <th scope="col" className="text-primary" colSpan="2">ppoid: {data.ppoid ? data.ppoid : null}</th>
                                            <th scope="col" className="text-primary" colSpan="2">ppo No: {data.ppono ? data.ppono : null} </th>
                                            <th scope="col" className="text-primary" colSpan="2">Tcode: {data.tcode ? data.tcode : null} </th>
                                        </tr>
                                    </thead>
                                </table>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-info">V-CIP ID: {data.vcipid}</th>
                                            <th scope="col" className="text-primary" colSpan="2">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="banker-name">
                                                    Geo Location details of Pensioner
                                                </p>
                                            </td>
                                            <td>

                                                <span className="text-danger ml-2"></span> <span>{parseFloat(data.custloc?.split(",")[0]).toFixed(4)}</span>
                                                ,<span className="text-danger"></span> <span>{parseFloat(data.custloc?.split(",")[1]).toFixed(4)}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Face Match Score between Aadhaar photo and Live Photo:
                                            </td>
                                            <td className="text-primary">
                                                {data.live_aadhaar_pht_matchlevel ? parseFloat(data.live_aadhaar_pht_matchlevel).toFixed(2) + "%" : "Pending"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Face match score between Aadhaar and IFMS Photo:
                                            </td>
                                            <td className="text-primary">
                                                NA
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Face match score between IFMS and Live Photo:
                                            </td>
                                            <td className="text-primary">
                                                NA
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Liveness confidence Score:
                                            </td>
                                            <td className="text-primary">
                                                {
                                                    data.livecapturedetails ? data.livecapturedetails.map((res) => {
                                                        return res.livecapturepht_matchlevel ? res.livecapturepht_matchlevel + "%" : "Pending"
                                                    }) : "Pending"
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Pensioner Name:
                                            </td>
                                            <td className="text-primary">
                                                {data.pensionername}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Treasury officer Name:
                                            </td>
                                            <td className="text-primary">
                                                {data.toname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                District Treasury Code:
                                            </td>
                                            <td className="text-primary">
                                                {data.tocode}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                District Treasury Email:
                                            </td>
                                            <td className="text-primary">
                                                {data.auditorname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Sub Treasury Code:
                                            </td>
                                            <td className="text-primary">
                                                {data.agentcode}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Sub Treasury Email ID:
                                            </td>
                                            <td className="text-primary">
                                                {data.agentname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Treasury Officer/Auditor Code:
                                            </td>
                                            <td className="text-primary">
                                                {data.auditorcode}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Treasury Officer/Auditor Email ID:
                                            </td>
                                            <td className="text-primary">
                                                {data.auditorname}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                                <div className="table-scroll">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th className="text-primary">
                                                    Questions
                                                </th>
                                                <th className="text-primary">
                                                    Treasury Officer/Bank Officer
                                                </th>
                                                <th className="text-primary">
                                                    Treasury Officer/Bank Manager
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.InfoRdr.questions?.map((qtn, i) =>
                                                <tr key={i}>
                                                    <td>
                                                        {i + 1 + ". " + Buffer.from(qtn.ques, "base64").toString()}
                                                    </td>
                                                    <td>
                                                        {qtn.status === "0"
                                                            ? <i className="far fa-times-circle text-danger ml-2"></i>
                                                            : <i className="far fa-check-circle text-success ml-2" />
                                                        }
                                                    </td>
                                                    <td>
                                                        {qtn.astatus === "-1"
                                                            ? <i className="far fa-question-circle text-warning"></i>
                                                            : qtn.astatus === "0"
                                                                ? <i className="far fa-times-circle text-danger"></i>
                                                                : <i className="far fa-check-circle text-success " />
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td>
                                                    TO/Auditor Remark:
                                                </td>
                                                <td className="text-primary">
                                                    {data.auditorremarks}
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Vcip Id Status:
                                                </td>
                                                <td className="text-primary">
                                                    APPROVED
                                                </td>
                                                <td></td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>

                                <form>
                                    {/* <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Overall Remark</label>
                                        <textarea
                                            className="form-control"
                                            name="remarkall"
                                            onChange={this.handleRemarks}
                                            className="form-control audit-inp"
                                            placeholder="Add Comment If Required..." required />
                                    </div> */}
                                    <div className="video-btn text-right">
                                        <br />
                                        {/* <button type="button"
                                            className="btn btn-sm btn-success"
                                            onClick={this.acceptAll}>
                                            Accept
                                        </button>
                                        <button type="button"
                                            className="btn btn-sm btn-outline-danger ml-3"
                                            onClick={this.rejectAll}>
                                            Reject
                                        </button> */}
                                        <Pdf targetRef={ref} filename={`${this.state.vcipid}.pdf`}>
                                            {({ toPdf }) => <button type="button"
                                                className="btn btn-sm btn-outline-success ml-3"
                                                onClick={toPdf}>
                                                Download PDF
                                                {/* {this.state.spinner ? <span className="spinner"></span> : null} */}

                                            </button>
                                            }
                                        </Pdf>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Loader Model */}
                <div className="modal fade custom-modal" id="aadharCompletemodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img src="./images/success.svg" alt="no img" />
                                    <h1 className="modal-data-title">Summary Report</h1>
                                    <div>
                                        <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                    </div>
                                    <p className="modal-data-content">
                                        Please wait, We are taking you to the Summary Report
                                    </p>
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
        GetInfoAction: (vcip, id, $this) => dispatch(GetInfoAction(vcip, id, $this)),
        GetQuestionsAction: (vcip) => dispatch(GetQuestionsAction(vcip)),
        spinnerAction: (spinner) => dispatch(spinnerAction(spinner))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
