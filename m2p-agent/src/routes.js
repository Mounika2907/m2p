import Home from "./View/Home/Home";
import UserList from "./View/UserList/UserList";
import ComingSoon from "./Component/ComingSoon/ComingSoon";
import Dashboard from "./View/Dashboard/Dashboard";
// import PageNotFound from "./Component/PageNotFound/PageNotFound";
// import Aadhar from "./View/Forms/Aadhar/Aadhar";
// import PAN from "./View/Forms/PAN/PAN";
// import Start from "./View/Forms/Start/Start";
// import VideoKYC from "./View/Forms/VideoKYC/VideoKYC";
// import VideoChat from "./View/Forms/VideoChat/VideoChat";
// import Video from "./View/OpenVidu/Video/Video";
// import ChatApp from "./View/OpenVidu/ChatApp";
// import FaceMatch from "./View/FaceMatch/FaceMatch";

const routes = [
    { path: "/customer/:id", exact: true, name: 'Home', component: Home },
    { path: "/vciplist", exact: true, name: 'UserList', component: UserList },
    { path: "/next", exact: true, name: 'ComingSoon', component: ComingSoon },
    { path: "/dashboard", exact: true, name: 'Dashboard', component: Dashboard },
    // { path: "/video-kyc", exact: true, name: 'VideoKYC', component: VideoKYC },
    // { path: "/video", exact: true, name: 'VideoChat', component: VideoChat },
    // { path: "/video-chat", exact: true, name: 'Video', component: ChatApp },
    // { path: "/404", exact: true, name: 'PageNotFound', component: PageNotFound },
];

export default routes;