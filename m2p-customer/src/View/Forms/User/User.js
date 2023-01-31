import React, { Component, useContext } from 'react'
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import {
    MediaPermissionsError,
    // MediaPermissionsErrorType,
    requestMediaPermissions
} from 'mic-check';
import {
    GenerateAction, ExistUserAction,
    SendOtpVcipAction,
    VerifyMobileOtpAction,
    StageUpdateAction,
    LocationAction,
    dynamicColor
} from '../../../Store/Actions/GenerateAction';
import NewUserCmp from '../../../Component/Forms/UserForm/NewUserCmp';
import ExistUserCmp from '../../../Component/Forms/UserForm/ExistUserCmp';
import { toast } from 'react-toastify';
import publicIp from 'public-ip';
import { GetVcipStatusAction, ResetRdrAction } from '../../../Store/Actions/ProcessAction';
import { ColorCodeAction } from '../../../Store/Actions/UsersActions/UserActions'
import { Redirect, Link } from 'react-router-dom';
import LanguageSelector from '../../../Component/Forms/LanguageSelector';
import { Text } from '../../../View/Language/Language';
import queryString from 'query-string';
import base64 from 'react-native-base64';
import AES256 from 'aes-everywhere';
import { SytledH5, SytledLINK, SytledBUTTON, SytledA, StyledRadioBtn, RadioButtonWrapper, SytledINPUT } from '../../../hoc/style_component';
const $ = window.$;



export class User extends Component {
    state = {
        user: 'new',
        lat: '17.387140',
        long: '78.491684',
        ip: '0.0.0.0',
        mobile: '',
        mobileRead: false,
        email: '',
        vcipid: '',
        otpNumber: '',
        status: false,
        spinner: false,
        spinnerOtp: false,
        time: undefined,
        timerStat: false,
        checked: false,
        errMsg: {
            adrErr: '',
            otpErr: '',
            mobileErr: ''
        },
        customername: '',
        themeColor: null,
        // data: {},
        camera: "",
        geolocation: "",
        microphone: "",
        browserErr1: "",
        browserErr2: "",
        // permissions: {
        // }
    }
    // {
    //     "mobile": "9595959591",
    //     "ref2": "229",
    //     "email": "",
    //     "clientname": "Muvin",
    //     "colorcode": "#21fecd"
    // }


