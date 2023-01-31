import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { Link } from 'react-router-dom';

class ComingSoon extends Component {
    render() {
        return (
            <Aux>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="jumbotron mt-5">
                            <h1 className="display-5">Coming Soon...</h1>
                            {/* <p className="lead"></p> */}
                            <hr className="my-4" />
                            {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
                            <Link className="btn btn-primary btn-lg" to="/vciplist" role="button">Home</Link>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default ComingSoon;
