import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { GetQuestionsAction, UpdateBothAction, SubmitQuestionsAction, GetInfoAction } from '../../Store/Actions/DetailsAction';
import AuditFormCmp from '../../Component/Forms/AuditFormCmp/AuditFormCmp';
import Axios from 'axios';
import { toast } from 'react-toastify';
import AES256 from 'aes-everywhere';
import base64 from 'react-native-base64';
// import Pdf from "react-to-pdf";

const $ = window.$;

const ref = React.createRef();


const parsingData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const encrypted = AES256.encrypt(JSON.stringify(data), finalvalue);
    return encrypted;
}

const extractData = (data) => {
    var passphrase = process.env.REACT_APP_API_KEY;
    let val1 = passphrase.substr(0, 4);
    let val2 = passphrase.substr(passphrase.length, 4);
    let updatedValue = val1 + passphrase + val2;
    const finalvalue = base64.encode(updatedValue).substr(0, 32);
    const decrypted = AES256.decrypt(data, finalvalue);
    return decrypted;
}

class Audit extends Component {
    state = {
        remarkall: '',
        signleRemark: '',
        remark1: '',
        remark2: '',
        remark3: '',
        remark4: '',
        remark5: '',
        videoUrl: undefined
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        sessionStorage.setItem("vcipid", id)
        if (id) {
            this.props.GetQuestionsAction(id);
            this.props.GetInfoAction(id);
        }
        // this.getVcipVideo(id);
    }

    componentWillUnmount() {
        let id = this.props.match.params.id;
        if (id) {
            this.props.GetQuestionsAction(id);
        }
    }

    getVcipVideo = (id) => {
        const headers = {
            'Content-Type': 'application/json',
        }
        Axios.post(process.env.REACT_APP_VIDEO_API + "/getlatestvideo/" + id,
            { headers: headers }
        ).then((res) => {
            const response = JSON.parse(JSON.parse(extractData(res.data.data)));
            if (response.status === 404) {
                toast.warn(response.message)
                return
            }
            this.setState({
                videoUrl: response.url
            });
        }).catch(err => {
            toast.warn(err)
        })
    }

    // FOR SiNGLE REMORK
    handleSignleRemark = (event) => {
        event.preventDefault();
        // this.setState({
        //     [event.target.name]: event.target.value
        // });
        this.setState({
            signleRemark: event.target.value
        });
    }

    // FOR ALL REMORK
    handleRemarks = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // SINGLE ACCEPT
    acceptAll = () => {
        const model = {
            status: "4",
            remarks: this.state.remarkall
        };
        const $this = this.props.history;
        this.props.UpdateBothAction(model, $this);
        this.setState({
            remarkall: ''
        });
    }

    // SINGLE ACCEPT
    rejectAll = () => {
        const model = {
            status: "5",
            remarks: this.state.remarkall
        };
        const $this = this.props.history;
        this.props.UpdateBothAction(model, $this);
        this.setState({
            remarkall: ''
        });
    }

    acceptSingle = (val) => {
        // if (val.quesid === "1") {
        //     var remarkVal = this.state.remark1
        // } else if (val.quesid === "2") {
        //     var remarkVal = this.state.remark2
        // } else if (val.quesid === "3") {
        //     var remarkVal = this.state.remark3
        // } else if (val.quesid === "4") {
        //     var remarkVal = this.state.remark4
        // } else if (val.quesid === "5") {
        //     var remarkVal = this.state.remark5
        // }
        const model = {
            quesid: val.quesid,
            status: "1",
            remarks: this.state.signleRemark
        }
        this.props.SubmitQuestionsAction(model);
        this.setState({
            signleRemark: ""
        });
    }

    rejectSignle = (val) => {
        // if (val.quesid === "1") {
        //     var remarkVal = this.state.remark1
        // } else if (val.quesid === "2") {
        //     var remarkVal = this.state.remark2
        // } else if (val.quesid === "3") {
        //     var remarkVal = this.state.remark3
        // } else if (val.quesid === "4") {
        //     var remarkVal = this.state.remark4
        // } else if (val.quesid === "5") {
        //     var remarkVal = this.state.remark5
        // }
        const model = {
            quesid: val.quesid,
            status: "0",
            remarks: this.state.signleRemark
        }
        this.props.SubmitQuestionsAction(model);
        this.setState({
            signleRemark: ""
        });
    }

    videoTime = (time) => {
        // console.log(time);
        let gettime = time.split(":");
        const min = parseInt(gettime[0]) * 60;
        const sec = parseInt(gettime[1]);
        const totalSeconds = min + sec;
        const videoTag = document.getElementById("videoId");
        videoTag.currentTime = totalSeconds;
    }


