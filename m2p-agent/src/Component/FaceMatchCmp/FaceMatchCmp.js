
import React from 'react';
import Aux from '../../hoc/Aux';
import { useState } from 'react'

const FaceMatchCmp = (props) => {
    const [state, setState] = useState()
    const [stateImage, setStateImage] = useState()
    const imgdata = props.pic.data
    // console.log(imgdata, 'adf')
    if (props.pic?.data?.mode) {
        const canvas = document.getElementById("canvas");
        if (canvas) {
            canvas.getContext('2d').drawImage(props.pic.data.mode, 0, 0, props.pic.data.width, props.pic.data.width);
            let image_data_url = canvas.toDataURL('image/png');
            var image1 = image_data_url.split(',')[1];
            // console.log(image1, 'dk')

        }
    }
        //     }
    // }
    // if (state) {
    //     const canvas = document.getElementById("canvas");
    //     if (canvas) {
    //         const context = canvas.getContext('2d');
    //         context.drawImage(state, 0, 0, 1280, 720);
    //     }
    // }

    // const capturePhoto = () => {
    //     const video = document.querySelector(".video-image-capture #live-vd");
    //     const canvas = document.getElementById("canvas");
    //     canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    //     let image_data_url = canvas.toDataURL('image/jpeg');
    // }

    return (
        <Aux>
            <div className="photos">
                <h2 className="info-title mb-1">
                    FACE MATCH AND LIVENESS CHECK
                    {/* <span className="success"><i className="far fa-check-circle"></i></span> */}
                    {/* <span className="danger"><i className="far fa-times-circle" /></span> */}
                    {/* <span className="warning"><i className="far fa-question-circle"></i></span> */}
                </h2>
                <div className="row m-0">
                    <div className="col p-0">
                        <div className="photo-img border">
                            {props.photos.info.pandetails?.map((data, i) =>
                                (<img key={i} src={data.aipht ? "data:image/png;base64," + data.aipht : '../images/noimg.png'} onClick={() => props.popup("data:image/png;base64," + data.aipht)} alt="no img" />)
                            )}
                        </div>
                        <h6 className="photo-title mb-1">PAN</h6>
                        <div className="score-box">
                            <p className="mb-0">Match Score</p>
                            <span className="small text-white" style={{ fontSize: "11px" }}>
                                PAN - Live
                            </span>
                            <span className="score-status text-center ml-2">
                                {props.panPer <= 50
                                    ? <span style={{ color: "red"}}>{props.panPer.toFixed(2)}%</span>
                                    : <span style={{ color: "green" }}>{props.panPer.toFixed(2)}%</span>
                                }
                            </span>
                        </div>
                    </div>
                    <div className="col p-0">
                        <div className="photo-img photo-img1 position-relative border">
                            <div>
                                <canvas id="canvas" width={imgdata?.widht} height={imgdata?.height} style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%", display: "none" }}></canvas>
                                {/* <img className="w-100 h-100" src={stateImage ? "data:image/png;base64," + stateImage : '../images/noimg.png'}
                                    onClick={() => props.popup("data:image/png;base64," + stateImage)}
                                    style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%" }} alt="no img" /> */}
                                <img width={imgdata?.widht} height={imgdata?.height} src={props.pic.canvasImage ? "data:image/png;base64," + props.pic.canvasImage : '../images/noimg.png'}
                                    onClick={() => props.popup("data:image/png;base64," + props.pic.canvasImage)}
                                    style={{ objectFit: 'fill', position: "absolute", width: "100%", height: "100%" }} alt="no img" />
                            </div>
                        </div>
                        <h6 className="photo-title mb-1">LIVE PHOTO</h6>
                        <h6 className="score-status text-center">
                            {props.livecheckPer <= 50
                                ? <span style={{ color: "red" }}>{props.livecheckPer.toFixed(2)}%</span>
                                : <span style={{ color: "green" }}>{props.livecheckPer.toFixed(2)}%</span>
                            }
                        </h6>


                        {/* {props.data?.livecapturedetails?.map(e => (e.livecapturepht_matchlevel >= 50) ? <td style={{ color: "green" }} className="font-weight-bold"> {props.data?.livecapturedetails?.map(e => e.livecapturepht_matchlevel)}%</td> : <td style={{ color: "red" }} className="font-weight-bold"> {props.data?.livecapturedetails?.map(e => e.livecapturepht_matchlevel)}</td>)} */}


                    </div>
                    <div className="col p-0">
                        <div className="photo-img border">
                            {props.photos.info.kycdetails?.map((data, i) =>
                            (<img key={i} src={data.pht ? "data:image/png;base64," + data.pht : '../images/noimg.png'}
                                onClick={() => props.popup("data:image/png;base64," + data.pht)}
                                alt="no img" />)
                            )}
                        </div>
                        <h6 className="photo-title mb-1">AADHAAR</h6>

                        <div className="score-box">
                            <p className="mb-0">Match Score</p>
                            <span className="small text-white" style={{ fontSize: "11px" }}>
                                AADHAAR - Live
                            </span>
                            <span className="score-status text-center ml-2">
                                {props.addrPer <= 50
                                    ? <span style={{ color: "red"}}>{props.addrPer.toFixed(2)}%</span>
                                    : <span style={{ color: "green" }}>{props.addrPer.toFixed(2)}%</span>
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 text-center box-gap fm-btn">
                {/* <button className="custom-btn video-btn mt-1 my-0 bg-secondary" onClick={capturePhoto}>
                    <i className="fas fa-camera"></i>
                </button> */}

                <button className="custom-btn mr-2 mb-1 mt-1" onClick={props.livecheck}>
                    LIVENESS CHECK
                    {props.spinner ? <span className="spinner"></span> : null}
                </button>
                <button className="custom-btn mb-1 mt-1" onClick={props.faceMatchCheck}>
                    FACE MATCH
                    {props.spinner3 ? <span className="spinner"></span> : null}
                </button>
                {/* <button className="custom-btn mr-2" onClick={() => props.faceMatchCheck("3")}>
                    FACE MATCH(PAN)
                    {props.spinner3 ? <span className="spinner"></span> : null}
                </button>
                <button className="custom-btn mr-2" onClick={() => props.faceMatchCheck("2")}>
                    FACE MATCH(AADHAAR)
                    {props.spinner2 ? <span className="spinner"></span> : null}
                </button>
                <button className="custom-btn mr-2" onClick={() => props.faceMatchCheck("1")}>
                    FACE MATCH(PAN & AADHAAR)
                    {props.spinner1 ? <span className="spinner"></span> : null}
                </button> */}
            </div>
            <hr className="custom-hr" />
            <div className="row m-0 text-center">
                <div className="col-md p-0">
                    <p className="score-title">PAN and AADHAAR Score</p>
                    <h6 className="score-status">
                        {props.fcmatchPer <= 50
                            ? <span style={{ color: "red"}}> {props.fcmatchPer.toFixed(2)}%</span>
                            : <span style={{ color: "green" }}>{props.fcmatchPer.toFixed(2)}%</span>
                        }
                    </h6>
                </div>
                <div className="col-md p-0">
                    <p className="score-title">Average Match Score</p>
                    <h6 className="score-status text-danger" style={{ color: "#09aae1 !important" }}>
                        {props.fcmatchPer ? (props.avgPer <= 50
                            ? <span style={{ color: "red"}}>{props.avgPer}%</span>
                            : <span style={{ color: "green" }}>{props.avgPer}%</span>)
                            // props.avgPer.toFixed(2) + "%" 
                            : "0"
                        }
                    </h6>
                </div>
                <div className="col-md p-0">
                    <p className="score-title">System Suggested Status</p>
                    <h6 className="score-status">
                        {props.avgPer ?
                            props.avgPer <= 50
                                ? <span style={{ color: "red"}}>Not Matched</span>
                                : <span style={{ color: "green" }}>Matched</span>
                            : "Not Matched"
                        }
                    </h6>
                </div>
            </div>
            {/* <hr className="custom-hr" /> */}

        </Aux>
    )
}

export default FaceMatchCmp;
