import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import FaceMatchCmp from '../../Component/FaceMatchCmp/FaceMatchCmp';
import { connect } from 'react-redux';
import { FaceMatchAction, LiveCheckAction } from '../../Store/Actions/CaptureAction';
import { toast } from 'react-toastify';
const $ = window.$;

class FaceMatch extends Component {
    state = {
        imgPath: '',
        imgPathPan: '',
        imgPathAdr: '',
        spinner: false,
        spinner1: false,
        spinner2: false,
        spinner3: false,
        modelImg: ''
        // canvasImagePath: ''
    }

    // canvasImage = () => {
    //     // sessionStorage("image1", val)
    //     const canvas = document.getElementById("canvas");
    //     var image = new Image();
    //     image.src = canvas.toDataURL("image/png");
    //     var image1 = image.src.split(',')[1];
    //     this.setState({
    //         canvasImagePath: image1
    //     });
    // }

    livecheck = () => {
        // const canvas = document.getElementById("canvas");
        // var image = new Image();
        // image.src = canvas.toDataURL("image/png");
        // var image1 = image.src.split(',')[1];
        var image1 = this.props.CaptureRdr.canvasImage;
        var adr = this.props.InfoRdr.info.kycdetails[0]?.pht;
        var pan = this.props.InfoRdr.info.pandetails[0]?.pancard;
        // var pan = this.props.InfoRdr.info.pandetails[0]?.aipht;
        const model = {
            live: image1,
            pan: pan,
            adr: adr
        }
        if (image1) {
            const $this = this;
            this.setState({
                spinner: true
            });
            this.props.LiveCheckAction(model, $this);
        } else {
            toast.error("Please Capture the pic")
        }
    }

    // faceMatchCheck = (val) => {
    //     if (val === "1") {
    //         // console.log(this.props.InfoRdr.info.pandetails[0]?.oempht);
    //         // this.props.InfoRdr.info.pandetails.map((pan) =>
    //         //     this.setState({
    //         //         imgPathPan: pan.oempht
    //         //     })
    //         // );
    //         // this.props.InfoRdr.info.kycdetails.map((adr) =>
    //         //     this.setState({
    //         //         imgPathAdr: adr.pht
    //         //     })
    //         // )
    //         // this.setState({
    //         //     imgPathPan: this.props.InfoRdr.info.pandetails[0]?.oempht,
    //         //     imgPathAdr: this.props.InfoRdr.info.kycdetails[0]?.pht
    //         // })
    //         const $this = this;
    //         this.setState({
    //             spinner1: true
    //         });
    //         var pic1 = this.props.InfoRdr.info.pandetails[0]?.aipht;
    //         var pic2 = this.props.InfoRdr.info.kycdetails[0]?.pht;
    //         this.props.FaceMatchAction(pic1, pic2, val, $this);
    //     } else if (val === "2") {
    //         // console.log(this.props.InfoRdr.info.kycdetails[0].pht); 
    //         // this.props.InfoRdr.info.kycdetails.map((res) => {
    //         //     this.setState({
    //         //         imgPath: res.pht
    //         //     })
    //         // })   
    //         const $this = this;
    //         this.setState({
    //             spinner2: true
    //         });
    //         // const canvas = document.getElementById("canvas");
    //         // var image = new Image();
    //         // image.src = canvas.toDataURL("image/png");
    //         // var image1 = image.src.split(',')[1];
    //         var canimage = this.props.CaptureRdr.canvasImage;
    //         var pic2 = this.props.InfoRdr.info.kycdetails[0]?.pht;
    //         this.props.FaceMatchAction(pic2, canimage, val, $this);
    //     } else {
    //         // console.log(this.props.InfoRdr.info.pandetails[0].oempht);
    //         // this.props.InfoRdr.info.pandetails.map((res) => {
    //         //     this.setState({
    //         //         imgPath: res.oempht
    //         //     })
    //         // })
    //         const $this = this;
    //         this.setState({
    //             spinner3: true
    //         });
    //         // const canvas = document.getElementById("canvas");
    //         // var image = new Image();
    //         // image.src = canvas.toDataURL("image/png");
    //         // var image1 = image.src.split(',')[1];
    //         var image1 = this.props.CaptureRdr.canvasImage;
    //         var pic1 = this.props.InfoRdr.info.pandetails[0]?.aipht;
    //         this.props.FaceMatchAction(pic1, image1, val, $this);
    //     }
    // }

    faceMatchCheck = (val) => {
        var image1 = this.props.CaptureRdr.canvasImage;
        var adr = this.props.InfoRdr.info.kycdetails[0]?.pht;
        var pan = this.props.InfoRdr.info.pandetails[0]?.pancard;
        // var pan = this.props.InfoRdr.info.pandetails[0]?.aipht;
        const model = {
            live: image1,
            pan: pan,
            adr: adr
        }
        if (image1) {
            const $this = this;
            this.setState({
                spinner3: true
            });
            this.props.FaceMatchAction(model.live, model.adr, "2", $this);
            this.props.FaceMatchAction(model.live, model.pan, "3", $this);
        } else {
            toast.error("Please Capture the pic")
        }
    }

    popup = (val) => {
        $('#img').modal('show');
        this.setState({
            modelImg: val
        })
    }

    render() {
        var picPer = this.props.CaptureRdr;
        var panPer = picPer.facematchPan ? parseFloat(picPer.facematchPan) : 0;
        var addrPer = picPer.facematchAadhaar ? parseFloat(picPer.facematchAadhaar) : 0;
        var livecheckPer = picPer.livecheck ? parseFloat(picPer.livecheck) : 0;
        var fcmatchPer = picPer.facematch ? parseFloat(picPer.facematch) : 0;
        var avgPer = ((panPer + addrPer + fcmatchPer) / 3).toFixed(2)

        return (
            <Aux>
                <FaceMatchCmp
                    photos={this.props.InfoRdr}
                    canvasImage={this.canvasImage}
                    livecheckPer={livecheckPer}
                    panPer={panPer}
                    addrPer={addrPer}
                    fcmatchPer={fcmatchPer}
                    avgPer={avgPer}
                    pic={this.props.CaptureRdr}
                    livecheck={this.livecheck}
                    popup={this.popup}
                    spinner={this.state.spinner}
                    spinner1={this.state.spinner1}
                    spinner2={this.state.spinner2}
                    spinner3={this.state.spinner3}
                    // faceMatchCheck={(val) => this.faceMatchCheck(val)}
                    faceMatchCheck={this.faceMatchCheck}
                />

                <div className="modal fade custom-modal" id="img" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
    const { CaptureRdr, InfoRdr } = state;
    return {
        CaptureRdr, InfoRdr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FaceMatchAction: (img1, img2, id, $this) => dispatch(FaceMatchAction(img1, img2, id, $this)),
        LiveCheckAction: (img, $this) => dispatch(LiveCheckAction(img, $this))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FaceMatch);
