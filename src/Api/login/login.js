import axios from "axios";


const baseURL = process.env.REACT_APP_API_URL;

const loginService = async (data) => {
    try {
        let response = await axios.post(baseURL + '/tasks/api/login/', { ...data });
        let profile = null;
        if (response) profile = response.data;
        return profile
    } catch (error) {
        return error.response.data.error;
    }
}



export const loginAPI = {
    loginService
}