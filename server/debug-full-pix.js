const axios = require('axios');

async function testPix() {
    try {
        const initRes = await axios.post('http://localhost:3000/api/readings/init', {
            leadData: { name: 'Debugger', email: 'debug@test.com', phone: '11999999999' },
            question: 'Serei rico?',
            cards: [1, 2, 3]
        });

        const readingId = initRes.data.readingId;
        const pixRes = await axios.post('http://localhost:3000/api/payments/create-pix', { readingId });
        console.log('FULL RESPONSE:', JSON.stringify(pixRes.data, null, 2));
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testPix();
