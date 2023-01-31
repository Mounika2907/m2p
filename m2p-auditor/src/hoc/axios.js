import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

instance.defaults.headers.common['Content-Type'] = "application/json";
instance.defaults.headers.common['apikey'] = "sajhdjashdjhjhsdassajhdsaduwquey";

// instance.defaults.headers.common['apikey'] = "zkjaksjdkasdkasjdkjaskdjkasjd";
// instance.defaults.headers.common['authkey'] = "p3to7Vf2R76pvesGajKnFL4frYwhtc";


instance.interceptors.request.use(
    request => {
        const auth = sessionStorage.getItem("sessionid");
        if (auth) {
            request.headers.common['authkey'] = auth;
        } else{
            // request.headers.common['authkey'] = "p3to7Vf2R76pvesGajKnFL4frYwhtc";

        }
        // request.headers.common['Content-Type'] = "application/json";
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);


export default instance;