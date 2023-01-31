import React, { Component } from 'react'
// import { toast } from 'react-toastify';
import Aux from '../../../hoc/Aux';
import AttachmentInfo from '../../../Component/Forms/Attachment/AttachmentInfo';
import { connect } from 'react-redux';
import { PanAction } from '../../../Store/Actions/UsersActions/UserActions';
import { SavePanDataAction } from '../../../Store/Actions/DetailsAction';
import { toast } from 'react-toastify';
const $ = window.$;

class PAN extends Component {
    state = {
        imgPath: null,
        status: false,
        // edtname: '',
        // edtfname: '',
        // edtdob: '',
        // edtpannumber: '',
        modelImg: null,
        check: false,
        inputFields: [
            { edtname: '', edtfname: '', edtdob: '' }
        ]
    }

    componentDidMount() {
        if (this.props.PanRdr.PanDetails) {
            this.setState({
                status: false
            });
        }
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

    // HANDLE FOR EDIT PAN DATA
    panEdit = (index, event) => {
        event.preventDefault();
        const values = [...this.state.inputFields];
        if (event.target.name === "edtname") {
            values[index].edtname = event.target.value;
        } else if (event.target.name === "edtfname") {
            values[index].edtfname = event.target.value;
        } else {
            values[index].edtdob = event.target.value;
        }
        this.setState({
            inputFields: values
        });
    };

    // SAVE PAN DATA
    savePan = () => {
        const body = {
            edtname: this.state.inputFields[0].edtname,
            edtfname: this.state.inputFields[0].edtfname,
            edtdob: this.state.inputFields[0].edtdob
        }
        if (body.edtname || body.edtfname || body.edtdob) {
            const $this = this;
            this.props.SavePanDataAction($this, body);
        } else {
            toast.error("Nothing changed in input field")
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
                {/* <div className="row m-0"> */}
                {/* <div className="col-md-6">
                        <hr className="custom-hr" />
                        <Attachment
                            imgSrc={this.state.imgPath}
                            panPhoto={this.props.InfoRdr}
                            popup={this.popup}
                        />
                    </div> */}
                {/* <div className="col-md-6"> */}
                {/* <hr className="custom-hr" /> */}
                <AttachmentInfo
                    check={this.state.check}
                    this={this}
                    handleChange={(index, event) => this.panEdit(index, event)}
                    panInfo={this.props.InfoRdr}
                    save={this.savePan}
                    state={this.state}
                    popup={this.popup}
                    imgSrc={this.state.imgPath}


                />
                {/* </div> */}
                {/* </div> */}
               <div className="modal fade custom-modal" id="img1" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="modal-data">
                                    <img className="w-75" src={this.state.modelImg} alt="no img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    const { PanRdr, InfoRdr } = state;
    return {
        PanRdr, InfoRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        PanAction: (body) => dispatch(PanAction(body)),
        SavePanDataAction: ($this, body) => dispatch(SavePanDataAction($this, body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PAN);
