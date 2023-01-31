import React from 'react';
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';
import { SytledA, SytledBUTTON, SytledH5, SytledH6, SytledDIV, SytledSMALL, SytledP, SytledSPAN, StyledFile, SytledLabel,SytledINPUT, SytledSELECT1, CheckButtonWrapper } from '../../../hoc/style_component'

// import { Link } from 'react-router-dom';

const AadhaarOfflineCmp = (props) => {
    const clientname = sessionStorage.getItem("clientname");

    return (
        <Aux>
            <div className="">
                <form className="custom-form sr1" onSubmit={props.zipSubmit}>
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

                    <div className="form-group position-relative mt-3">
                        {/* <label className="custom-label">Upload File</label> */}
                        <div className="panupload-inp">
                            <StyledFile
                                color={props.color}
                                type="file"
                                className="form-control panupload-custom-inp"
                                name="aadharno"
                                accept=".zip, .pdf"
                                onChange={props.change}
                                required
                            />
                            <SytledSPAN color={props.color} className="file-icon">
                                {/* <i className="fas fa-paperclip"></i> */}
                                <i className="fas fa-file-upload"></i>
                            </SytledSPAN>
                            <SytledSPAN color={props.color} htmlFor="panname" className="file-icon1">
                                <strong>
                                    <Text tid="drag_drop" />
                                </strong>
                                <Text tid="or" />
                                <strong>
                                    <Text tid="click_file" />
                                </strong>
                            </SytledSPAN>
                        </div>
                        <SytledP color={props.color} className="small text-center" style={{ color: "#414DD3" }}>
                            <span className="text-danger">*</span>
                            <Text tid="upolad_either" />
                        </SytledP>
                        {/* <div className="upload-img">
                            <h6 className="upload-title">Choose file</h6>
                            <input
                                type="file"
                                className="form-control custom-inp upload-file"
                                name="aadharno"
                                accept=".zip"
                                onChange={props.change}
                                required
                            />
                            <span className="file-icon text-white"><i className="fas fa-paperclip"></i></span>
                        </div> */}
                        <SytledSMALL color={props.color} id="emailHelp" className="form-text text-muted">
                            {props.errors?.adrErr}
                        </SytledSMALL>
                    </div>

                    {props.statuszip ? (<div>
                        <div className="form-group position-relative mb-2">
                            <label className="custom-label">
                                <Text tid="zip_password" />
                            </label>
                            {props?.filename === "pdf" ?
                            <SytledINPUT color={props.color}
                            type="password"
                            className="form-control custom-inp w-75"
                            name="sharecode"
                            onChange={props.handlepwd}
                            value={props.sharecode}
                            maxLength="8"
                            required
                            placeholder="Enter Password"
                        />: 
                            <SytledINPUT color={props.color}
                                type="password"
                                className="form-control custom-inp w-75"
                                name="sharecode"
                                onChange={props.handlepwd}
                                value={props.sharecode}
                                maxLength="4"
                                required
                                placeholder="Enter Password"
                            />
                    }
                            {props?.filename === "pdf" ?<small className="form-text text-danger">
                                {props.errors.otpErr}
                            </small>
                            :
                            <small className="form-text text-danger">
                                {props.errors.otpErr}
                            </small>}
                        </div>
                        <div className="text-left mb-3">
                            <SytledBUTTON color={props.color} type="submit" disabled={!props.disabled} className="custom-btn">
                                <Text tid="submit" />
                            </SytledBUTTON>
                        </div>
                    </div>) : null}

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
                                <SytledH5 color={props.color} className="instructions-title text-center pt-4 pl-0">User Consent</SytledH5>
                                <div className="w-75 mx-auto">
                                    <p className="text-center py-3">
                                        I, the holder of aadhaar number, here by give my consent to {clientname}

                                         {/* Syntizen  */}
                                         technologies name to
                                        Get obtail my offline kyc through
                                        "<SytledSPAN color={props.color} className="text-primary">Paperless eKYC</SytledSPAN>". Entity has informed
                                        That the details will be used only for
                                        <SytledSPAN color={props.color} className="text-primary">test</SytledSPAN>
                                        and will not be shared with any
                                        Other entity/organization
                                    </p>
                                </div>
                                <form onSubmit={props.xmlSubmit}>
                                    <div className="pl-3 d-flex justify-content-center">
                                        <CheckButtonWrapper color={props.color} className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="adr" name="agree" onChange={props.handleAccept}  />
                                            <label className="custom-control-label" htmlFor="adr">I agree with all the above mentioned points. </label>
                                            {/* <span className="badge badge-primary">{props.agree ? "Yes" : "No"}</span> */}
                                        </CheckButtonWrapper>
                                    </div>
                                    <div className="pb-3 text-center">
                                        <SytledBUTTON color={props.color} type="submit" className="btn custom-btn">
                                            <Text tid="proceed" />
                                            {props.spinner ? <span className="spinner"></span> : null}
                                        </SytledBUTTON>
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

export default AadhaarOfflineCmp;