import React from 'react'
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';
import {SytledINPUT, SytledSMALL, SytledBUTTON} from '../../../hoc/style_component';


const NewUserCmp = (props) => {
    return (
        <Aux>
            <div className="col-md-4">
                <form className="proceed-form sr1 text-left" id="contactNum" onSubmit={props.NewUser}>
                    <div className="form-row">
                        <div className="form-group col-md position-relative">
                            <label className="custom-label">
                                <Text tid="contact_number" />
                                <span className="text-danger">*</span>
                            </label>
                            {/* <input */}
                            <SytledINPUT
                                color = {props.color}
                                type="number"
                                className="form-control custom-inp"
                                name="mobile"
                                pattern="[1-9]{1}[0-9]{9}"
                                onChange={props.changeNew}
                                autoFocus
                                value={props.mobile}
                                readOnly={props.mobileRead ? true : false}
                                placeholder="Enter Number "
                                required
                            />
                            <SytledSMALL color = {props.color} className="form-text text-primary mt-2 d-block">
                            {/* <small className="form-text text-primary mt-2 d-block"> */}
                                <Text tid="receive_otp" />
                                <span className="text-danger">{props.errors.mobileErr}</span>
                            {/* </small> */}
                            </SytledSMALL>
                        </div>
                    </div>
                    <div className="text-center">
                    <SytledBUTTON color = {props.color} id="clicker" type="submit" disabled={props.disable} className="custom-btn">
                        {/* <button id="clicker" type="submit" disabled={props.disable} className="custom-btn"> */}
                            <Text tid="send_otp" />
                            {props.spinner ? <span className="spinner"></span> : null}
                        {/* </button> */}
                        </SytledBUTTON>
                    </div>
                </form>
            
                {/* <div className="form-group position-relative mt-5">
                    <small className="form-text text-muted mt-2 text-left">
                        Ref1: {props.ref1}
                    </small>
                    <small className="form-text text-muted mt-2 text-left">
                        Ref2: {props.ref2}
                    </small>
                </div> */}

            </div>

            <div className="col-md-4">
                {props.status ? (<form className="proceed-form sr1" onSubmit={props.otpSubmit}>
                    <div className="form-group position-relative">
                        <label className="custom-label" htmlFor="exampleInputEmail1">
                            <Text tid="otp" />
                        </label>
                        {/* <input */}
                        <SytledINPUT
                            color = {props.color}
                            type="number"
                            className="form-control custom-inp"
                            id="otp"
                            name="otpNumber"
                            onChange={props.changeotp}
                            aria-describedby="otp"
                            required
                            placeholder="Enter OTP"
                        />
                        <small className="form-text text-danger mt-2 text-left" >
                            {props.timerStat === false ? (
                                <span onClick={props.sendAgain} style={{ cursor: "pointer" }}>
                                    <Text tid="havent_receive_otp" />
                                </span>
                            ) : ("Enter OTP")}
                            {/* {props.errors.otpErr} */}
                            <span className="float-right text-danger">{props.time} sec</span>
                        </small>
                    </div>
                    <div className="text-center">
                    <SytledBUTTON color = {props.color} type="submit" disabled={props.disable2} className="custom-btn">
                        {/* <button type="submit" disabled={props.disable2} className="custom-btn"> */}
                            <Text tid="proceed" />
                            {props.spinnerOtp ? <span className="spinner"></span> : null}
                            </SytledBUTTON>
                        {/* </button> */}
                    </div>
                </form>) : (<form className="proceed-form sr1 block-disabled" >
                    <div className="form-group position-relative">
                        <label className="custom-label text-muted" htmlFor="exampleInputEmail1">
                            <Text tid="otp" />
                        </label>
                        {/* <input */}
                        <SytledINPUT
                            color = {props.color}
                            type="number"
                            className="form-control custom-inp"
                            required
                            disabled
                            placeholder="Enter OTP"
                        />
                        <SytledSMALL color = {props.color} className="form-text text-muted mt-2 text-left">
                        {/* <small className="form-text text-muted mt-2 text-left"> */}
                            <Text tid="havent_receive_otp" />
                        {/* </small> */}
                        </SytledSMALL>
                    </div>
                    <div className="text-center">
                    <SytledBUTTON color = {props.color} type="submit" disabled className="custom-btn">
                        {/* <button type="submit" disabled className="custom-btn"> */}
                            <Text tid="proceed" />
                        {/* </button> */}
                        </SytledBUTTON>
                    </div>
                </form>)}
                <br />
            </div>
        </Aux>
    )
}

export default NewUserCmp;
