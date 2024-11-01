const axios = require('axios');

class ApiService {
    async sendData(endpoint, headers, body) {
        try {
            const response = await axios({
                method: 'POST',
                url: endpoint,
                headers: headers,
                data: body,
                timeout: 10000
            });

            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('API call failed:', error);
            throw new Error(`API call failed: ${error.message}`);
        }
    }
}

module.exports = new ApiService(); 