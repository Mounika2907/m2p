import React, { useState } from 'react'
import { connect } from 'react-redux';
import { ChangePasswordAction } from '../../Store/Actions/DetailsAction';

const ChangePassword = (props) => {

    const [change, setChange] = useState({
        oldPassword: "",
        newPassword: "",
        newPassword1: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const { newPassword, newPassword1 } = change;
        // console.log(newPassword === newPassword1, newPassword , newPassword1);
        if (newPassword === newPassword1) {

            const model = {
                oldpassword: change.oldPassword,
                newpassword: change.newPassword,
            }
            props.ChangePasswordAction(model);
            setChange({
                oldPassword: "",
                newPassword: "",
                newPassword1: "",
                
            })
        }
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-md-7">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-2 mb-0">
                            CHANGE PASSWORD
                        </h6>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputPassword1">Old Password</label>
                                <input type="password" className="form-control" value={change.oldPassword} onChange={(e) => setChange({...change, oldPassword: e.target.value})} id="exampleInputPassword1" placeholder="Old Password" />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="exampleInputPassword2">New Password</label>
                                <input type="password" className="form-control" value={change.newPassword} onChange={(e) => setChange({...change, newPassword: e.target.value})} id="exampleInputPassword2" placeholder="New Password" />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="exampleInputPassword3">Re-type New Password</label>
                                <input type="password" className="form-control" value={change.newPassword1} onChange={(e) => setChange({...change, newPassword1: e.target.value})} id="exampleInputPassword3" placeholder="Re-type New Password" />
                            </div>
                            <div className="d-flex justify-content-end">
                            <button type="submit" className="btn custom-btn p-2">Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return { InfoRdr }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ChangePasswordAction: (modal) => dispatch(ChangePasswordAction(modal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);