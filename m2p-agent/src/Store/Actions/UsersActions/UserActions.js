// import * as actionTypes from '../types';
import Axios from '../../../hoc/axios';
import { toast } from 'react-toastify';
// import Axios from 'axios';

const URL = "api/Document/DocumentCheck";

// const headers = {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
// }

// OTP BASED AADHAAR NUMBER VERIFICATION
export const AadharAction = (body) => {
    return (dispatch) => {
        Axios.post(URL, body)
        .then(
            (res) => {
                toast.success("Success");
            }
        )
        .catch(
            err => {
                toast.error("Error in Aadhar");
            }
        )
    }
}

// GET ADHAR OTP 
export const AadharOtpAction = (otp) => {
    return (dispatch) => {
        Axios.post(URL, otp)
        .then(
            (res) => {
                toast.success("Success");
            }
        )
        .catch(
            err => {
                toast.error("Error in Aadhar");
            }
        )
    }
}

// PAN OCR
export const PanAction = (data) => {
    return (dispatch) => {

        // dispatch({
        //     type: actionTypes.PANINFO,
        //     payload: "asd"
        // })
        // const modal = {
        //     slk: "KTCXS-VQQGN-CFUKK-ZQOLD",
        //     servicecode: "05",
        //     userid: "3",
        //     rrn: "encoding reference number",
        //     frontdoc: data,
        //     backdoc: "",
        //     document_type: "1",
        //     firstname: "SYZ",
        //     lastname: "HYD",
        //     issuing_country: "IND"
        // }
        // Axios.post(URL, modal, { headers: headers })
        //     .then(
        //         (res) => {
        //             console.log(res.data);

        //             dispatch({
        //                 type: actionTypes.PANINFO,
        //                 payload: res.data
        //             })
        //         }
        //     )
        //     .catch(
        //         err => {
        //             toast.error("Error PAN");
        //         }
        //     )

    }
}