    async componentDidMount() {
        sessionStorage.clear();
        this.props.ResetRdrAction();
        // localStorage.setItem("width", "0%");
        // localStorage.setItem("step", 1);        
        if (this.props.location.search) {
            const parsed = queryString.parse(this.props.location.search);
            const data = decodeURI(parsed.d)
            const d = this.extractData(data)
            sessionStorage.setItem("clientname", d.clientname);
            this.props.dynamicColor(d.colorcode);
            if (d.mobile != "") {
                var buttons = document.getElementById("clicker");
                setTimeout(function () {
                    buttons.click()
                })
            }
            if (d.mobile.length >= 10) {
                this.setState({
                    mobile: d.mobile,
                    mobileRead: true,
                    ref1: d.ref1,
                    ref2: d.ref2
                });
            }
        }

        this.loadScripts();
        const vcipid = sessionStorage.getItem("vcipid");
        this.intervalID = setInterval(() => this.tick(), 1000);
        if (vcipid) {
            this.props.GetVcipStatusAction();
        } else {
            $('#info').modal('show');
        }
        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition((this.showPosition));
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // alert(position.coords.latitude, position.coords.longitude);
                    if (position.coords.latitude) {
                        this.setState({
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        });
                        const model = {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        };
                        this.props.LocationAction(model);
                    } else {
                        toast.error("Please enable location")
                    }
                },
                (error) => {
                    // console.log(error);
                    this.setState({
                        browserErr2: error
                    })

                    // alert(error.message);
                    // toast.error(error.message)
                    // window.location.reload(false);
                }, {
                enableHighAccuracy: true
                , timeout: 5000
            });
        } else {
            toast.warn("Geolocation is not supported by this browser.");
        }
        (async () => {
           try{this.setState({
                ip: await publicIp.v4()
            })
        } catch {
            toast.error("Couldn't find you IP")
        }
        })();


        // // this.getMyLocation();
        let geolocation;
        let browserErr1;

        console.log("===========detectDevice", this.detectMobile());
        console.log("===========Chrome", navigator.userAgent.indexOf("Chrome"));
        // await navigator.permissions.query({ name: "geolocation" }).then(function (result) {
        //     geolocation = result.state
        // });

        // this.getLocalStream();
        requestMediaPermissions()
            .then(() => {
                // can successfully access camera and microphone streams
                // DO SOMETHING HERE
            })
            .catch((err) => {
                const { type, name, message } = err;
                // console.log("============type", type, name, message);
                if (type === "SystemPermissionDenied") {
                    // browser does not have permission to access camera or microphone
                    // this.setState({
                    //     browserErr1: "Browser does not have permission to access camera or microphone"
                    // })
                    browserErr1 = "Browser does not have permission to access camera or microphone"
                } else if (type === "UserPermissionDenied") {
                    // user didn't allow app to access camera or microphone
                    // this.setState({
                    //     // browserErr1: "User didn't allow app to access camera or microphone"
                    //     browserErr1: "Please Enable Camera/MicroPhone"
                    // })
                } else if (type === "CouldNotStartVideoSource") {
                    // camera is in use by another application (Zoom, Skype) or browser tab (Google Meet, Messenger Video)
                    // (mostly Windows specific problem)
                    // this.setState({
                    //     browserErr1: name + message
                    // })
                    browserErr1 = name + message
                } else {
                    // not all error types are handled by this library
                }
            });
        navigator.getUserMedia({
            video: true,
            audio: true
        },
            // successCallback
            function (localMediaStream) {
                console.log("=================localMediaStream", localMediaStream);
                // localMediaStream.stop()
                localMediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            },

            // errorCallback
            function (err) {
                console.log("err=================", err);
                browserErr1 = "Please Enable Camera/MicroPhone"
                // if (err === PERMISSION_DENIED) {
                //     // Explain why you need permission and how to update the permission setting
                // }
            }
        );
        if (navigator.userAgent.indexOf("Chrome") != -1 && this.detectMobile()) {
            this.setState({
                // browserErr1: "User didn't allow app to access camera or microphone"
                browserErr1: "Please Enable Camera/MicroPhone"
            })
        }
        this.setState({
            geolocation,
            browserErr1: browserErr1
        })
    }


    // detectDevice = () => {
    //     let isMobile = window.matchMedia || window.msMatchMedia;
    //     if (isMobile) {
    //         let match_mobile = isMobile("(pointer:coarse)");
    //         return match_mobile.matches;
    //     }
    //     return false;
    // }

    detectMobile = () => {
        
        const toMatch = [
            /iPhone/i,
            // /iPad/i,
            /iPod/i,
        ];

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    getLocalStream = () => {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
            window.localStream = stream; // A
            window.localAudio.srcObject = stream; // B
            window.localAudio.autoplay = true; // C
        }).catch(err => {
            console.log("u got an error:" + err)
            this.setState({
                browserErr1: err.name + ": " + err.message
            })
        });
    }

    // getMyLocation = () => {
    //     const location = window.navigator && window.navigator.geolocation;
    //     if (location) {
    //         location.getCurrentPosition((position) => {
    //             // console.log(position);
    //             this.setState({
    //                 lat: position.coords.latitude,
    //                 long: position.coords.longitude,
    //             })
    //         }, (error) => {
    //             toast.warn("Please enable location");
    //             // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
    //         })
    //     }
    // }
    tick() {
        if (this.state.timerStat) {
            // console.log(this.state.time, 'time', this.state.time - 1)
            // console.log(limitTimer, 'sdf')
            if (this.state.time > 0) {
                this.setState({
                    time: this.state.time - 1
                });
            } else {
                // clearInterval(this.intervalID);
                this.setState({
                    timerStat: false
                });
            }
        }
    }
    // showPosition = (position) => {
    //     this.setState({
    //         lat: position.coords.latitude,
    //         long: position.coords.longitude
    //     });
    // }

    componentDidUpdate() {
        if (this.state?.themeColor != null) {
            this.props.ColorCodeAction(this.state.themeColor);
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

    // SELECTING NEW USER OR EXISTING USER
    handleChange = (event) => {
        this.setState({
            user: event.target.value
        });
    }

    extractData = (data) => {
        var passphrase = process.env.REACT_APP_API_KEY;
        let val1 = passphrase?.substr(0, 4);
        let val2 = passphrase?.substr(passphrase.length, 4);
        let updatedValue = val1 + passphrase + val2;
        const finalvalue = base64.encode(updatedValue).substr(0, 32);
        const decrypted = JSON.parse(AES256.decrypt(data, finalvalue));
        return decrypted;
    }

    // FOR NEW USER VALUES
    handleChangeNew = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const val = event.target.value;
        if (name === "mobile") {
            this.setState({
                [name]: val
            });
            const phoneno = /^\d{10}$/;
            // const re = /^[0-9\b]+$/;
            if (val.match(phoneno)) {
                // if (re.test(val)) {
                this.setState({
                    // [name]: val,
                    errMsg: {
                        mobileErr: ''
                    }
                });
            } else {
                this.setState({
                    errMsg: {
                        mobileErr: 'Invalid'
                    }
                });
            }

        }
        //  else {
        //     this.setState({
        //         [name]: val
        //     });
        // }
    }

    // HANDLE FOR OTP
    handleOtp = (event) => {
        event.preventDefault();
        if (event.target.name === "otpNumber") {
            if (event.target.value.length <= 6) {
                this.setState({
                    ...this.state,
                    [event.target.name]: event.target.value,
                    errMsg: {
                        otpErr: ""
                    }
                });
            }
            else {
                this.setState({
                    ...this.state,
                    errMsg: {
                        otpErr: "Error OTP"
                    }
                });
            }
        }
    }

    // FOR OLD USER VALEUS
    handleChangeOld = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // FORM SUBMIT
    NewUser = (event) => {
        event.preventDefault();
        const selected = this.state.user;
        sessionStorage.setItem('limitTimer', 0)


        const model = {
            lat: this.state.lat,
            long: this.state.long
        };
        this.props.LocationAction(model);

        const location = window.navigator && window.navigator.geolocation;
        if (location) {
            location.getCurrentPosition((position) => {
                // console.log(position);
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
                const model = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                };
                this.props.LocationAction(model);
            }, (error) => {
                console.log(error);
                // toast.warn("Please enable location");
                // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' });
            })
        }
        // FOR NEW API CALL
        if (this.state.long) {
            if (selected === "new") {
                if (this.state.mobile && this.state.mobile.length === 10) {
                    // if (this.state.mobile.toString().length <= 10) {
                    this.setState({
                        spinner: true
                    });
                    sessionStorage.setItem("mobile", this.state.mobile);
                    const url = "SendOTP";
                    const model = {
                        mobile: this.state.mobile,
                        custip: this.state.ip,
                        custloc: this.state.lat + "," + this.state.long
                    }
                    const $this = this;
                    this.props.SendOtpVcipAction(url, model, $this);
                    // }
                } else {
                    toast.error("Please Enter 10 Digit number");
                }
                // this.props.GetContentAction();
            } else if (selected === "old") {
                // FOR OLD API CALL
                if (this.state.vcipid || this.state.mobile.toString().length <= 10) {
                    this.setState({
                        spinner: true
                    });
                    const url = "ValidateVCIPID";
                    const model = {
                        vcipid: this.state.vcipid,
                        custip: this.state.ip,
                        custloc: this.state.lat + "," + this.state.long,
                        ref1: this.props.VideoReducer.location
                    }
                    const $this = this;
                    this.props.ExistUserAction(url, model, $this);

                    // this.props.GetContentAction()
                } else {
                    toast.error("Please enter VCIP ID")
                }
            }
        } else {
            toast.error("Please Enable Location or Clear Site settings to enable location")
        }
    }

    // SEND OTP AGAIN
    getOtpAgain = () => {
        let limitTimer = sessionStorage.getItem("limitTimer");
        const mobile = sessionStorage.getItem("mobile");
        if (mobile && limitTimer < 3) {
            const url = "SendOTP";
            const model = {
                mobile: mobile,
                custip: this.state.ip,
                custloc: this.state.lat + "," + this.state.long
            }
            const $this = this;
            this.props.SendOtpVcipAction(url, model, $this);
        } else {
            toast.error("Please Register again.");
        }
    }

    // SUBMIT OTP
    otpSubmit = (event) => {
        event.preventDefault();
        const mobile = sessionStorage.getItem("mobile");
        if (mobile) {
            if (this.state.otpNumber) {
                this.setState({
                    spinnerOtp: true
                });
                const url = "VerifyMobileOTP";
                const model = {
                    otp: this.state.otpNumber,
                    mobile: sessionStorage.getItem("mobile"),
                    custip: this.state.ip,
                    custloc: this.state.lat + "," + this.state.long,
                    ref1: this.props.VideoReducer.location,
                    ref2: this.state.ref2
                }
                const $this = this;
                this.props.VerifyMobileOtpAction(url, model, $this);
            }
        } else {
            toast.error("Please enter mobile number.")
        }
    }

    newProceed = (e) => {
        e.preventDefault();
        $('#newId').modal('hide');
        sessionStorage.setItem("width", "28%");
        sessionStorage.setItem("step", 2);
        const stage = {
            height: "28%",
            step: 2
        }
        this.props.StageUpdateAction(stage);
        this.props.history.replace("/start");
    }


    render() {
        const status = this.props.pincodeRdr?.statuses?.vcipidstatus;
        // console.log("=====this.state", this.state);

        return (
            <Aux>
                <SytledH5 color={this.props.pincodeRdr.color} className="heading clearfix">
                    <Text tid="subtitle" />
                    {/* <SytledLINK to="./assets/images/user-guide_latest.pdf" target="_blank" className="btn btn-primary float-right"> */}
                    <Link to="./assets/images/user-guide_latest.pdf" target="_blank" className="btn btn-primary link_button float-right">
                        <i className="fas fa-book mr-2"></i>
                        <Text tid="user_guide" />
                        {/* </SytledLINK> */}
                    </Link>
                </SytledH5>

                {this.state.browserErr2 || this.state.browserErr1 || !this.state.lat ? <div>
                    {this.state.browserErr1 && <div className="alert alert-danger" role="alert">
                        {this.state.browserErr1}
                    </div>}
                    {(!this.state.lat || this.state.browserErr2) && <div className="alert alert-danger" role="alert">
                        {/* Please  <b>ENABLE</b>  Location */}
                        Please Enable Location
                    </div>}

                </div> : <>

                    {(status === undefined || status === "0") ? (
                        <div>
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="proceed sr1 text-center mt-3 mb-2">
                                        {/* <h3 className="proceed-title">Proceed With</h3> */}
                                        <div className="form-row">
                                            <div className="form-group col-md position-relative">
                                                <label className="custom-label">
                                                    <Text tid="select_language" />
                                                </label>
                                                <LanguageSelector color={this.props.pincodeRdr.color} />
                                            </div>
                                        </div>

                                        <form className="proceed-form">
                                            <div>
                                                <RadioButtonWrapper color={this.props.pincodeRdr.color} className="custom-control custom-radio custom-control-inline">
                                                    {/* <SytledINPUT type="radio" id="new1" name="new" value="new" onChange={this.handleChange} defaultChecked={true} className="custom-control-input" ></SytledINPUT> */}
                                                    <input type="radio" id="new1" name="new" value="new" onChange={this.handleChange} defaultChecked={true} className="custom-control-input" />
                                                    <label className="custom-control-label" htmlFor="new1">
                                                        <Text tid="new_user" />
                                                    </label>
                                                </RadioButtonWrapper>
                                                <RadioButtonWrapper color={this.props.pincodeRdr.color} className="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" id="new2" name="new" value="old" onChange={this.handleChange} className="custom-control-input" />
                                                    <label className="custom-control-label" htmlFor="new2">
                                                        <Text tid="continue_prev" />
                                                    </label>
                                                </RadioButtonWrapper>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                {this.state.user === "new" ?
                                    (<NewUserCmp
                                        changeNew={this.handleChangeNew}
                                        errors={this.state.errMsg}
                                        status={this.state.status}
                                        disable={!this.state.mobile}
                                        mobile={this.state.mobile}
                                        mobileRead={this.state.mobileRead}
                                        disable2={!this.state.otpNumber}
                                        changeotp={this.handleOtp}
                                        spinner={this.state.spinner}
                                        time={this.state.time}
                                        timerStat={this.state.timerStat}
                                        spinnerOtp={this.state.spinnerOtp}
                                        NewUser={this.NewUser}
                                        otpSubmit={this.otpSubmit}
                                        sendAgain={this.getOtpAgain}
                                        ref1={this.state.ref1}
                                        ref2={this.state.ref2}
                                        color={this.props.pincodeRdr.color}
                                    />)
                                    : (<ExistUserCmp
                                        changeOld={this.handleChangeOld}
                                        disable={!this.state.vcipid}
                                        spinner={this.state.spinner}
                                        NewUser={this.NewUser}
                                        color={this.props.pincodeRdr.color}

                                    />)
                                }

                            </div>

                            <hr className="hr" />

                            <div className="row justify-content-center">
                                <div className="col-md-6 p-0">
                                    <div className="instructions sr1">
                                        <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title">
                                            {/* <h5 className="instructions-title"> */}
                                            <Text tid="instructions" />
                                        </SytledH5>
                                        {/* </h5> */}
                                        <ul className="instructions-list">
                                            <li>
                                                <Text tid="ins1" />
                                            </li>
                                            <li>
                                                <Text tid="ins2" />
                                            </li>
                                            <li>
                                                <Text tid="ins3" />
                                            </li>
                                            <li>
                                                <Text tid="ins4" />
                                                <SytledA color={this.props.pincodeRdr.color} href="https://uidai.gov.in/contact-support/have-any-question/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc.html">

                                                    {/* <a href="https://uidai.gov.in/contact-support/have-any-question/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc.html"> */}
                                                    <Text tid="click_here" />
                                                </SytledA>
                                                {/* </a> */}
                                            </li>
                                            <li>
                                                <Text tid="ins5" />
                                            </li>
                                            <li>
                                                <Text tid="ins6" />
                                            </li>
                                            <li>
                                                <Text tid="ins7" />
                                            </li>
                                            <li>
                                                <Text tid="ins8" />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0">
                                    <div className="instructions sr1 border-right-0">
                                        {/* <div className="left-line"></div> */}
                                        <h5 className="instructions-title"> </h5>
                                        <ul className="instructions-list">
                                            <li>
                                                <Text tid="ins9" />
                                            </li>
                                            <li>
                                                <Text tid="ins10" />
                                            </li>
                                            <li>
                                                <Text tid="ins11" />
                                            </li>
                                            <li>
                                                <p className="text-danger">
                                                    <Text tid="please_note" />
                                                </p>
                                                <Text tid="ins12" />
                                                <SytledA color={this.props.pincodeRdr.color} href="https://uidai.gov.in/contact-support/have-any-question/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc.html">
                                                    {/* <a href="https://uidai.gov.in/contact-support/have-any-question/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc.html"> */}
                                                    <Text tid="click_here" />
                                                    {/* </a> */}
                                                </SytledA>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="newId" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content p-4">
                                        <SytledH5 color={this.props.pincodeRdr.color} >
                                            {/* <h5 style={{ color: "#414DD3" }}> */}
                                            <Text tid="generated_vcip" />
                                        </SytledH5>
                                        {/* </h5> */}
                                        <form className="proceed-form w-100 mt-3" >
                                            <div className="form-group position-relative col-md-8 mx-auto ">
                                                <SytledINPUT color={this.props.pincodeRdr.color}
                                                    type="number"
                                                    className="form-control custom-inp text-center"
                                                    required
                                                    readOnly
                                                    value={this.props.VideoReducer?.newId}
                                                />
                                            </div>
                                        </form>

                                        <div className="instructions border-right-0">
                                            <SytledH5 color={this.props.pincodeRdr.color} className="instructions-title pl-0">
                                                {/* <h5 className="instructions-title pl-0"> */}
                                                <Text tid="instructions" />
                                                {/* </h5> */}
                                            </SytledH5>
                                            <ul className="instructions-list pl-4">
                                                <li>
                                                    <Text tid="model_ins1" />
                                                </li>
                                                <li>
                                                    <Text tid="model_ins2" />
                                                </li>
                                            </ul>
                                            <p className="text-danger small">
                                                <Text tid="model_ins3" />
                                            </p>
                                            <div className="text-center">
                                                <SytledBUTTON color={this.props.pincodeRdr.color} type="button" onClick={this.newProceed} className="btn custom-btn">
                                                    {/* <button type="button" onClick={this.newProceed} className="btn custom-btn"> */}
                                                    <Text tid="proceed" />
                                                    {/* </button> */}
                                                </SytledBUTTON>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="modal fade" id="info" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header border-0">
                                        <h1 className="modal-data-title text-center w-100 text-danger mt-0 mb-2">
                                            <Text tid="alert" />
                                        </h1>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-data text-center">
                                            <h4 className="modal-data-content text-primary w-75 mx-auto mb-2" style={{ color: "red" }}>
                                                <Text tid="alert_msg" />
                                            </h4>
                                            <div>
                                                <button type="button" className="btn custom-btn mt-3" data-dismiss="modal">
                                                    <Text tid="proceed" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        </div>) :
                        (<Redirect to="/start" />)}
                </>}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { VideoReducer, pincodeRdr } = state
    return {
        VideoReducer, pincodeRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SendOtpVcipAction: (url, body, $this) => dispatch(SendOtpVcipAction(url, body, $this)),
        VerifyMobileOtpAction: (url, body, $this) => dispatch(VerifyMobileOtpAction(url, body, $this)),
        GenerateAction: (url, body, $this) => dispatch(GenerateAction(url, body, $this)),
        ExistUserAction: (url, body, $this) => dispatch(ExistUserAction(url, body, $this)),
        GetVcipStatusAction: () => dispatch(GetVcipStatusAction()),
        StageUpdateAction: (stage) => dispatch(StageUpdateAction(stage)),
        LocationAction: (model) => dispatch(LocationAction(model)),
        ResetRdrAction: () => dispatch(ResetRdrAction()),
        dynamicColor: (color) => dispatch(dynamicColor(color)),
        // GetContentAction: () => dispatch(GetContentAction())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
