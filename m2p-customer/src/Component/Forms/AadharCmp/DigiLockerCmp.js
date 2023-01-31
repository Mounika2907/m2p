import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Aux from '../../../hoc/Aux';
import { ClearDigiReducker, DigiLockerRequestAction, FetchDigiLockerTxnStatusAction } from '../../../Store/Actions/GenerateAction';
import { Text } from '../../../View/Language/Language';
import { SytledBUTTON, SytledBUTTONBOR, CheckButtonWrapper } from '../../../hoc/style_component';
// import { Link } from 'react-router-dom';


const DigiLockerCmp = (props) => {
    const state = useSelector(state => state.PanRdr)
    const dispatch = useDispatch();

    const [newstate, setnewState] = useState();
    const $ = window.$;
    const clientname = sessionStorage.getItem("clientname");

    // var closeWindow;

    useEffect(() => {
        if (props.digilockr.url != undefined) {
            let removeInterval = setInterval(() => {
                dispatch(FetchDigiLockerTxnStatusAction(props.digilockr?.txnid, props.naviagtePan))
            }, 3000)
            return (() => clearInterval(removeInterval))
        } else {
            console.log('first con')
        }
    }, [props.digilockr])

    useEffect(() => {
        dispatch(DigiLockerRequestAction());
    }, [])

    useEffect(() => {
        let newInterval = setInterval(() => {
            // if (Object.keys(props.digilockrStatus).length > 0) {
            //     if (props.digilockrStatus.status == 'Success') {
            //         props?.newstate?.close();
            //         // dispatch(ClearDigiReducker());
            //         $('#xmlInfo').modal({
            //             keyboard: false
            //         });
            //         // navigatePan.push('/pan');

            //     } else if (props.digilockrStatus.status == 'Failed') {
            //         props?.newstate?.close();
            //         dispatch(ClearDigiReducker());
            //         // setTimeout(() => {
            //         // }, 5000);
            //         $('#xmlFailedCase').modal({
            //             keyboard: false
            //         });

            //     }

            // } else {
            //     // console.log('timer')
            // }
        }, 1000)
        return (() => clearInterval(newInterval))

    }, [props.digilockrStatus])


    return (
        <Aux>
            <div className="text-center">
                <form className="custom-form sr1">
                    {/* <form className="custom-form sr1" onSubmit={props.zipSubmit}> */}
                    {/* <div className="form-group position-relative">
                        <label className="custom-label">Step 1</label>
                        <Link to=" https://uidai.gov.in/my-aadhaar/get-aadhaar.html" target="_blank">
                            <div className="upload-img">
                                <h6 className="upload-title">Do not have eAadhaar PDF/XML. Click here to download</h6>
                            </div>
                        </Link>
                    </div> */}

                    {/* <h6 className="">Do not have eKYC XMl</h6>
                    <p>No worries... "Download eKYC XML" from UIDAI website:
                        <a href="https://resident.uidai.gov.in/offline-kyc" rel="noopener noreferrer" className="pl-2" target="_blank">Click Here</a>
                    </p> */}

                    <h3>Fetch From Digi Locker</h3>
                    <div>
                        <SytledBUTTONBOR color={props.color} className="btn sign" onClick={props.fetchDigiLocker}>
                            <img src="./assets/images/favicon-btn-voilet.png" width="25px" className="mr-2 imgvoilet" alt="" />
                            <img src="./assets/images/favicon-btn-white.png" width="25px" className="mr-2 imgwhite d-none" alt="" />
                            Sign in with DigiLocker
                            {props.spinner ? <span className="spinner"></span> : null}
                        </SytledBUTTONBOR>
                    </div>

                    {/* <div className="form-group position-relative">
                        <label className="custom-label">Step 2</label>
                        <div className="upload-img">
                            <h6 className="upload-title">Upload Downloaded Offline KYC UIDAI From My Computer</h6>
                            <p className="upload-subtitle">Lorem Ipsum is simply dummy text of the</p>
                        </div>
                        <small id="emailHelp" className="form-text text-muted">
                            {props.errors?.adrErr}
                        </small>
                    </div> */}

                </form>
            </div>

            <div className="modal fade" id="xml" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "50%" }} role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="instructions border-right-0">
                                <h5 className="instructions-title text-center pt-4 pl-0">User Consent</h5>
                                <div className="w-75 mx-auto">
                                    <p className="text-center py-3">
                                        I, the holder of aadhaar number, here by give my consent to {clientname} technologies name to
                                        Get obtail my offline kyc through
                                        "<span className="text-primary">Paperless eKYC</span>". Entity has informed
                                        That the details will be used only for
                                        <span className="text-primary">test</span>
                                        and will not be shared with any
                                        Other entity/organization
                                    </p>
                                </div>
                                <form onSubmit={props.xmlSubmit}>
                                    <div className="pl-3 d-flex justify-content-center">
                                        <CheckButtonWrapper color={props.color} className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="adr" name="agree" onChange={props.handleAccept} />
                                            <label className="custom-control-label" htmlFor="adr">I agree with all the above mentioned points. </label>
                                            {/* <span className="badge badge-primary">{props.agree ? "Yes" : "No"}</span> */}
                                        </CheckButtonWrapper>
                                    </div>
                                    <div className="pb-3 text-center">
                                        <button type="submit" className="btn custom-btn">
                                            <Text tid="proceed" />
                                            {props.spinner ? <span className="spinner"></span> : null}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Aux>
    )
}

export default DigiLockerCmp;
