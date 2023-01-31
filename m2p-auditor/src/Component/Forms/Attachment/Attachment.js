import React from 'react';
import Aux from '../../../hoc/Aux';

const Attachment = (props) => {
    // console.log(props.panPhoto.info.pandetails[0][aipht]);
    
    // const photo = () => {
    //     props.panPhoto.info.pandetails?.map((data) => {
    //         const path = "data:image/png;base64,"+data.aipht;
    //         // <img src={path} alt="no img" />
    //         // console.log(data.aipht);
            
    //     })
    //     // return "data:image/png;base64,"+props.panPhoto.info.pandetails?.aipht
    // }
    
    return (
        <Aux>
            <div className="info sr1 pb-0">
                <h2 className="info-title">
                    PAN CARD DETAILS
                    <span className="success"><i className="far fa-check-circle" /></span>
                    {/* <span class="danger"><i class="far fa-times-circle"></i></span>
                                  <span class="warning"><i class="far fa-question-circle"></i></span> */}
                </h2>
                <div className="info-card">
                    {/* <img src="images/pancard.png" alt="no img" /> */}
                    {/* <img src={photo()} alt="no img" /> */}
                    {props.panPhoto.info.pandetails?.map((data, i) => (<img key={i} src={"data:image/png;base64,"+data.pancard} alt="no img" />))}
                </div>
                <hr className="custom-hr mb-0" />
            </div>

        </Aux>
    )
}

export default Attachment;