    render() {
        let id = this.props.match.params.id;
        let data = this.props.InfoRdr.videourl;
        console.log(data)

        return (
            <Aux>
                <div className="audit">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="audit-video">
                                    {/* <video
                                        // poster={`https://getkyc.syntizen.com:4444/recordings/${id}/${id}.jpg`}
                                        src={this.props.InfoRdr.videourl}
                                        controls></video> */}
                                    {data?.videoconfdetails?.map((res, index) => <video
                                        key={index}
                                        id="videoId"
                                        src={res.videolink}
                                        controls></video>)}

                                    {/* <video
                                        id="videoId"
                                        // poster={this.state.videoUrl}
                                        src={this.state.videoUrl}
                                        controls></video> */}
                                </div>

                                <div className="row m-0">
                                    <div className="col-md-8">
                                        <div className="questions">
                                            <ul className="nav qtn-nav">
                                                <li className="qtn-item">
                                                    <div className="dropdown">
                                                        <button className="qtn-btn qtn-info" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Q</button>
                                                        <div className="dropdown-menu qtn-dropdown dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                            <h3 className="qtn-title">Questions</h3>
                                                            <ol className="qtn-list" type={1}>
                                                                {data.qadetails?.map((qtn, i) => <li key={i}>
                                                                    {qtn.ques}
                                                                    {qtn.status === "0" ? <i className="far fa-times-circle text-danger ml-2"></i> : <i className="far fa-check-circle text-success ml-2" />}
                                                                </li>)}
                                                            </ol>
                                                        </div>
                                                    </div>
                                                </li>
                                                {data.qadetails?.map((qtn, i) => <li className="qtn-item" key={i}>
                                                    {qtn.time ? (

                                                        <button onClick={() => this.videoTime(qtn.time)} className={`qtn-btn`}>
                                                            {/* {qtn.status === "0" ? qtn.quesid : <i className="fas fa-check" />} */}
                                                            {qtn.time}
                                                        </button>
                                                    ) : null}
                                                </li>)
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="audit-form p-0 border-left-0">
                                            <button type="button" className="custom-btn mt-1" data-toggle="modal" data-target="#finish">Finish</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="audit-form" style={{ height: "85vh" }}>
                                    <AuditFormCmp
                                        change={this.handleSignleRemark}
                                        questions={this.props.InfoRdr.questions}
                                        accept={this.acceptSingle}
                                        reject={this.rejectSignle}
                                        showModelData={data}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="finish" tabIndex={-1} role="dialog" aria-labelledby="finishLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" ref={ref} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="finishLabel">Summary Report & Update Status</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

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
                                                    Geo Location
                                                    <span className="text-danger ml-2">Lat: </span> <span>{parseFloat(data.custloc?.split(",")[0]).toFixed(4)}</span>
                                                    | <span className="text-danger">Long: </span> <span>{parseFloat(data.custloc?.split(",")[1]).toFixed(4)}</span>
                                                </p>
                                            </td>
                                            <td>99%</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Face match score between Aadhaar photo and PAN photo:
                                                </td>
                                            <td className="text-primary">
                                                {data.pan_aadhaar_pht_matchlevel ? parseFloat(data.pan_aadhaar_pht_matchlevel).toFixed(2) + "%" : "Pending"}
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
                                                Face Match Score between PAN Card photo and Live Photo:
                                                </td>
                                            <td className="text-primary">
                                                {data.live_pan_pht_matchlevel ? parseFloat(data.live_pan_pht_matchlevel).toFixed(2) + "%" : "Pending"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Liveness confidence Score:
                                            </td>
                                            <td className="text-primary">
                                                {data.livecapturedetails ? data.livecapturedetails.map((res) => {
                                                    return res.livecapturepht_matchlevel
                                                }) + "%" : "Pending"}
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td colSpan="2">
                                                Question and answers session:
                                                                                <ol className="qtn-list" type={1}>
                                                    {data.qadetails?.map((qtn, i) => <li key={i}>
                                                        {qtn.ques}
                                                        {qtn.status === "0" ? <i className="far fa-times-circle text-danger ml-2"></i> : <i className="far fa-check-circle text-success ml-2" />}
                                                    </li>)}
                                                </ol>
                                            </td>
                                        </tr> */}
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
                                                    Agent
                                                </th>
                                                <th className="text-primary">
                                                    Auditor
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.InfoRdr.questions?.map((qtn, i) => <tr key={i}>
                                                {/* {console.log(qtn.ques, qtn.status, 'audit')} */}
                                                <td>
                                                    {/* {i + 1 + ". " + Buffer.from(qtn.ques, "base64").toString()} */}
                                                    {i + 1 + ". " + qtn.ques}
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
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Overall Remark</label>
                                        <textarea
                                            className="form-control"
                                            name="remarkall"
                                            onChange={this.handleRemarks}
                                            // className="form-control audit-inp"
                                            placeholder="Add Comment If Required..." required />
                                    </div>
                                    <div className="video-btn text-right">
                                        <button type="button"
                                            className="btn btn-sm btn-success"
                                            onClick={this.acceptAll}>
                                            Accept
                                        </button>
                                        <button type="button"
                                            className="btn btn-sm btn-outline-danger ml-3"
                                            onClick={this.rejectAll}>
                                            Reject
                                        </button>
                                        {/* <Pdf targetRef={ref} filename="code-example.pdf">
                                            {({ toPdf }) => <button type="button"
                                                className="btn btn-sm btn-outline-success ml-3"
                                                onClick={toPdf}>
                                                Download PDF
                                            </button>
                                            }
                                        </Pdf> */}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade custom-modal" id="success" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img src="../images/success.svg" alt="no img" />
                                    <h1 className="modal-data-title">VCIPID verification successfull</h1>
                                    <div>
                                        <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
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
        GetQuestionsAction: (id) => dispatch(GetQuestionsAction(id)),
        UpdateBothAction: (model, $this) => dispatch(UpdateBothAction(model, $this)),
        SubmitQuestionsAction: (model) => dispatch(SubmitQuestionsAction(model)),
        GetInfoAction: (vcipid) => dispatch(GetInfoAction(vcipid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Audit);