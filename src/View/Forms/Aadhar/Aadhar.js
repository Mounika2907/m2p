import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import AadharFormCmp from '../../../Component/Forms/AadharCmp/AadharFormCmp';
import AadharInfoCmp from '../../../Component/Forms/AadharCmp/AadharInfoCmp';
import { connect } from 'react-redux';
import { OtpKycAction, SendOtpAction, StageUpdateAction } from '../../../Store/Actions/GenerateAction';
import { GetVcipStatusAction } from '../../../Store/Actions/ProcessAction';
import base64 from 'react-native-base64';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { Text } from '../../Language/Language';
const $ = window.$;

class Aadhar extends Component {
    state = {
        adrNumber: '',
        aadharno1: '',
        aadharno2: '',
        aadharno3: '',
        aadhaarType: '',
        status: false,
        otpStatus: false,
        aadharPattern: '',
        spinner: false,
        spinner1: false,
        otp: '',
        otpNumber: '',
        timer: 10,
        backDisbale: false,
        errMsg: {
            adrErr: '',
            otpErr: ''
        },
    }
    componentDidMount() {
        this.loadScripts();
        const vcipid = sessionStorage.getItem("vcipid");
        if (vcipid) {
            this.props.GetVcipStatusAction();
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

    // FOR 3 BOXES VALUES
    handleChangeAdr = (event) => {
        event.preventDefault();
        const val = event.target.value;
        const name = event.target.name;
        const num = /^[0-9\b]+$/;
        if (num.test(val)) {
            if (name === "aadharno1") {
                if (val.length <= 4) {
                    this.setState({
                        [name]: val
                    });

                    if (val.length === 4) {
                        $('#adrinp2').focus();
                    }
                }
                //  else {
                //     $('#adrinp2').focus();
                // }
            } else if (name === "aadharno2") {
                if (val.length <= 4) {
                    this.setState({
                        [name]: val
                    });
                    if (val.length === 4) {
                        $('#adrinp3').focus();
                    }
                }
                // else {
                //     $('#adrinp3').focus();
                // }
            } else if (name === "aadharno3") {
                if (val.length <= 4) {
                    // if (val.match(num)) {
                    this.setState({
                        [name]: val
                    });
                    // }
                }
            }
        } else if (val.length === 0) {
            this.setState({
                [name]: val
            });
        }

        // if (event.target.value.length <= 14) {
        //     this.setState({
        //         ...this.state,
        //         // aadharPattern: event.target.value.replace(/[^\d1-9]/g, '').replace(/(.{4})/g, '$1 ').trim()
        //         aadharPattern: event.target.value.replace(/[^\d1-9]/g, '').replace(/(.{4})/g, '$1').trim()
        //     })
        // }

    }

    handleChange = (event) => {
        if (event.target.name === "aadhaarType") {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        if (event.target.name === "otpNumber") {
            if (event.target.value.length <= 6) {
                this.setState({
                    [event.target.name]: event.target.value,
                    errMsg: {
                        otpErr: ""
                    }
                });
            }
            else {
                this.setState({
                    errMsg: {
                        otpErr: "Error OTP"
                    }
                });
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const str1 = this.state.aadharno1;
        const str2 = this.state.aadharno2;
        const str3 = this.state.aadharno3;
        const aadhaarNumberval = `${str1 + '' + str2 + '' + str3}`;
        if (aadhaarNumberval !== '' || this.state.aadhaarType !== '') {
            this.setState({
                spinner: true,
                // status: true,
                // aadharPattern: ''
            });
            const $this = this;
            let val = base64.encode(aadhaarNumberval);
            sessionStorage.setItem("aadhaar", val);
            const model = {
                adrno: val,
                otptype: this.state.aadhaarType
            }
            this.props.SendOtpAction(model, $this);
        } else {
            toast.error("Error")
        }
    }


    // SEND OTP AGAIN
    getOtpAgain = () => {
        const aadhaar = sessionStorage.getItem("aadhaar");
        if (aadhaar) {
            const model = {
                adrno: aadhaar,
                otptype: this.state.aadhaarType
            }
            const $this = this;
            this.props.SendOtpAction(model, $this);
        } else {
            toast.error("Please try again.")
        }
    }

    handleOtp = (event) => {
        event.preventDefault();
        this.setState({
            spinner1: true,
            // otpStatus: true,
        });
        const $this = this;
        let otp = base64.encode(this.state.otpNumber);
        this.props.OtpKycAction(otp, $this);
    }

    handleProceed = () => {
        $('#aadharCompletemodal').modal('show');
        setTimeout(() => {
            $('#aadharCompletemodal').modal('hide');
            sessionStorage.setItem("width", "51%");
            sessionStorage.setItem("step", 3);
            const stage = {
                height: "51%",
                step: 3
            }
            this.props.StageUpdateAction(stage);
            this.props.history.push('/pan');
        }, 3000);
    }

    back = () => {
        this.props.history.push('/start');
    }



    render() {
        const status = this.props.pincodeRdr?.statuses?.kycstatus;

        return (
            <Aux>
                <h5 className="heading">
                    <Text tid="adr_otp_title" />
                </h5>
                {(status === undefined || status === "0") ? (<div className="row" style={{ width: "95%", margin: "0 auto" }}>
                    <AadharFormCmp
                        adrpattern={this.state.aadharPattern}
                        errors={this.state.errMsg}
                        status={this.state.status}
                        aadharno1={this.state.aadharno1}
                        aadharno2={this.state.aadharno2}
                        aadharno3={this.state.aadharno3}
                        change={this.handleChange}
                        changeAdr={this.handleChangeAdr}
                        spinner={this.state.spinner}
                        spinner1={this.state.spinner1}
                        aadharForm={this.handleSubmit}
                        counter={this.state.timer}
                        otpSubmit={this.handleOtp}
                        sendAgain={this.getOtpAgain}
                    />
                    {this.state.otpStatus ? <AadharInfoCmp
                        proceed={this.handleProceed}
                        data={this.props.PanRdr.AadhaarDetails}
                    /> : (
                            <div className="col-md-6">
                                <div className="details sr1 block-disabled">
                                    <h2 className="info-title">
                                        <Text tid="adr_details" />
                                    </h2>

                                    <div className="row m-0">
                                        <div className="col-md-12 p-0">
                                            <div className="table-responsive aadhar-info">
                                                <table className="table info-data mb-0 text-muted">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Text tid="name" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="fname" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="dob" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="adr_number" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="addr" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Text tid="photo" />
                                                            </td>
                                                            <td>-</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button type="button" disabled className="custom-btn">
                                                    <Text tid="proceed" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                </div>) :
                    (<Redirect to="/pan" />)}
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
                <button onClick={this.back} disabled={this.state.backDisbale} className="custom-btn">
                    <Text tid="back" />
                </button>
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
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
    }
}


export default connect(mapStateToProps, mapsDispatchToProps)(Aadhar);
