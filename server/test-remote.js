const axios = require('axios');

const TARGET_URL = 'https://gentle-magic-production-501f.up.railway.app/api/tiktok/test-event';

async function testRemote() {
    console.log(`📡 Testando POST em: ${TARGET_URL}`);
    try {
        const response = await axios.post(TARGET_URL, {
            testEventCode: 'TEST70527'
        });
        console.log('✅ Sucesso:', response.data);
    } catch (error) {
        console.error('❌ Erro na requisição:');
        console.error('Status:', error.response?.status);
        console.error('Headers:', error.response?.headers);
        console.log('--- Body Inicio ---');
        // Mostrar os primeiros 500 caracteres do corpo para identificar o HTML
        if (error.response?.data) {
            console.log(error.response.data.toString().substring(0, 500));
        }
        console.log('--- Body Fim ---');
    }
}

testRemote();
