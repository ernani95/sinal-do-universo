const axios = require('axios');

const TIKTOK_PIXEL_ID = 'D65KLI3C77UC1EV4ENPG';
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

/**
 * Send event to TikTok Events API (Server-Side)
 * @param {Object} eventData - Event data to send
 * @param {string} testEventCode - Optional test event code from TikTok
 */
async function sendTikTokEvent(eventData, testEventCode = null) {
    if (!TIKTOK_ACCESS_TOKEN) {
        throw new Error('TIKTOK_ACCESS_TOKEN is not configured in environment variables');
    }

    try {
        const payload = {
            pixel_code: TIKTOK_PIXEL_ID,
            event: eventData.event_name,
            timestamp: new Date().toISOString(),
            context: {
                user_agent: eventData.user_agent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                ip: eventData.ip || '127.0.0.1',
                page: {
                    url: eventData.page_url || 'https://sinaldouniverso.netlify.app'
                }
            },
            properties: eventData.properties || {}
        };

        // Add user data if available (hashed)
        if (eventData.user) {
            payload.context.user = eventData.user;
        }

        // Add test event code if provided
        if (testEventCode) {
            payload.test_event_code = testEventCode;
        }

        console.log('📤 Sending to TikTok:', JSON.stringify(payload, null, 2));

        const response = await axios.post(TIKTOK_API_URL, payload, {
            headers: {
                'Access-Token': TIKTOK_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ TikTok Event sent successfully:', eventData.event_name);
        console.log('📊 Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('❌ TikTok Events API Error:');
        console.error('Status:', error.response?.status);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
        console.error('Message:', error.message);
        throw error;
    }
}

/**
 * Test TikTok Events API with test code
 */
async function testTikTokEventsAPI(testEventCode) {
    console.log('🧪 Testing TikTok Events API with code:', testEventCode);
    console.log('🔑 Access Token configured:', TIKTOK_ACCESS_TOKEN ? 'Yes' : 'No');

    // Test CompleteRegistration event
    const testEvent = {
        event_name: 'CompleteRegistration',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ip: '127.0.0.1',
        page_url: 'https://sinaldouniverso.netlify.app',
        properties: {
            currency: 'BRL'
        },
        user: {
            email: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // SHA-256 hash
            phone_number: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        }
    };

    try {
        const result = await sendTikTokEvent(testEvent, testEventCode);
        console.log('✅ Test successful!');
        return result;
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        throw error;
    }
}

module.exports = {
    sendTikTokEvent,
    testTikTokEventsAPI
};
