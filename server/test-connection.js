const axios = require('axios');

const BACKEND_URL = 'https://gentle-magic-production-3016.up.railway.app';

async function checkConnection() {
    console.log(`📡 Testando conexão com: ${BACKEND_URL}`);

    try {
        // 1. Testar rota raiz (Health Check)
        console.log('\n1. Verificando status do servidor (GET /)...');
        const rootResponse = await axios.get(BACKEND_URL);
        console.log('✅ Servidor Online:', rootResponse.data);

        // 2. Testar rota de eventos (OPTIONS - CORS Check)
        console.log('\n2. Verificando CORS (OPTIONS /api/tiktok/test-event)...');
        const optionsResponse = await axios.options(`${BACKEND_URL}/api/tiktok/test-event`);
        console.log('✅ CORS Headers:', optionsResponse.headers['access-control-allow-origin']);

    } catch (error) {
        console.error('\n❌ Erro de Conexão:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Dados:', error.response.data);
        } else {
            console.error('Erro:', error.message);
        }
    }
}

checkConnection();
