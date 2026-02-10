const axios = require('axios');

const TIKTOK_PIXEL_ID = 'D65KLI3C77UC1EV4ENPG';
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN; // Você precisará gerar isso no TikTok Ads Manager
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

/**
 * Send event to TikTok Events API (Server-Side)
 * @param {Object} eventData - Event data to send
 * @param {string} testEventCode - Optional test event code from TikTok
 */
async function sendTikTokEvent(eventData, testEventCode = null) {
    try {
        const payload = {
            pixel_code: TIKTOK_PIXEL_ID,
            event: eventData.event_name,
            event_time: Math.floor(Date.now() / 1000),
            context: {
                user_agent: eventData.user_agent || 'Mozilla/5.0',
                ip: eventData.ip || '127.0.0.1',
                page: {
                    url: eventData.page_url || 'https://sinaldouniverso.netlify.app'
                }
            },
            properties: eventData.properties || {},
            ...(testEventCode && { test_event_code: testEventCode })
        };

        // Add user data if available (hashed)
        if (eventData.user) {
            payload.context.user = eventData.user;
        }

        const response = await axios.post(TIKTOK_API_URL, payload, {
            headers: {
                'Access-Token': TIKTOK_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ TikTok Event sent:', eventData.event_name);
        return response.data;
    } catch (error) {
        console.error('❌ TikTok Events API Error:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Test TikTok Events API with test code
 */
async function testTikTokEventsAPI(testEventCode) {
    console.log('🧪 Testing TikTok Events API with code:', testEventCode);

    // Test CompleteRegistration event
    const testEvent = {
        event_name: 'CompleteRegistration',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ip: '127.0.0.1',
        page_url: 'https://sinaldouniverso.netlify.app',
        properties: {
            contents: [{
                content_id: 'tarot-reading-lead',
                content_type: 'product',
                content_name: 'Tarot Reading Lead Form',
                content_category: 'Tarot Reading'
            }],
            currency: 'BRL',
            status: 'completed'
        },
        user: {
            email: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // SHA-256 hash of empty string (example)
            phone_number: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        }
    };

    try {
        const result = await sendTikTokEvent(testEvent, testEventCode);
        console.log('✅ Test successful!', result);
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
