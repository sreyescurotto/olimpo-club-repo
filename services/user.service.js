import axios from 'axios';

export const userServiceFactory = () => {
    function login(username, password) {
        return axios.post(`/api/admin`, { username, password })
    }

    return {login};
};
