import React from 'react';
import Aux from '../../../hoc/Aux';

const Attachment = (props) => {
    // console.log(props.panPhoto.info.pandetails[0][aipht]);

    // const photo = () => {
    //     props.panPhoto.info.pandetails?.map((data) => {
    //         const path = "data:image/png;base64,"+data.aipht;
    //         // <img src={path} alt="no img" />
    //         // console.log(data.aipht);

    //     })
    //     // return "data:image/png;base64,"+props.panPhoto.info.pandetails?.aipht
    // }

    return (
        <Aux>
            <div className="info sr1 pb-0 pt-3">
                <h2 className="info-title">
                    REGISTRATION FORM DETAILS
                    <span className="success">
                        <i className="far fa-check-circle" />
                    </span>
                    {/* <span className="danger"><i className="far fa-times-circle"></i></span> */}
                    {/* <span className="warning"><i className="far fa-question-circle"></i></span> */}
                </h2>
                {/* <div className="row m-0">
                    <div className="col-md-12 p-0"> */}
                <div className="table-responsive aadhar-info">
                    <table className="table info-data mb-0">
                        <thead>
                            <tr>
                                <th className="w-50" scope="col">Fields</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {props.aadharInfo?.map((data, i) => (<Aux key={i}> */}
                            <tr>
                                <td>Organization Name</td>
                                <td>{props.aadharInfo.info?.clientname ? props.aadharInfo.info?.clientname : "N/A"}</td>

                                {/* <td>N/A</td> */}
                            </tr>
                            <tr>
                                <td>Full Name</td>

                                <td>{props.aadharInfo.info?.name ? props.aadharInfo.info?.name : "N/A"}</td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td>{props.aadharInfo.info?.dob ? props.aadharInfo.info?.dob : "N/A"}</td>

                            </tr>
                            <tr>
                                <td>Gender</td>


                                <td>{props.aadharInfo.info?.gender ? props.aadharInfo.info?.gender : "N/A"}</td>

                            </tr>
                            <tr>
                                <td>Present Address</td>
                                <td>{props.aadharInfo.info?.presentaddress ? props.aadharInfo.info?.presentaddress : "N/A"}</td>

                                {/* <td>{data?.kycdate}</td> */}
                            </tr>
                            <tr>
                                <td> Permanent Address</td>
                                <td>{props.aadharInfo.info?.permanentaddress ? props.aadharInfo.info?.permanentaddress : "N/A"}</td>
                            </tr>
                            {/* <tr>
                                <td>Status Of Digital Verification</td>
                                <td>{data?.aipannumber}</td>
                            </tr> */}
                            {/* </Aux>))} */}
                        </tbody>
                    </table>
                </div>
            </div>

        </Aux>
    )
}

export default Attachment;
