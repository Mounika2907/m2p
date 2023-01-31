import React from 'react'
import Aux from '../../../hoc/Aux';

const RegisterCmp = (props) => {
    return (
        <Aux>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5">
                        <div className="contact-form">
                            <h5 className="services-heading">Application Form</h5>
                            <form className="my-4" onSubmit={props.login}>
                                <div className="form-group position-relative">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" className="form-control custom-inp"
                                        name="name" onChange={props.change}
                                        placeholder="Full Name" required />
                                    <i className="fas fa-user input_icon" />
                                </div>
                                <div className="form-group position-relative">
                                    {/*    <label for="inputAddress">Address</label>*/}
                                    <input type="email" className="form-control custom-inp"
                                        name="email" onChange={props.change}
                                        placeholder="E-mail Address" required />
                                </div>
                                <div className="form-group position-relative">
                                    {/*    <label for="inputAddress">Address</label>*/}
                                    <input type="tel" className="form-control custom-inp"
                                        name="phone" onChange={props.change}
                                        placeholder="Mobile" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="number" className="form-control custom-inp"
                                            name="pincode" value={props.pincode} onChange={props.change}
                                            placeholder="pincode" required />
                                    </div>
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="text" className="form-control custom-inp"
                                            placeholder="State" name="state" value={props.state} required readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="text" className="form-control custom-inp"
                                            placeholder="District" name="district" value={props.district} required readOnly />
                                    </div>
                                    <div className="form-group position-relative col">
                                        {/*    <label for="inputAddress">Address</label>*/}
                                        <input type="text" className="form-control custom-inp"
                                            placeholder="Town" name="town" value={props.town} required readOnly />
                                    </div>
                                </div>
                                <div className="form-group position-relative">
                                    <textarea className="form-control custom-inp"
                                        name="address"
                                        rows={3} placeholder="Address" required defaultValue={""} />
                                </div>
                                <div className="text-center">
                                    <button type="submit" disabled={props.check} className="btn custom-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default RegisterCmp;
