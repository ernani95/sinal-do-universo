const axios = require('axios');

const URL = 'https://gentle-magic-production-501f.up.railway.app/';

async function checkRoot() {
    try {
        console.log(`GET ${URL}`);
        const res = await axios.get(URL);
        console.log('Status:', res.status);
        console.log('Content-Type:', res.headers['content-type']);
        console.log('Data:', res.data);
    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.error('Data:', err.response.data);
        }
    }
}

checkRoot();
