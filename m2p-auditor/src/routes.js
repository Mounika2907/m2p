import Home from "./View/Home/Home";
import UserList from "./View/UserList/UserList";
import Dashboard from "./View/Dashboard/Dashboard";
import Audit from "./View/Audit/Audit";
import ChangePassword from './View/ChangePassword/ChangePassword';

// import Aadhar from "./View/Forms/Aadhar/Aadhar";
// import PAN from "./View/Forms/PAN/PAN";
// import Start from "./View/Forms/Start/Start";
// import VideoKYC from "./View/Forms/VideoKYC/VideoKYC";
// import VideoChat from "./View/Forms/VideoChat/VideoChat";
// import Video from "./View/OpenVidu/Video/Video";
// import ChatApp from "./View/OpenVidu/ChatApp";
// import FaceMatch from "./View/FaceMatch/FaceMatch";

const routes = [
    // { path: "/customer/:id", exact: true, name: 'Home', component: Home },
    { path: "/vciplist", exact: true, name: 'UserList', component: UserList },
    { path: "/dashboard", exact: true, name: 'Dashboard', component: Dashboard },
    { path: "/audit/:id", exact: true, name: 'Audit', component: Audit },
    { path: "/changepassword", exact: true, name: 'ChangePassword', component: ChangePassword },
    // { path: "/video-kyc", exact: true, name: 'VideoKYC', component: VideoKYC },
    // { path: "/video", exact: true, name: 'VideoChat', component: VideoChat },
    // { path: "/video-chat", exact: true, name: 'Video', component: ChatApp },
    // { path: "/FaceMatch", exact: true, name: 'FaceMatch', component: FaceMatch },
];

export default routes;