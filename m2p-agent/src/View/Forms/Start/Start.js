import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';

export class Start extends Component {
    componentDidMount() {
        this.loadScripts();
    }

    loadScripts = () => {
        const dynamicScripts = [
            '/js/script.js',
        ];
        for (let i = 0; i < dynamicScripts.length; i++) {
            const node = document.createElement('script');
            node.src = dynamicScripts[i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }
    }
    proceed = () => {
        sessionStorage.setItem("width", "19%");
        sessionStorage.setItem("step", 2);
        this.props.history.push("/aadhaar")
    }
    
    render() {
        return (
            <Aux>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="proceed sr1">
                            <h3 className="proceed-title">Proceed With</h3>
                            <form className="proceed-form">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio1" name="customRadio" checked={true} className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="customRadio1">OTP based e-KYC</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="customRadio2">Offline e-KYC</label>
                                </div>
                                {/* <div class="text-center"> */}
                                <button type="button" className="custom-btn" data-toggle="modal" data-target="#proceed">Proceed</button>
                                {/* </div> */}
                            </form>
                            {/* Modal */}
                            <div className="modal fade" id="proceed" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Terms & Conditions</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed
                                            commodi, culpa optio vero saepe molestias eum asperiores eaque, iure debitis
                                            earum modi sint nihil quae. Facere quo beatae porro.
                                    </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.proceed}>Understood</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Start;
