import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import { OtpKycAction, SendOtpAction, PdfKycAction, XmlKycAction, StageUpdateAction, ClearDigiReducker, DigiLockerRequestAction } from '../../../Store/Actions/GenerateAction';
import AadhaarOfflineCmp from '../../../Component/Forms/AadharCmp/AadhaarOfflineCmp';
// import AadhaarOfflinePdfCmp from '../../../Component/Forms/AadharCmp/AadhaarOfflinePdfCmp';
import { toast } from 'react-toastify';
import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';
import { Redirect } from 'react-router-dom';
import { Text } from '../../Language/Language';
import { SytledA, SytledBUTTON, SytledH5, SytledH6, SytledDIV } from '../../../hoc/style_component'
const $ = window.$;

class AadhaarOffline extends Component {
    state = {
        imgPath: '',
        imgPath1: '',
        adrType: '',
        agree: false,
        status: false,
        otpStatus: false,
        statuszip: false,
        disabled: false,
        sharecode: '',
        fileName: '',
        pwd: '',
        errMsg: {
            adrErr: '',
            otpErr: ''
        },
        spinner: false
    }

    componentDidMount() {
        this.loadScripts();
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            this.props.GetVcipStatusAction();
        }
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
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

    // CHANGE HANDLER FOR XML FILE UPLOAD
    handleChange = (event) => {
        event.preventDefault();
        if (event.target.files) {
            if (event.target.files[0].type === "multipart/x-zip" ||
                event.target.files[0].type === "application/zip" ||
                event.target.files[0].type === "application/x-zip-compressed" ||
                event.target.files[0].type === "application/x-zip"
            ) {
                const val = event.target.files.length;
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgPath: ev.target.result.split(',')[1],
                            imgPath1: ""
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }
                this.setState({
                    statuszip: true,
                    fileName: 'xml',
                    sharecode: "",
                    errMsg: { otpErr: "" }
                });
            } else if (event.target.files[0].type === "application/pdf") {
                const val = event.target.files.length;
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgPath1: ev.target.result.split(',')[1],
                            imgPath: ""
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }
                this.setState({
                    status: true,
                    fileName: 'pdf',
                    statuszip: true,
                    sharecode: "",
                    errMsg: { otpErr: "" }
                });
            } else {
                toast.error("Please upload ZIP File or PDF FIle")
            }
        } else {

        }
    }

    // CHANGE HANDLER FOR PDF FILE UPLOAD
    handleChangePdf = (event) => {
        event.preventDefault();
        if (event.target.files) {
            if (event.target.files[0].type === "application/pdf") {
                const val = event.target.files.length;
                for (let i = 0; i < val; i++) {
                    let reader = new FileReader();
                    reader.onload = function (ev) {
                        this.setState({
                            imgPath1: ev.target.result.split(',')[1]
                        })
                    }.bind(this);
                    reader.readAsDataURL(event.target.files[i]);
                }
                this.setState({
                    status: true
                });
            } else {
                toast.error("Please upload PDF File")
            }
        }
    }

    handleAccept = (event) => {
        // event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });


    }

    // CHANGE HANDLER FOR PASSWORD
    changepwd = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handlepwd = (event) => {
        event.preventDefault();
        if (this.state.fileName === "pdf") {
            this.setState({
                disabled: true,
                [event.target.name]: event.target.value,
                errMsg: {
                    otpErr: "enter 8 character password"

                }
            });
            if (event.target.value.length === 8) {
                this.setState({
                    errMsg: {
                        otpErr: ""

                    }
                })
            }
        } else {
            this.setState({
                disabled: true,
                [event.target.name]: event.target.value,
                errMsg: {
                    otpErr: "enter 4 character password"
                }
            });
            if (event.target.value.length === 4) {
                this.setState({
                    errMsg: {
                        otpErr: ""

                    }
                })
            }

        }
    }

    zipSubmit = (event) => {
        event.preventDefault();
        if (this.state.fileName === "pdf") {
            if (this.state.sharecode.length <= 8) {
                $('#xml').modal('show');
                $('#xml').modal({
                    keyboard: false
                });
            } else (
                toast.error("Please Enter 8 character pass")
            )

        } else {
            if (this.state.sharecode.length >= 4) {
                $('#xml').modal('show');
                $('#xml').modal({
                    keyboard: false
                });
            } else (
                toast.error("Please Enter 4 character pass")
            )
        }

    }
    xmlSubmit = (event) => {
        event.preventDefault();
        if (this.state.agree) {
            this.setState({
                spinner: true
            })
            if (this.state.fileName === "xml") {
                const model = {
                    data: this.state.imgPath,
                    sharecode: this.state.sharecode
                }
                const $this = this;
                this.props.XmlKycAction(model, $this);
            } else if (this.state.fileName === "pdf") {
                const model = {
                    data: this.state.imgPath1,
                    pwd: this.state.sharecode
                }
                const $this = this;
                this.props.PdfKycAction(model, $this);
            }
        } else {
            toast.error("Please accept the conditions")
        }
    }

    pdfSubmit = (event) => {
        event.preventDefault();
        const model = {
            data: this.state.imgPath1,
            pwd: this.state.pwd
        }
        const $this = this;
        this.props.PdfKycAction(model, $this);
        // this.setState({
        //     status: true,
        //     aadharPattern: ''
        // });
    }


    handleProceed = () => {
        if (this.props.PanRdr.KYCDetails.kycstatus == '1') {
            $('#xmlInfo').modal('hide');
            $('#aadharofflineCompletemodal').modal('show');
            this.props.ClearDigiReducker();
            setTimeout(() => {
                $('#aadharofflineCompletemodal').modal('hide');
                sessionStorage.setItem("width", "51%");
                sessionStorage.setItem("step", 3);
                const stage = {
                    height: "51%",
                    step: 3
                }
                this.props.StageUpdateAction(stage);
                this.props.history.push('/pan');
            }, 5000);
        }

    }

    back = () => {
        this.props.history.push('/start');
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

    fetchDigiLocker = (e) => {
        e.preventDefault();
        this.props.DigiLockerRequestAction();
    }


    render() {
        const status = this.props.pincodeRdr?.statuses?.kycstatus;
        return (
            <Aux>
                <SytledH5 color={this.props.pincodeRdr.color} className="heading">

                    <Text tid="offline_title" />

                    <SytledBUTTON color={this.props.pincodeRdr.color} type="button" onClick={this.play} className="btn btn-primary float-right" data-toggle="modal" data-target="#tutorial">
                        <Text tid="video" />

                    </SytledBUTTON>
                </SytledH5>

                <div className="row justify-content-center w-100">
                    <div className="col-md-6 p-0">
                        <AadhaarOfflineCmp
                            errors={this.state.errMsg}
                            filename={this.state.fileName}
                            statuszip={this.state.statuszip}
                            zipSubmit={this.zipSubmit}
                            agree={this.state.agree}
                            disabled={this.state.disabled}
                            change={this.handleChange}
                            handlepwd={this.handlepwd}
                            handleAccept={this.handleAccept}
                            xmlSubmit={this.xmlSubmit}
                            spinner={this.state.spinner}
                            sharecode={this.state.sharecode}
                            fetchDigiLocker={this.fetchDigiLocker}
                            digilockr={this.props.PanRdr?.DigiLockerRequestReducker}
                            digilockrStatus={this.props.PanRdr?.DigiLockerStatusReducker}
                            naviagtePan={this.props.history}
                            color={this.props.pincodeRdr.color}
                        />
                    </div>
                </div>

                <div className="aadhaar-link-box" data-toggle="tooltip" data-placement="top" title="Learn to perform Offline KYC">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-10 p-0">
                            <div className="d-flex align-items-center my-4">
                                <div>
                                    <SytledH6 color={this.props.pincodeRdr.color} className="instructions-title pr-2 my-1">
                                        {/* <h6 className="instructions-title pr-2 my-1" style={{ color: "#414DD3" }}> */}
                                        <Text tid="dont_have" />
                                        {/* </h6> */}
                                    </SytledH6>
                                </div>
                                <div>
                                    <p>
                                        <SytledA color={this.props.pincodeRdr.color} href="https://resident.uidai.gov.in/offline-kyc" rel="noopener noreferrer" className="pr-2" target="_blank">
                                            <Text tid="click_here" />
                                        </SytledA>
                                        <Text tid="download_xml" />
                                    </p>

                                    <p>
                                        <SytledA color={this.props.pincodeRdr.color} href="https://eaadhaar.uidai.gov.in/" rel="noopener noreferrer" className="pr-2" target="_blank">
                                            <Text tid="click_here" />
                                        </SytledA>
                                        <Text tid="download_pdf" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="hr" />
                <div className="row justify-content-center w-100">
                    <div className="col-md-7 instructions border-0 py-2">
                        <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title text-center">
                            <Text tid="help_center" />
                        </SytledH5>
                    </div>
                </div>
                {(status === undefined || status === "0") ? (<div className="mx-auto position-relative" style={{ width: "90%" }}>
                    <SytledDIV color={this.props.pincodeRdr.color} className="or">
                        <Text tid="OR" />
                    </SytledDIV>
                    <div className="row justify-content-center w-100">
                        <div className="col-md-6 p-0">
                            <div className="instructions sr1">
                                <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title">
                                    <Text tid="ekyc" />
                                </SytledH5>

                                <ul className="instructions-list">
                                    <li>
                                        <Text tid="step1" />
                                        <SytledA color={this.props.pincodeRdr.color} href="https://resident.uidai.gov.in/offline-kyc" className="ml-1">UIDAI</SytledA>
                                    </li>
                                    <li>
                                        <Text tid="step2" />
                                    </li>
                                    <li>
                                        <Text tid="step3" />
                                    </li>
                                    <li>
                                        <Text tid="step4" />
                                    </li>
                                </ul>
                                <p className="instructions-title text-danger text-danger mb-2">
                                    <Text tid="please_note" />
                                </p>
                                <p className="instructions-title  text-dark small">
                                    <Text tid="note1" />
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 p-0">
                            <div className="instructions sr1 border-right-0">
                                <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title">
                                    <Text tid="ekycPdf" />
                                </SytledH5>
                                <ul className="instructions-list">
                                    <li>
                                        <Text tid="step1" />
                                        <SytledA color={this.props.pincodeRdr.color} href="https://eaadhaar.uidai.gov.in/#/" className="ml-2">UIDAI</SytledA>
                                    </li>
                                    <li>
                                        <Text tid="step5" />
                                    </li>
                                    <li>
                                        <Text tid="step3" />
                                    </li>
                                    <li>
                                        <Text tid="step6" />
                                    </li>
                                </ul>
                                <p className="instructions-title text-danger text-danger mb-2">
                                    <Text tid="please_note" />
                                </p>
                                <p className="instructions-title  text-dark small">
                                    <Text tid="note2" />
                                </p>

                            </div>
                        </div>

                    </div>
                </div>) :
                    (<Redirect to="/pan" />)}
                <SytledBUTTON color={this.props.pincodeRdr.color} onClick={this.back} className="custom-btn">
                    <Text tid="back" />
                </SytledBUTTON>



                <div className="modal fade" id="xmlInfo" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered custom-model-adr" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title text-center pt-4">
                                        <Text tid="adr_details" />
                                    </SytledH5>
                                    {/* {
                                        this.props.PanRdr.KYCDetails
                                    } */}

                                    {/* {this.props.PanRdr.KYCDetails ? (<div> */}
                                    {this.props.PanRdr.KYCDetails.kycdetails ? (<div>
                                        <div className="w-75 mx-auto">

                                            <div className="text-center">
                                                <img src={this.props.PanRdr.KYCDetails.kycdetails?.pht ? `data:image/png;base64,${this.props.PanRdr.KYCDetails.kycdetails?.pht}` : null}
                                                    className="text-center mb-3" alt="aadhaar" style={{ width: "90px" }} />
                                            </div>

                                            <table className="table mx-auto">
                                                <tbody>
                                                    {/* <tr>
                                                        <td>Masked UID</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.uid}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>D.O.B</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.dob}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Address</td>
                                                        <td>{this.props.PanRdr.KYCDetails.kycdetails?.address}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>SIGNATURE VALIDATION STATUS :</td>
                                                        <td>
                                                            {this.props.PanRdr.DigiLockerStatusReducker?.kycstatus === "1" ? (
                                                                <span className="text-success">Valid</span>
                                                            ) : (
                                                                <span className="text-danger">Invalid</span>
                                                            )}
                                                            <input type="checkbox"
                                                                checked={this.props.PanRdr.KYCDetails?.kycstatus === "1" ? true : false}
                                                                className="custom-control-input" disabled />
                                                        </td>
                                                    </tr> */}
                                                </tbody>
                                            </table>

                                        </div>
                                        <form>
                                            <div className="pb-3 text-center">
                                                <SytledBUTTON color={this.props.pincodeRdr.color} type="button" onClick={this.handleProceed} className="btn custom-btn">
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

                <div className="modal fade custom-modal" id="aadharofflineCompletemodal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                    <h1 className="modal-data-title">Aadhaar verification successfull</h1>
                                    <div>
                                        <svg width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                            <circle fill="none" stroke="#fff" strokeWidth={4} cx={50} cy={50} r={44} style={{ opacity: '0.5' }} />
                                            <circle fill="#fff" stroke="#e74c3c" strokeWidth={3} cx={8} cy={54} r={6}>
                                                <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
                                            </circle>
                                        </svg>
                                    </div>
                                    <p className="modal-data-content">
                                        Please wait, We are taking you to the next step
                                    </p>
                                </div>
                            </div>
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
                                    <video src="/assets/images/V-CIP_OKYC-DEMO.3.mp4" id="myVideo" className="w-75 mx-auto" controls></video>
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
    const { PanRdr, pincodeRdr } = state;
    return {
        PanRdr, pincodeRdr
    }
}

const mapsDispatchToProps = (dispatch) => {
    return {
        SendOtpAction: (aadhaarNo, $this) => dispatch(SendOtpAction(aadhaarNo, $this)),
        OtpKycAction: (otp, $this) => dispatch(OtpKycAction(otp, $this)),
        XmlKycAction: (model, $this) => dispatch(XmlKycAction(model, $this)),
        PdfKycAction: (model, $this) => dispatch(PdfKycAction(model, $this)),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),
        DigiLockerRequestAction: () => dispatch(DigiLockerRequestAction()),
        ClearDigiReducker: () => dispatch(ClearDigiReducker()),
    }
}


export default connect(mapStateToProps, mapsDispatchToProps)(AadhaarOffline);
