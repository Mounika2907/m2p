import React from 'react'
import Aux from '../../../hoc/Aux';

const AttachmentInfo = (props) => {
    // console.log(props.panInfo.info);

    return (
        <Aux>
            <div className="info sr1 border-right-0 pb-0">
                <div className="row m-0">
                    <div className="col-md-7 p-0">
                        <h2 className="info-title">
                            AI OCR
                            {/* <span className="success"><i className="far fa-check-circle"></i></span>
                            <span className="danger"><i className="far fa-times-circle"></i></span> */}
                            <span className="warning"><i className="far fa-question-circle" /></span>
                        </h2>
                    </div>
                    <div className="col-md">
                        <div className="w-100 text-right">
                            <button className="custom-btn mt-0" onClick={props.save}>Save</button>
                        </div>
                    </div>
                </div>
                {props.panInfo.info.panstatus === "1" ? (
                    <div className="table-responsive">
                        <table className="table info-data mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Fields</th>
                                    <th scope="col">Orginal</th>
                                    <th scope="col">Edited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.panInfo.info.pandetails.map((data, i) => (<Aux key={i}>
                                    <tr>
                                        <td>Name</td>
                                        <td>{data?.oemname}</td>
                                        <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtname" onChange={props.edit} className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Fathers Name</td>
                                        <td>{data?.oemfname}</td>
                                        <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtfname" onChange={props.edit} className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DOB</td>
                                        <td>{data?.oemdob}</td>
                                        <td>
                                            <div className="form-group position-relative mb-0 pb-0">
                                                <input type="text" name="edtdob" onChange={props.edit} className="pan-inp" />
                                                <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PAN Number</td>
                                        <td>{data?.aipannumber}</td>
                                        <td>
                                            {data?.aipannumber}
                                            {/* <div className="form-group position-relative mb-0 pb-0">
                                        <input type="text" name="edtpannumber" onChange={props.edit} value={data?.aipannumber} className="pan-inp" />
                                        <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                    </div> */}
                                        </td>
                                    </tr>
                                    {/* <tr>
                                <td>Expiry Date</td>
                                <td>{props.panInfo.pandetails?.oemdob}</td>
                                <td>
                                    <div className="form-group position-relative mb-0 pb-0">
                                        <input type="text" name="oemdob" value={props.panInfo.pandetails?.oemdob} className="pan-inp" />
                                        <span className="pan-edit"><i className="fas fa-pencil-alt" /></span>
                                    </div>
                                </td>
                            </tr> */}
                                </Aux>))}
                            </tbody>
                        </table>
                    </div>) : (null)}
                <hr className="custom-hr mb-0" />
            </div>

        </Aux>
    )
}

export default AttachmentInfo;
