const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');

const TIKTOK_ACCESS_TOKEN = '77a3fab8002c9bf6f479d1dde486464309e17c32';
const TIKTOK_PIXEL_ID = 'D65KLI3C77UC1EV4ENPG';
const TEST_EVENT_CODE = 'TEST70527';
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

function sha256(data) {
    if (!data) return null;
    return crypto.createHash('sha256').update(data.toString()).digest('hex');
}

async function runTest() {
    console.log('🚀 Iniciando teste com event_source: web...');

    const payload = {
        event_source: 'web', // ADICIONADO
        event_source_id: TIKTOK_PIXEL_ID, // MUDANÇA IMPORTANTE (antes era pixel_code)

        // Formato para envio em lote (Array de eventos)
        data: [
            {
                event: 'ViewContent',
                event_time: Math.floor(Date.now() / 1000),
                event_id: `evt_${Date.now()}`,

                user: {
                    ip: '189.100.100.100',
                    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    email: sha256('teste@exemplo.com'),
                    phone: sha256('5511999999999')
                },
                properties: {
                    currency: 'BRL',
                    value: 10.00,
                    content_type: 'product',
                    content_id: 'test-product-1',
                    url: 'https://sinaldouniverso.netlify.app'
                }
            }
        ],
        test_event_code: TEST_EVENT_CODE // Fica fora do data[]
    };

    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
        const response = await axios.post(TIKTOK_API_URL, payload, {
            headers: {
                'Access-Token': TIKTOK_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        const log = `SUCCESS:\n${JSON.stringify(response.data, null, 2)}`;
        console.log(log);
        fs.writeFileSync('test-result.log', log);

    } catch (error) {
        let errorData = error.message;
        if (error.response) {
            errorData = JSON.stringify(error.response.data, null, 2);
        }

        const log = `ERROR:\n${errorData}`;
        console.error(log);
        fs.writeFileSync('test-result.log', log);
    }
}

runTest();
