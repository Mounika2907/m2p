import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { ResetRdrAction, ResetEndRdrAction } from '../../Store/Actions/UsersActions/UserActions';
// import { Redirect } from 'react-router-dom';
import { GetVcipStatusAction } from '../../Store/Actions/ProcessAction';
import { StageUpdateAction } from '../../Store/Actions/GenerateAction';
import { Text } from '../Language/Language';
import { SytledH5, SytledBUTTON, SytledH2, Sytledthead, SytledSPAN, SytledH6, SytledSPANBG } from '../../hoc/style_component';
const $ = window.$;

class End extends Component {
    state = {
        intervalId1: undefined
    }
 
    componentDidMount() {
        this.props.ResetEndRdrAction();
        // sessionStorage.setItem("width", "100%");
        // sessionStorage.setItem("step", 5);
        const stage = {
            height: "100%",
            step: 5
        }
        this.props.StageUpdateAction(stage);
        const vcipid = sessionStorage.getItem("vcipid");
        // if (vcipid) {
        //     this.props.GetVcipStatusAction();
        // }

        if (vcipid) {
            this.props.GetVcipStatusAction();
            let intervalId = setInterval(() => {
                this.props.GetVcipStatusAction();
            }, 2000);
            this.setState({ intervalId: intervalId });
        }

        // let intervalId1 = setInterval(() => {
        //     if (this.props.pincodeRdr.statuses?.qastatusus === "2" &&
        //         this.props.pincodeRdr.statuses?.livecapturestatus === "1") {
        //         clearInterval(this.state.intervalId1);
        //     } else {
        //         this.props.GetVcipStatusAction();
        //     }
        // }, 2000);
        // this.setState({ intervalId1: intervalId1 });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId1);
    }


    end = () => {
        $('#end').modal('hide');
        sessionStorage.clear();
        this.props.ResetRdrAction();
        this.props.history.replace("/");
        window.location.reload(true);
        // localStorage.clear("colorcode");
        localStorage.removeItem("colorcode");
        // sessionStorage.clear("colorcode");
        // var app = {
        //     launchApp: function () {
        //         //  const andri =  "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
        //         //  const andri =  "intent://192.168.0.52:5007/#Intent;scheme=http;package=com.syntizen.V_kycwebview;end";
        //         const url = "https://gprtest.quikwallet.com/kyc?status=success"
        //         window.location.replace(url);
        //         //   window.location.replace("com.syntizen.V_kycwebview://share?");
        //         // this.props.history.replace("com.syntizen.V_kycwebview://")
        //         this.timer = setTimeout(this.openWebApp, 3000);
        //     },

        //     openWebApp: function () {
        //         window.location.replace("https://gprtest.quikwallet.com/kyc?status=success");
        //     }
        // };

        // app.launchApp();
    }



    inComplete = () => {
        sessionStorage.setItem("width", "76%");
        sessionStorage.setItem("step", 4);
        const stage = {
            height: "76%",
            step: 4
        }
        this.props.StageUpdateAction(stage);
        this.props.history.replace("/video-chat");
    }

