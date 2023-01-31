import React, { useRef, useState, useEffect } from 'react';
import Aux from '../../../hoc/Aux';
import { Text } from '../../../View/Language/Language';
import Countdown from "react-countdown";
import {SytledH5, SytledSELECT1, SytledBUTTON, SytledH6, SytledDIVPRO, SytledSPAN, SytledP, SytledH4, SytledLabel, SytledINPUT} from "../../../hoc/style_component"
const $ = window.$;
const RescheduleCmp = (props) => {

    // const oldValue = useRef();
    // const interval = useRef(null);
    // const [display, setDisplay] = useState(oldValue.current);
    const [value, setvalue] = useState(0);

    useEffect(() => {
        // setTimeout(() => {
        var token = sessionStorage.getItem('token');
        // setvalue(0)
        const cleaerInterval = setInterval(() => {
            // setTimeout(() => {
            if (token != "undefined" && token != "-1") {

                let nextPercent = value + 1;

                // const val = token;
                const val = parseInt(100 - (token + "9"))
                if (nextPercent >= val) {
                    // nextPercent = 0;
                } else if (token == "0") {
                    setvalue(100)
                } else {
                    setvalue(nextPercent, 'next');
                }
            }

            // }, 2000);

            // this.setState({ percentage: nextPercent });
        }, 800);
        return () => clearInterval(cleaerInterval);



        // }, 5000);
    })

    // const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            // return <Completionaist />;
            $('#refreshpagemodel').modal({
                keyboard: false
            });
            return <span>Continue again!</span>
            // $('#refreshpagemodel').modal('show');
        } else {
            // Render a countdown
            return (
                <span>
                    {minutes}:{seconds}
                </span>
            );
        }
    };

    // useEffect(() => {
    //     var val = props.waitingList?.token;
    //     console.log(val, 'val')
    //     const count = 0;
    //     setInterval(() => {
    //         for (let index = 0; index < val.length; index++) {
    //             const count = setvalue(val);
    //             console.log(count, 'element');
    //         }
    //     }, count);
    // }, [])

    // useEffect(() => {
    //   interval.current && clearInterval(interval.current);
    //   interval.current = setInterval(() => {
    //     setDisplay((val) => {
    //       console.log(val, value);
    //       if (val >= value) {
    //         oldValue.current = value;
    //         clearInterval(interval.current);
    //         return val;
    //       }
    //       return val + 1;
    //     });
    //   }, 50);

    //   return () => clearInterval(interval.current);
    // }, [value]);
    // console.log(props.waitingList?.token <= (props.waitingList?.tokenlimit ? props.waitingList?.tokenlimit : "1"));

    // const counter = () => {
    //     var val = props.waitingList?.token;
    //     console.log(val, 'val')
    //     const count = 0;
    //     setInterval(() => {
    //         for (let index = 0; index < val.length; index++) {
    //             const count = setvalue(val);
    //             console.log(count, 'element');
    //             console.log(value, 'element');
    //         }
    //     }, 1000);
    //     console.log(value)
    // }

    return (
        <Aux>
            <div className="row justify-content-center">
                <div className="col-md-5 p-0">
                    <div className="instructions sr1">
                        <div className="reschedule">
                            {props.scheduleDetails?.time
                                ? <SytledH6 color={props.color} className="text-center reschedule-title mb-1">
                                    <Text tid="Schedule_Details" /> :
                                    {/* Schedule Details: */}
                                    <span className="text-danger pl-1">
                                        {props.scheduleDetails.sdate} ({props.scheduleDetails.time})
                                    </span>
                                </SytledH6>
                                : null}


                            {props.waitingList?.isscheduled === "0"
                                ? ((props.waitingList?.token !== "0" && props.waitingList?.token !== "-1")
                                    ? <h6 className="text-center">
                                        <Text tid="please_wait" />
                                    </h6>
                                    : null)
                                : (props.waitingList?.isscheduled === "1"
                                    ? <p className="text-center text-danger small mb-1" style={{ cursor: "pointer" }} onClick={props.cancelSchedule}>
                                        {/* Cancel Schedule */}
                                        <Text tid="Cancel_Schedule" />
                                    </p>
                                    : null)
                            }

                            {/* {(props.waitingList?.token !== "0" && props.waitingList?.token !== "-1") ? <h6 className="text-center">
                                <Text tid="please_wait" />
                            </h6> : null} */}

                            {/* {(props.waitingList?.isscheduled === "0") ? <h6 className="text-center">
                                <Text tid="please_wait" />
                            </h6> : <p className="text-center text-danger small mb-1" style={{ cursor: "pointer" }} onClick={props.cancelSchedule}>
                                    Cancel Schedule
                            </p>} */}

                            {props.scheduleDetails?.joinstatus ? null :
                                <>
                                    <SytledH6 color={props.color} className="text-center reschedule-title">
                                        <Text tid="token" />
                                        {props.waitingList?.token}
                                    </SytledH6>
                                    {/* <div className="progress" >
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={`${parseInt( 100 - (display + "9"))}%`} aria-valuemin={0} aria-valuemax={`${props.waitingList?.token}00`} style={{ width: `${parseInt( 100 - (display + "9"))}%` }} />
                                    </div> */}
                                    <div className="progress">
                                        <SytledDIVPRO color={props.color} className="progress-bar progress-bar-striped progress-bar-animated px-2" role="progressbar" aria-valuenow={`${value}%`} aria-valuemin={0} aria-valuemax={`${props.waitingList?.token}00`} style={{ width: `${value}%` }} >{`${value}%`}</SytledDIVPRO>
                                    </div>

                                    {/* <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                    </div> */}
                                    {/* <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={`${parseInt(100 - (props.waitingList?.token + "9"))}%`} aria-valuemin={0} aria-valuemax={`${props.waitingList?.token}00`} style={{ width: `${parseInt(100 - (props.waitingList?.token + "9"))}%` }} />
                                    </div> */}
                                </>
                            }
                            <div className="reschedule-img">
                                <img src="./assets/images/caller.svg" alt="no img" />
                            </div>
                            <input
                                type="text"
                                className="form-control custom-inp d-none"
                                id="userName"
                                value={props.myUserName}
                                onChange={(e) => props.handleChangeUserName(e)}
                                required
                                readOnly
                                placeholder="V-CIP Number"
                            />
                            {/* <button onClick={counter}>click</button> */}
                            <div className="text-center">
                                {/* {console.log(props?.waitingList.waittimer)} */}
                                {
                                    (props.waitingList?.token === "0" || props.scheduleDetails?.joinstatus === "1")
                                        ? (
                                            <SytledBUTTON color={props.color} type="button" className="custom-btn" onClick={props.joinSession} >
                                                {
                                                    props.joinBtnDisable ? (
                                                        <>
                                                            <Text tid="joining" />
                                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                                width="60px" height="10px" viewBox="0 0 80 20">
                                                                <circle cx="10" cy="10" r="10" fill="#666" >
                                                                    <animate attributeName="cx" from="10" to="40" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                </circle>
                                                                <circle cx="10" cy="10" r="0" fill="#555">
                                                                    <animate attributeName="r" from="0" to="10" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                </circle>
                                                                <circle cx="40" cy="10" r="10" fill="#777">
                                                                    <animate attributeName="cx" from="40" to="70" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                </circle>
                                                                <circle cx="70" cy="10" r="10" fill="#666">
                                                                    <animate attributeName="r" from="10" to="0" dur="0.5s" calcMode="spline" keySplines="0.42 0 0.58 1" keyTimes="0;1" repeatCount="indefinite" />
                                                                </circle>
                                                            </svg>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <Text tid="join" />   (<Countdown date={Date.now() + parseInt(props?.waitingList.waittimer)} renderer={renderer} />)
                                                        </>
                                                    )
                                                }
                                            </SytledBUTTON>
                                        ) : (
                                            <SytledBUTTON color={props.color} type="button" className="custom-btn" disabled>
                                                <Text tid="join" />
                                            </SytledBUTTON>
                                        )
                                }
                            </div>
                        </div>
                        {/* <div className="text-center mt-3">
                            {props.waitingList?.isscheduled === "1" ?
                                <button type="button" className="custom-btn" disabled>
                                    <Text tid="Change_language" />
                                </button> : <button type="button" className="custom-btn" data-toggle="modal" data-target="#info">
                                    <Text tid="Change_language" />
                                </button>}
                        </div> */}
                        <SytledP color={props.color} className="reschedule-note">
                            <span className="text-danger">*</span>
                            <Text tid="please_note" />
                            {/* Changing your language for video call now, will delete the
                                existing token number and a new token number will be assigned. */}
                            <Text tid="Schedule_note" />
                        </SytledP>
                    </div>
                </div>
                <div className="col-md-5 p-0">
                    {/* {
                        console.log(props.waitingList?.token, props.waitingList?.tokenlimit, props.waitingList?.isscheduled, 'lkj')
                    } */}

                    {/* {(((props.waitingList?.token <= (props.waitingList?.tokenlimit ? props.waitingList?.tokenlimit : "1")) || props.waitingList?.token === "-1")
                        && (props.waitingList?.isscheduled === "1" || props.waitingList?.isscheduled === "0" || props.waitingList?.token === "0")) */}
                    {/* {
                        console.log((((props.waitingList?.token <= (props.waitingList?.tokenlimit ? props.waitingList?.tokenlimit : "1")) || props.waitingList?.token === "-1") && (props.waitingList?.isscheduled === "1" || props.waitingList?.isscheduled === "0" || props.waitingList?.token === "0")))
                    } */}


                    {(((props.waitingList?.token <= (props.waitingList?.token ? props.waitingList?.tokenlimit : "1")) || props.waitingList?.token === "-1"))
                        // && (props.waitingList?.isscheduled == "1" || props.waitingList?.isscheduled == "0" || props.waitingList?.token === "0"))

                        ? <div className="instructions sr1 border-right-0 block-disabled">

                            <div className="reschedule">
                                <SytledH4 color={props.color} className="text-center reschedule-title">
                                    {/* Reschedule */}
                                    <Text tid="Reschedule" />
                                </SytledH4>
                                <form className="reschedule-form">
                                    <div className="form-group">
                                        <SytledLabel color={props.color} className="reschedule-label">
                                            {/* Select new date for video call session */}
                                            <Text tid="select_date" />
                                        </SytledLabel>
                                        <input type="date"
                                            name="sdate"
                                            className="form-control reschedule-inp"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <SytledLabel color={props.color} className="reschedule-label">
                                            {/* Select available time slots */}
                                            <Text tid="select_time" />
                                        </SytledLabel>
                                        <div className="position-relative">
                                            <span className="time">
                                                <i className="far fa-clock"></i>
                                            </span>
                                            {/* <input type="text" className="form-control reschedule-inp" required /> */}
                                            <select defaultValue={'DEFAULT'}
                                                name="stime"
                                                className="form-control reschedule-inp"
                                                required>
                                                <option value={'DEFAULT'}>00.00</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center mt-3">
                                <SytledBUTTON color={props.color} type="button" className="custom-btn">
                                    {/* Confirm */}
                                    <Text tid="Confirm" />
                                </SytledBUTTON>
                            </div>
                            <p className="reschedule-note">
                                <span className="text-danger">*</span>
                                <Text tid="please_note" />
                                {/* you can only reschedule the call once in 6 hours */}
                                <Text tid="only_reschedule" />
                            </p>
                        </div>
                        : <div className="instructions sr1 border-right-0">

                            <div className="reschedule">
                                <SytledH4 color={props.color} className="text-center reschedule-title">
                                    {/* Reschedule */}
                                    <Text tid="Reschedule" />
                                </SytledH4>
                                <form className="reschedule-form" id="rescheduleForm">
                                    <div className="form-group">
                                        <SytledLabel color={props.color} className="reschedule-label">
                                            {/* Select new date for video call session */}
                                            <Text tid="select_date" />
                                        </SytledLabel>
                                        <SytledINPUT color={props.color} type="date"
                                            name="sdate"
                                            //  min="2020-06-18" max="2020-06-20"
                                            min={props.formateDate(props.calenderDetails.sfdate)} max={props.formateDate(props.calenderDetails.stdate)}
                                            onChange={props.handleChange}
                                            className="form-control reschedule-inp"
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <SytledLabel color={props.color} className="reschedule-label">
                                            {/* Select available time slots */}
                                            <Text tid="select_time" />
                                        </SytledLabel>
                                        <div className="position-relative">
                                            <SytledSPAN color={props.color} className="time">
                                                <i className="far fa-clock"></i>
                                            </SytledSPAN>
                                            {/* <input type="text" className="form-control reschedule-inp" required /> */}
                                            <select defaultValue={'DEFAULT'}
                                                name="stime"
                                                onChange={props.handleChange}
                                                className="form-control reschedule-inp"
                                                required>
                                                <option value={'DEFAULT'} disabled>Select Time</option>
                                                {props.calenderDetails ? props.calenderDetails?.stimes?.map((res, index) => (
                                                    <option key={index}>{res}</option>
                                                )) : null}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center mt-3">
                                <SytledBUTTON color={props.color} type="button" onClick={props.createSchedule} className="custom-btn">
                                    {/* Confirm */}
                                    <Text tid="Confirm" />
                                </SytledBUTTON>
                            </div>
                            <SytledP color={props.color} className="reschedule-note">
                                <span className="text-danger">*</span>
                                <Text tid="please_note" />
                                {/* you can only reschedule the call once in 6 hours */}
                                <Text tid="only_reschedule" />
                            </SytledP>
                        </div>}
                </div>
            </div>


            <hr className="hr" />

            <div className="row justify-content-center">
                <div className="col-md">
                    <div className="instructions sr1 border-right-0 p-0">
                        <SytledH5 color={props.color} className="instructions-title mb-1 pl-0">
                            <Text tid="video_instruction" />
                        </SytledH5>
                        <p className="text-danger small mb-3">
                            <Text tid="video_please_note" />
                        </p>
                        <ul className="instructions-list pl-4">
                            <li>
                                <Text tid="video_ins1" />
                            </li>
                            <li>
                                <Text tid="video_ins2" />
                            </li>
                            <li>
                                <Text tid="video_ins3" />
                            </li>
                            <li>
                                <Text tid="video_ins4" />
                            </li>
                            <li>
                                <Text tid="video_ins5" />
                            </li>
                            <li>
                                <Text tid="video_ins6" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md">
                    <div className="instructions sr1 border-right-0 p-0">
                        <div className="">
                            <img src="./assets/images/instructions.png" alt="no img" className="w-100" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="info" ref={props.inpRef} data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="modal-data text-center py-3">
                                <h5 className="modal-data-content text-dark text-center">
                                    {/* Please select the language for the video call */}
                                    <Text tid="Please_select" />
                                </h5>
                                <div>
                                    <form className="reschedule-form" onSubmit={props.submitLanguage}>
                                        <div className="form-group mx-auto">
                                            <div className="position-relative">
                                                <SytledSELECT1 color={props.color} defaultValue={'DEFAULT'}
                                                    name="langid"
                                                    onChange={props.handleChange}
                                                    required
                                                    className="form-control reschedule-modalinp">
                                                    <option value={'DEFAULT'} disabled>
                                                        Select Language
                                                        {/* <Text tid="Select_Language" /> */}
                                                    </option>
                                                    {props.languagesList.length !== 0 ? props.languagesList.map((res, index) => (
                                                        <option value={res.langid} key={index}>{res.lang}</option>
                                                    )) : null}
                                                </SytledSELECT1>
                                            </div>
                                        </div>
                                        <SytledBUTTON color={props.color} type="submit" className="btn custom-btn mt-3 ml-0">
                                            <Text tid="Confirm" />
                                            {/* Confirm */}
                                        </SytledBUTTON>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                                                        
            <div className="modal fade" id="refreshpagemodel" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="instructions pt-4" style={{ border: "none"}}>
                                <SytledH6 color={props.color} className="instructions-title text-center">
                                    Customer Join wait time has been exceeded. Click on "Continue" to join again.
                                </SytledH6>
                                <div className="pb-3 text-center">

                                    <SytledBUTTON color={props.color} type="button" className="btn custom-btn" onClick={props.redirectHome}>Home</SytledBUTTON>
                                    <SytledBUTTON color={props.color} type="button" onClick={() => window.location.reload()} className="btn custom-btn">Continue</SytledBUTTON>
                                </div>
                                {/* <div className="pb-3 text-center">
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Aux>
    )
}

export default RescheduleCmp;
