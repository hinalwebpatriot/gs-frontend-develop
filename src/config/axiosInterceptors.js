import axios from 'axios'
// import {pushLogout} from "../components/Login/LoginPageActions";

export default {
    init: (store) => {
        axios.interceptors.response.use((response) => {
            return response
        }, (error) => {
            if (axios.isCancel(error)) {
              return Promise.reject(error)
            }

            if (error.response.status === 401) {
                // store.dispatch(pushLogout())
                // history.push(routing().login);
            }

            return Promise.reject(error)
        })
    }
}
