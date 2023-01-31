import React from 'react';
import Aux from '../../../hoc/Aux';

const AadharFormCmp = (props) => {
    return (
        <Aux>
            <div className="col-md-5">
                <form className="custom-form sr1" onSubmit={props.aadharForm} autoFill={false} autoComplete={false}>
                    <div className="form-group position-relative">
                        <label className="custom-label" htmlFor="aadhaar">
                            Aadhaar Number
                        </label>
                        <input
                            type="tel"
                            className="form-control custom-inp"
                            id="aadhaar"
                            name="aadharno"
                            onChange={props.change}
                            value={props.adrpattern}
                            aria-describedby="emailHelp"
                            placeholder="Enter Aadhaar Number"
                            required
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            {props.errors?.adrErr}
                        </small>
                    </div>
                    <div className="form-group text-center position-relative">
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="sms"
                                name="aadhaar"
                                checked={true}
                                onChange={props.change}
                                className="custom-control-input"
                                required
                            />
                            <label className="custom-control-label" htmlFor="sms">
                                SMS
                            </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                type="radio"
                                id="EMAIL"
                                name="aadhaar"
                                onChange={props.change}
                                className="custom-control-input"
                                required
                            />
                            <label className="custom-control-label" htmlFor="EMAIL">
                                EMAIL
                            </label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="custom-btn">
                            Send OTP
                        </button>
                    </div>
                </form>
                {props.status ? (<form className="custom-form sr1" onSubmit={props.otpSubmit}>
                    <div className="form-group position-relative">
                        {/* <label class="custom-label" for="exampleInputEmail1">Email address</label> */}
                        <input
                            type="number"
                            className="form-control custom-inp"
                            id="otp"
                            name="otpNumber"
                            onChange={props.change}
                            aria-describedby="otp"
                            required
                            placeholder="Enter OTP"
                        />
                        <small id="otp" className="form-text text-danger">
                            {props.errors.otpErr}
                            {/* <span className="float-right">0.{props.timer} sec</span> */}
                        </small>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="custom-btn">
                            Get e-KYC
                        </button>
                    </div>
                </form>) : null}
            </div>

        </Aux>
    )
}

export default AadharFormCmp;
