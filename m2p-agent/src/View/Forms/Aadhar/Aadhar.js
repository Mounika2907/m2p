import React, { Component } from 'react'
import Aux from '../../../hoc/Aux';
import AadharInfoCmp from '../../../Component/Forms/AadharCmp/AadharInfoCmp';
import { connect } from 'react-redux';
import Attachment from '../../../Component/Forms/Attachment/Attachment';
// import AadharFormCmp from '../../../Component/Forms/AadharCmp/AadharFormCmp';
const $ = window.$;

class Aadhar extends Component {
    state = {
        imgPath: null,
        modelImg: null
    }
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

    popup = (val) => {
        $('#img1').modal('show');
        this.setState({
            modelImg: val
        })
    }

    render() {
        return (
            <Aux>
                <div className="row m-0">
                    <div className="col-md-6">
                        <div className="display vheight2">
                            {/* <hr className="custom-hr" /> */}
                            <div className="info sr1 pb-0 pt-3">
                                <AadharInfoCmp
                                    aadharInfo={this.props.InfoRdr}
                                    proceed={this.handleProceed}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="display vheight2">
                            {/* <hr className="custom-hr" /> */}
                            <Attachment
                                aadharInfo={this.props.InfoRdr}

                                // imgSrc={this.state.imgPath}
                                // upload={this.uploadFile}
                                panPhoto={this.props.InfoRdr}
                                popup={this.popup}
                            />
                        </div>
                    </div>
                </div>

                {/* <div className="modal fade custom-modal" id="img1" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img className ="w-75" src={this.state.modelImg} alt="no img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Aux>

        )
    }
}

const mapStateToProps = (state) => {
    const { InfoRdr } = state;
    return {
        InfoRdr
    }
}



export default connect(mapStateToProps)(Aadhar);
