import React from 'react'
import Aux from '../../../hoc/Aux';

const AadharInfoCmp = (props) => {
    return (
        <Aux>
            {/* <div className="info sr1"> */}
            {/* <hr className="custom-hr" /> */}
            <h2 className="info-title">
                AADHAAR DETAILS
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
                        {props.aadharInfo.info.kycdetails?.map((data, i) => (<Aux key={i}>
                            <tr>
                                <td>Name</td>
                                <td>{data?.name}</td>
                            </tr>
                            <tr>
                                <td>Fathers Name</td>
                                <td>{data?.fname}</td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td>{data?.dob}</td>
                            </tr>
                            <tr>
                                <td>AADHAAR Number</td>
                                <td>{data?.uid}</td>
                            </tr>
                            <tr>
                                <td>Date of Generation Of XML Packet / QR Code</td>
                                <td>{data?.kycdate}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{data?.address}</td>
                            </tr>
                            {/* <tr>
                                <td>Status Of Digital Verification</td>
                                <td>{data?.aipannumber}</td>
                            </tr> */}
                        </Aux>))}
                    </tbody>
                </table>
            </div>
            {/* <hr className="custom-hr" /> */}
            {/* <div className="text-center mt-3">
                            <button type="button" onClick={props.proceed} className="custom-btn">Proceed</button>
                        </div>
                    </div>
                    <div className="col-md p-0">
                        <p className="photo-name">PHOTO</p>
                        <img src="images/user.png" width="60px" height="60px" alt="no img" />
                    </div>
                </div> */}
            {/* </div> */}

        </Aux>
    )
}

export default AadharInfoCmp;
