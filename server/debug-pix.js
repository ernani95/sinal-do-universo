const axios = require('axios');

async function testPix() {
    try {
        // 1. Get a reading ID
        const initRes = await axios.post('http://localhost:3000/api/readings/init', {
            leadData: { name: 'Debugger', email: 'debug@test.com', phone: '11999999999' },
            question: 'Serei rico?',
            cards: [1, 2, 3]
        });

        const readingId = initRes.data.readingId;
        console.log('Reading ID:', readingId);

        // 2. Create PIX
        const pixRes = await axios.post('http://localhost:3000/api/payments/create-pix', { readingId });
        console.log('PIX Response Status:', pixRes.status);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testPix();
