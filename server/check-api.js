const axios = require('axios');

const URL = 'https://gentle-magic-production-501f.up.railway.app/api/tiktok/test-event';

async function checkApi() {
    console.log(`POST ${URL}`);
    try {
        const res = await axios.post(URL, {
            testEventCode: 'TEST70527'
        });
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }
}

checkApi();
