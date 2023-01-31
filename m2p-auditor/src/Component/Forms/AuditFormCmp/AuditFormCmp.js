import React from 'react'
// import Aux from '../../../hoc/Aux';

const AuditFormCmp = (props) => {
    return (
        <>

            <div className="modal-dialog">
                <div className="modal-content text-center">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title">Screening Result</h5>
                    </div>
                    <div className="modal-body cus-modal">
                        <p> Alert Count: <span clsasName="mr-2">{props?.showModelData?.screening_alerts_count}</span></p>
                        <p>Matched: {props?.showModelData?.screening_status} </p>
                    </div>
                    <div className="modal-footer cus-footer">
                        {
                            props?.showModelData?.risk_rating_report != "NA" ?
                                <p>Report: <a href={props?.showModelData?.risk_rating_report} style={{ color: "purple", textDecoration: "underline" }} target="_blank"> Download Report</a></p>
                                : <p>Reprot: N/A</p>
                        }
                    </div>
                </div>
            </div>
            <div className="modal-dialog">
                <div className="modal-content text-center">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title">Risk Rating Result</h5>
                    </div>
                    <div className="modal-body">
                        <p>Risk: <span clsasName="mr-2" style={{ color: "blue" }}>{props?.showModelData?.risk_rating_status}</span> </p>
                    </div>
                    <div className="modal-footer cus-footer">
                        {
                            props?.showModelData?.risk_rating_report != "NA" ?

                                <p>Report: <a href={props?.showModelData?.risk_rating_report} style={{ color: "purple", textDecoration: "underline" }} target="_blank"> Download Report</a></p>
                                : <p>Reprot: N/A</p>
                        }
                    </div>
                </div>
            </div>
            <form>
                {props.questions?.map((qtn, i) => <div className="form-group audit-form-grp" key={i}>
                    {/* <label className="custom-label audit-label">{qtn.sno}. {Buffer.from(qtn.ques, "base64").toString()} */}
                    <label className="custom-label audit-label">{qtn.sno}. {qtn.ques}
                        <span className="float-right">
                            {qtn.astatus === "-1"
                                ? <i className="far fa-question-circle text-warning"></i>
                                : qtn.astatus === "0"
                                    ? (<i className="far fa-times-circle text-danger"></i>)
                                    : (<i className="far fa-check-circle text-success " />)
                            }
                        </span>
                    </label>
                    <input type="text"
                        name={`remark${i + 1}`}
                        onChange={props.change}
                        // value={qtn.ques}
                        className="form-control audit-inp"
                        placeholder="Add Comment If Required..." />
                    <div className="video-btn text-right">
                        <button type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => props.accept(qtn)}>
                            Accept
                        </button>
                        <button type="button"
                            className="btn btn-sm btn-outline-danger ml-3"
                            onClick={() => props.reject(qtn)}>
                            Reject
                        </button>
                    </div>
                </div>)}
            </form>


        </>
    )
}

export default AuditFormCmp;
