import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import pincodeRdr from "./PincodeReducer";
import PanRdr from "./UsersReducers/PanReducer";
import CaptureRdr from "./CaptureReducer";
import InfoRdr from "./InfoReducer";

const AllReducers = combineReducers({
    LoginReducer: LoginReducer,
    pincodeRdr: pincodeRdr,
    PanRdr: PanRdr,
    CaptureRdr: CaptureRdr,
    InfoRdr: InfoRdr
});

export default AllReducers;