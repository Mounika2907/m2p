import React, { Component } from 'react'
// import { toast } from 'react-toastify';
import Aux from '../../../hoc/Aux';
import Attachment from '../../../Component/Forms/Attachment/Attachment';
import AttachmentInfo from '../../../Component/Forms/Attachment/AttachmentInfo';
import { connect } from 'react-redux';
import { PanOcrAction, SavePanDataAction, VerifyPanAction, StageUpdateAction } from '../../../Store/Actions/GenerateAction';
import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';
import base64 from 'react-native-base64';
import { Redirect } from 'react-router-dom';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Text } from '../../Language/Language';
import { toast } from 'react-toastify';
import { SytledH5, SytledBUTTON, SytledSPAN } from '../../../hoc/style_component'
const $ = window.$;

class PAN extends Component {
    state = {
        imgPath: null,
        imgInpStatus: true,
        captureStatus: false,
        status: false,
        addClass: "",
        spinner: false,
        edtname: '',
        edtfname: '',
        edtdob: '',
        edtpannumber: '',
        btnDisabled: true,
        rotateVal: 0,
        newdate: '',
        pdfFileStatus: false,
        pwd: '',
        selectPanUpload: '1',
        errMsg: {
            otpErr: ""
        },
        disabledResubmitBtn: false,
        newdata: true,
        captureBackBtn: true,
        // backBtn: false
    }
    componentDidMount() {
        // sessionStorage.setItem("width", "51%");
        // sessionStorage.setItem("step", 3);
        const status = this.props.pincodeRdr.statuses?.panstatus;
        if (status === "0") {
            const stage = {
                height: "51%",
                step: 3
            }
            this.props.StageUpdateAction(stage);
        }
        this.loadScripts();
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            this.props.GetVcipStatusAction();
        }
        // document.querySelector('steps-link');
        if (this.props.PanRdr.PanDetails) {
            this.setState({
                status: false
            });
        }

    }

    loadScripts = () => {
        const dynamicScripts = [
            '/assets/js/script.js',
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }


    capture = () => {
        this.setState({
            imgInpStatus: false,
            captureStatus: true,
            imgPath: "data",
            newdata: false,
            // backBtn: true
        });
    }

    handleChange = (event) => {
        event.preventDefault();
        if (event.target.files) {
            const val = event.target.files.length;
            if (event.target.files[0].type === "application/pdf") {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgInpStatus: false,
                            captureStatus: false,
                            pdfFileStatus: true,
                            imgPath: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }
            } else {
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgInpStatus: false,
                            captureStatus: false,
                            imgPath: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }

            }
        }
    }

    selectPan = (event) => {
        this.setState({
            selectPanUpload: event.target.value
        });
    }


    handlepwd = (event) => {
        event.preventDefault();
        // if (event.target.name === "otpNumber") {
        if (event.target.value.length === 8) {
            this.setState({
                disabled: true,
                spinner: false,
                [event.target.name]: event.target.value,
                errMsg: {
                    otpErr: ""
                }
            });
        }
        else {
            this.setState({
                disabled: false,
                spinner: false,
                [event.target.name]: event.target.value,
                errMsg: {
                    otpErr: "enter 8 character password"
                }
            });
        }
        // }
    }

    reset = () => {
        if (this.state.selectPanUpload == "3") {

            this.setState({
                imgInpStatus: true,
                imgPath: "",
                captureStatus: true,
                pdfFileStatus: false,
                selectPanUpload: "1",
                spinner: false,
            })
        } else {
            this.setState({
                imgInpStatus: true,
                imgPath: "",
                captureStatus: false,
                pdfFileStatus: false,
                selectPanUpload: "1",
                spinner: false,
            })

        }

    }

    // HANDLE FOR EDIT PAN DATA
    editHandle = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    uploadFile = (event) => {
        event.preventDefault();
        const $this = this;
        const { pdfFileStatus, pwd } = this.state;
        if (pdfFileStatus && this.state.imgPath) {
            if (pwd.length === 8) {
                this.setState({
                    spinner: true,
                    captureStatus: this.state.selectPanUpload == "3" ? true : false,
                    disabledResubmitBtn: true,
                });
                const model = {
                    imgPath: this.state.imgPath,
                    password: this.state.pwd
                }
                this.props.PanOcrAction(model, $this);

            } else {
                toast.error("Please enter 8 digit password");
            }
        } else {
            if (this.state.imgPath) {
                this.setState({
                    spinner: true,
                    captureStatus: this.state.selectPanUpload == "3" ? true : false,
                    disabledResubmitBtn: true,
                });

                const model = {
                    imgPath: this.state.imgPath,
                    password: ""
                }
                this.props.PanOcrAction(model, $this);
            } else if (this.state.selectPanUpload == "3") {
                this.setState({
                    imgInpStatus: false,
                    captureStatus: true,
                    imgPath: "data",
                    newdata: false,
                    // backBtn: true

                });
            } else {
                this.setState({
                    spinner: false,
                    disabledResubmitBtn: false
                })
                toast.error("error");
            }
        }
    }

    handleProceed = () => {
        const pannumber = this.props.PanRdr.PanInfo.pannumber;
        const model = {
            edtname: this.state.edtname,
            edtfname: this.state.edtfname,
            edtdob: this.state.edtdob,
            edtpannumber: this.state.edtpannumber,
            pannumber: pannumber
        }
        const $this = this;
        let val = base64.encode(pannumber);
        let val2 = base64.encode(this.state.edtpannumber);
        if (pannumber) {
            if (this.state.edtpannumber) {
                this.props.VerifyPanAction(val2, $this);
            } else {
                this.props.VerifyPanAction(val, $this);
            }
            if (this.state.edtname || this.state.edtfname || this.state.edtdob || this.state.edtpannumber) {
                this.props.SavePanDataAction(model, $this);
            }
        } else {
            if (this.state.edtpannumber) {
                this.props.VerifyPanAction(val2, $this);
                this.props.SavePanDataAction(model, $this);
            } else {
                toast.error("PAN Number can not be empty");
            }
            // if (this.state.edtname || this.state.edtfname || this.state.edtdob || this.state.edtpannumber) {
            //     this.props.SavePanDataAction(model, $this);
            // } 
            // this.setState({
            //     status: false,
            //     imgInpStatus: true,
            //     imgPath: "",
            //     captureStatus: false
            // })

        }
    }

    findReportPAN = () => {
        const addClass = this;
        this.props.PanReportAction(addClass);
        // document.getElementById()
        // $('#attachment').modal('hide')
    }

    dateFormat = (val) => {
        var date = val;
        var newdate = date.split("/").reverse().join("-");
        // return newdate;
        this.setState({
            newdate: newdate
        });
    }

    // ROTATE IMAGE 
    rotateImage = (val) => {
        if (val) {
            this.setState({
                rotateVal: this.state.rotateVal + val
            })
        }
        // const newval = 0;
        $("#rotateImg").css({ 'transform': 'rotate(' + this.state.rotateVal + 'deg)' });
        // $('#rotateImg').animate({ transform: val }, {
        //     step: function (now, fx) {
        //         $(this).css({ 'transform': 'rotate(' + now + 'deg)' });
        //     }
        // });
    }

    handleTakePhoto = (dataUri) => {
        const base64result = dataUri.split(',')[1];
        this.setState({
            imgInpStatus: false,
            imgPath: base64result,
            captureBackBtn: false
        });
    }


    handleNext = () => {
        $('#panDataId').modal('hide');
        $('#panmodal').modal('show');
        setTimeout(() => {
            $('#panmodal').modal('hide');
            sessionStorage.setItem("width", "76%");
            sessionStorage.setItem("step", 4);
            const stage = {
                height: "76%",
                step: 4
            }
            this.props.StageUpdateAction(stage);
            this.props.history.replace('/video-chat');
        }, 3000);
    }

    backBtn = () => {
        window.location.reload();
    }


    handleCameraStart = (event) => {
        console.log(event)
    }


    render() {
        const status = this.props.pincodeRdr.statuses?.panstatus;
        const kycstatus = this.props.pincodeRdr.statuses?.kycstatus;
        const panData = this.props.PanRdr.panData;
        const pannumber = this.props.PanRdr.PanInfo.pannumber;
        const { selectPanUpload, captureStatus, imgInpStatus, pdfFileStatus,
            imgPath, errMsg, addClass, spinner, btnDisabled, newdate, captureBackBtn } = this.state;
        if (kycstatus === "0") {
            return <Redirect to="/start" />
        }

        return (
            <Aux>
                <SytledH5 color={this.props.pincodeRdr.color} className="heading">
                    {/* <h5 className="heading"> */}
                    <Text tid="pan_title" />
                    {/* </h5> */}
                </SytledH5>
                {(status === undefined || status === "0") ? (<Aux>
                    <div className="row justify-content-center">
                        {captureStatus
                            ? <div className="col-md-5 text-center">
                                <Camera
                                    isImageMirror={false}
                                    idealFacingMode = {FACING_MODES.ENVIRONMENT}
                                    onTakePhoto={(dataUri) => { this.handleTakePhoto(dataUri); }}
                                    // onCameraStart={(e) => console.log(e)}

                                />
                                {/* {
                                    <button className="custom-btn justify-content-center m-auto" onClick={this.backBtn}>Back</button>
                                    // captureBackBtn ? <button className="custom-btn justify-content-center m-auto" onClick={this.backBtn}>Back</button> : null
                                } */}

                            </div>
                            : null
                        }
                        {
                            imgPath != "data" ?
                                <Attachment
                                    imgInpStatus={imgInpStatus}
                                    reset={this.reset}
                                    selectImg={this.handleChange}
                                    capture={this.capture}
                                    handlepwd={this.handlepwd}
                                    selectPan={this.selectPan}
                                    selectPanUpload={selectPanUpload}
                                    pdfFileStatus={pdfFileStatus}
                                    captureStatus={captureStatus}
                                    status={this.state.status}
                                    imgSrc={imgPath}
                                    errMsg={errMsg.otpErr}
                                    upload={this.uploadFile}
                                    addClass={addClass}
                                    spinner={spinner}
                                    find={this.findReportPAN}
                                    panInfo={this.props.PanRdr.PanInfo}
                                    btnDisabled={btnDisabled}
                                    rotate={(val) => this.rotateImage(val)}
                                    disabledResubmitBtn={this.state.disabledResubmitBtn}
                                    newdata={this.state.newdata}
                                    color={this.props.pincodeRdr.color}
                                // backBtn={this.state.backBtn}
                                /> : null
                        }

                        {this.state.status === true ?
                            <AttachmentInfo
                                panData={this.props.PanRdr.PanInfo}
                                // edtname={edtname}
                                // edtfname={edtfname}
                                // edtdob={edtdob}
                                // edtpannumber={edtpannumber}
                                date={newdate}
                                spinner={spinner}
                                edit={this.editHandle}
                                proceed={this.handleProceed}
                                color={this.props.pincodeRdr.color}
                            /> : (null)}

                    </div>
                    {
                        captureStatus ?
                            <div className={`${imgPath == "data" || imgPath == "null" ? "text-center" : null}`}>
                                <SytledBUTTON color={this.props.pincodeRdr.color} className="custom-btn m-auto" onClick={this.backBtn} disabled={spinner ? true : false}>Back</SytledBUTTON>
                            </div>
                            : null
                    }

                    <hr className="hr" />

                    <div className="row justify-content-center">
                        <div className="col-md">
                            <div className="instructions sr1 border-right-0 p-0">
                                <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title pl-4">
                                    {/* <h5 className="instructions-title pl-4"> */}
                                    <Text tid="instructions" />
                                </SytledH5>

                                {/* </h5> */}
                                <ul className="instructions-list">
                                    <li>
                                        <Text tid="pan_ins1" />
                                    </li>
                                    <li>
                                        <Text tid="pan_ins2" />
                                    </li>
                                    <li>
                                        <Text tid="pan_ins3" />
                                    </li>
                                    <li>
                                        <Text tid="pan_ins4" />
                                    </li>
                                    <li>
                                        <Text tid="pan_ins5" />
                                    </li>
                                    <li>
                                        <Text tid="pan_ins6" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="instructions sr1 border-right-0 p-0">
                                <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title pl-4">
                                    <Text tid="help" />
                                </SytledH5>
                                <ul className="instructions-list">
                                    <li>
                                        <SytledSPAN color={this.props.pincodeRdr.color} className="qtn-name">Q</SytledSPAN>
                                        <Text tid="pan_qtn" />
                                    </li>
                                    <li>
                                        <SytledSPAN color={this.props.pincodeRdr.color} className="qtn-name">A</SytledSPAN>
                                        <Text tid="pan_ans" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* <button type="button" className="custom-btn" data-toggle="modal" data-target="#panmodal">Proceed</button> */}

                    <div className="modal fade custom-modal" id="panmodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-data">
                                        <img src="./assets/images/success.svg" alt="no img" />
                                        <h1 className="modal-data-title">
                                            <Text tid="pan_success" />
                                        </h1>
                                        <div>
                                            <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                                <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                                <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                    <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                                </circle>
                                            </svg>
                                        </div>
                                        <p className="modal-data-content">
                                            <Text tid="pan_wait" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="panDataId" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="instructions border-right-0">
                                        {panData ? (<div>
                                            <div className="w-75 mx-auto">
                                                <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title text-center pt-4 mb-2">
                                                    NSDL PAN Details
                                                </SytledH5>
                                                <table className="table mx-auto">
                                                    <tbody>
                                                        <tr>
                                                            <td>PAN Number</td>
                                                            <td>{panData?.pannumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Name</td>
                                                            <td>{panData?.panname}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>VALIDATION STATUS :</td>
                                                            <td>
                                                                {panData?.ispanvalid === "VALID"
                                                                    ? <span className="text-success">Valid</span>
                                                                    : <span className="text-danger">Invalid</span>
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                            </div>
                                            <form>
                                                <div className="pb-3 text-center">
                                                    <SytledBUTTON color={this.props.pincodeRdr.color} type="button" onClick={this.handleNext} className="btn custom-btn">
                                                        <Text tid="proceed" />
                                                    </SytledBUTTON>
                                                </div>
                                            </form>
                                        </div>) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Aux>) :
                    (<Redirect to="/video-chat" />)}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { PanRdr, pincodeRdr } = state;
    return {
        PanRdr, pincodeRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        PanOcrAction: (body, $this) => dispatch(PanOcrAction(body, $this)),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        SavePanDataAction: (body, $this) => dispatch(SavePanDataAction(body, $this)),
        VerifyPanAction: (body, $this) => dispatch(VerifyPanAction(body, $this)),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PAN);