    render() {
        const vcip = sessionStorage.getItem("vcipid");
        const status = this.props.pincodeRdr.statuses?.vcipidstatus;
        const kycstatus = this.props.pincodeRdr.statuses?.kycstatus;
        const panstatus = this.props.pincodeRdr.statuses?.panstatus;
        const videoconfstatus = this.props.pincodeRdr.statuses?.videoconfstatus;
        const qastatusus = this.props.pincodeRdr.statuses?.qastatusus;
        const livecapturestatus = this.props.pincodeRdr.statuses?.livecapturestatus;
        const clientname = sessionStorage.getItem("clientname");

        if (status === "2" || status === "4" || status === "5") {
            // approve
            // const url = "https://gprtest.quikwallet.com/kyc?status=success"
            // window.location.replace(url);

            var app = {
                launchApp: function () {
                    //  const andri =  "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
                    //  const andri =  "intent://192.168.0.52:5007/#Intent;scheme=http;package=com.syntizen.V_kycwebview;end";
                    const url = "https://gprtest.quikwallet.com/kyc?status=success"
                    window.location.replace(url);
                    //   window.location.replace("com.syntizen.V_kycwebview://share?");
                    // this.props.history.replace("com.syntizen.V_kycwebview://")
                    this.timer = setTimeout(this.openWebApp, 3000);
                },

                openWebApp: function () {
                    window.location.replace("https://gprtest.quikwallet.com/kyc?status=success");
                }
            };

            app.launchApp();

        } else if (status === "3" || status == "-3") {
            // alert("failed")
            // reject
            // const url = "https://gprtest.quikwallet.com/kyc?status=failed"
            // window.location.replace(url);
            var app = {
                launchApp: function () {
                    //  const andri =  "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";
                    //  const andri =  "intent://192.168.0.52:5007/#Intent;scheme=http;package=com.syntizen.V_kycwebview;end";
                    const url = "https://gprtest.quikwallet.com/kyc?status=failed"
                    window.location.replace(url);
                    //   window.location.replace("com.syntizen.V_kycwebview://share?");
                    // this.props.history.replace("com.syntizen.V_kycwebview://")
                    this.timer = setTimeout(this.openWebApp, 3000);
                },
    
                openWebApp: function () {
                    window.location.replace("https://gprtest.quikwallet.com/kyc?status=failed");
                }
            };
    
            app.launchApp();
    

        }
        var content = '';
        if (status === "2") {
            content = 'Thank You for completing the Video-KYC process with us. Your V-CIP ID ' + vcip + ' has been approved by our Banker. We are waiting for the approval from Auditor for your V-CIP ID. We will share the final status soon.'
        } else if (status === "3") {
            content = 'We regret to inform you that your V-CIP ID ' + vcip + ' has been Rejected by our Banker. We request you to reinitiate the process with all the correct details.'
        }
        else if (status === "4") {
            content = 'The final approval for Your V-CIP ID ' + vcip + ' has been received from Auditor.'
        }
        else if (status === "5") {
            content = 'We regret to inform you that your V-CIP ID ' + vcip + ' has been Rejected by our Auditor. We request you to reinitiate the process with all the correct details.'
        }
        else if (status === "-2") {
            content = 'Your V-CIP ID ' + vcip + ' has been rejected by our Banker due to Incorrect details. We request you to Re-register with the same Mobile number and  initiate the new process with all the correct details. You can access to V-CIP process through'
        }
        else {
            if (kycstatus === "1" && panstatus === "1" && videoconfstatus === "3" && qastatusus === "2" && livecapturestatus === "1") {
                content = `Thank You for completing the Video-KYC process with ${clientname} Bank. We are waiting for the Approval from Banker and Auditor for your V-CIP ID.  The final status for your V-CIP ID will be shared to you Via SMS on your registered mobile number. You can revisit to the same web-link anytime to check the updated status.`
            }
            else {
                content = 'Your Video-KYC is incomplete, please continue the session and complete the process.'
            }
        }




        return (
            <Aux>
                <SytledH5 color={this.props.pincodeRdr.color} className="heading">
                    <Text tid="end_title" />
                </SytledH5>
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="end">
                            <table className="table end-table">
                                <Sytledthead color={this.props.pincodeRdr.color} className="end-thead">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">
                                            <Text tid="stage" />
                                        </th>
                                        <th scope="col">
                                            <Text tid="status" />
                                        </th>
                                        {/* <th scope="col">Handle</th> */}
                                    </tr>
                                </Sytledthead>
                                <tbody>
                                    {/* <tr className="end-tr">
                                        <td>1</td>
                                        <td>VCIP ID Status</td>
                                        <td>
                                            {this.props.pincodeRdr.statuses?.vcipidstatus === "0" ?
                                                (<span className="danger"><i className="far fa-times-circle"></i></span>) :
                                                (<span className="success"><i className="far fa-check-circle" /></span>)
                                            }
                                        </td>
                                    </tr> */}
                                    <tr className="end-tr">
                                        <td>1</td>
                                        <td>
                                            <Text tid="aadhar_verification" />
                                        </td>
                                        <td>
                                            {kycstatus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="failed" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="successful" />
                                                </span>)}
                                        </td>
                                    </tr>
                                    <tr className="end-tr">
                                        <td>2</td>
                                        <td>
                                            <Text tid="pan_verification" />
                                        </td>
                                        <td>
                                            {panstatus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="failed" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="successful" />
                                                </span>)}
                                        </td>
                                    </tr>
                                    {/* <tr className="end-tr">
                                        <td>5</td>
                                        <td>Video Conference Status</td>
                                        <td>
                                            {this.props.pincodeRdr.statuses?.videoconfstatus === "0" ?
                                                (<span className="danger"><i className="far fa-times-circle"></i></span>) :
                                                (<span className="success"><i className="far fa-check-circle" /></span>)
                                            }
                                        </td>
                                    </tr> */}
                                    <tr className="end-tr">
                                        <td>3</td>
                                        <td>
                                            <Text tid="qtn_ans" />
                                        </td>
                                        <td>
                                            {qastatusus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="completed" />
                                                </span>)}
                                        </td>
                                    </tr>
                                    <tr className="end-tr">
                                        <td>4</td>
                                        <td>
                                            <Text tid="photo_capture" />
                                        </td>
                                        <td>
                                            {livecapturestatus === "0" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                (<span className="success">
                                                    <Text tid="completed" />
                                                </span>)
                                            }
                                        </td>
                                    </tr>
                                    <tr className="end-tr">
                                        <td>5</td>
                                        <td>
                                            <Text tid="banker_remark" />
                                        </td>
                                        <td>
                                            {status === "1" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                (status === "2" || status === "4" || status === "5") ? (<span className="success">
                                                    <Text tid="approved" />
                                                </span>) :
                                                    (status === "3" ? (<span className="danger">
                                                        <Text tid="rejected" />
                                                    </span>) : (<span className="warning">
                                                        <Text tid="pending" />
                                                    </span>))
                                            }
                                        </td>
                                    </tr>
                                    <tr className="end-tr">
                                        <td>6</td>
                                        <td>
                                            <Text tid="auditor_remark" />
                                        </td>
                                        <td>
                                            {status === "2" ?
                                                (<span className="warning">
                                                    <Text tid="pending" />
                                                </span>) :
                                                status === "4" ? (<span className="success">
                                                    <Text tid="approved" />
                                                </span>) :
                                                    (status === "5" ? (<span className="danger">
                                                        <Text tid="rejected" />
                                                    </span>) : (<SytledSPAN color={this.props.pincodeRdr.color} className="text-info">
                                                        <Text tid="waiting" />
                                                    </SytledSPAN>))
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <button type="button" data-toggle="modal" data-target="#end" className="btn custom-btn mr-2">Home</button> */}


                        {
                            (kycstatus === "1" &&
                                panstatus === "1" &&
                                videoconfstatus === "3" &&
                                qastatusus === "2" &&
                                livecapturestatus === "1") ?
                                (<Aux>
                                    {/* <h4 className="text-success text-center">
                                        Agent has ended the Video Conference
                                    </h4> */}
                                    <div className="text-center mb-4">
                                        <SytledBUTTON color={this.props.pincodeRdr.color} type="button" data-toggle="modal" data-target="#end" className="btn custom-btn">
                                            <Text tid="close" />
                                        </SytledBUTTON>
                                    </div>
                                </Aux>) :
                                (<Aux>
                                    {/* <h4 className="text-warning text-center">
                                        Please complete Video KYC
                                    </h4> */}
                                    <div className="text-center mb-4">
                                        {/* <button type="button" onClick={this.inComplete} className="btn custom-btn">Re-join</button> */}
                                        <SytledBUTTON color={this.props.pincodeRdr.color} type="button" data-toggle="modal" data-target="#end" className="btn custom-btn mr-2">
                                            <Text tid="close" />
                                        </SytledBUTTON>
                                    </div>
                                </Aux>)
                        }

                    </div>
                </div>

                <div className="modal fade" id="end" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "50%" }} role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="instructions border-right-0">
                                    <h6 className="instructions-title pl-0 text-center text-dark">
                                        {content}
                                    </h6>
                                    <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title pl-0 text-center">
                                        <Text tid="end_content2" />
                                        <SytledSPANBG color={this.props.pincodeRdr.color} className="badge badge-primary ml-2"> {vcip}</SytledSPANBG>
                                    </SytledH5>
                                    <div className="text-center">
                                        <SytledBUTTON color={this.props.pincodeRdr.color} type="button" onClick={this.end} className="btn custom-btn mt-3">
                                            <Text tid="close" />
                                        </SytledBUTTON>
                                    </div>
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
    const { pincodeRdr } = state;
    return { pincodeRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ResetRdrAction: () => dispatch(ResetRdrAction()),
        ResetEndRdrAction: () => dispatch(ResetEndRdrAction()),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(End);
