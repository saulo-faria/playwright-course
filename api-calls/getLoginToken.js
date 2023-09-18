const axios = require('axios');

export const getLoginToken = async(userDetails) => {
    try {
        const response = await axios.post("http://localhost:2221/api/login", {
            "username": userDetails.username, 
            "password": userDetails.password
        })        

        return response.data.token;

    } catch (error) {
        console.log(error);
    }
}
