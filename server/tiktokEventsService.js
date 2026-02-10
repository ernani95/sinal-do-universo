const axios = require('axios');
const crypto = require('crypto');

const TIKTOK_PIXEL_ID = 'D65KLI3C77UC1EV4ENPG';
const TIKTOK_ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

/**
 * SHA-256 hash function for PII data
 */
function sha256(data) {
    if (!data) return null;
    return crypto.createHash('sha256').update(data.toString()).digest('hex');
}

/**
 * Send event to TikTok Events API (Server-Side)
 * Matches TikTok Payload Helper structure
 */
async function sendTikTokEvent(eventData, testEventCode = null) {
    if (!TIKTOK_ACCESS_TOKEN) {
        throw new Error('TIKTOK_ACCESS_TOKEN is not configured in environment variables');
    }

    try {
        // Prepare User Data
        const userData = {
            ip: eventData.ip || '127.0.0.1',
            user_agent: eventData.user_agent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        };

        if (eventData.user) {
            if (eventData.user.email) userData.email = eventData.user.email;
            if (eventData.user.phone_number) userData.phone = eventData.user.phone_number;
            if (eventData.user.external_id) userData.external_id = eventData.user.external_id;
            if (eventData.user.ttclid) userData.ttclid = eventData.user.ttclid;
            if (eventData.user.ttp) userData.ttp = eventData.user.ttp;
        }

        // Prepare Properties
        const properties = {
            ...(eventData.properties || {}),
        };

        // Ensure contents array structure if content_id/type/name are present at top level or properties
        // This maps our internal simplified structure to TikTok's nested contents structure
        if ((eventData.content_id || eventData.content_name || eventData.content_category) && !properties.contents) {
            properties.contents = [{
                content_id: eventData.content_id,
                content_name: eventData.content_name,
                content_category: eventData.content_category,
                quantity: 1
            }];
        }

        // Add top-level property fields if passed in eventData (mapping flat to properties)
        if (eventData.currency) properties.currency = eventData.currency;
        if (eventData.value) properties.value = eventData.value;
        if (eventData.content_type) properties.content_type = eventData.content_type;
        if (eventData.status) properties.status = eventData.status;

        // Construct Event Object matching Payload Helper JSON structure
        const eventObject = {
            event: eventData.event_name,
            event_id: eventData.event_id || `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            event_time: Math.floor(Date.now() / 1000),
            user: userData,
            properties: properties,
            page: {
                url: eventData.page_url || 'https://sinaldouniverso.netlify.app'
            }
        };

        // Construct Final Batch Payload
        const payload = {
            event_source: 'web',
            event_source_id: TIKTOK_PIXEL_ID,
            data: [eventObject]
        };

        if (testEventCode) {
            payload.test_event_code = testEventCode;
        }

        console.log('📤 Sending to TikTok Events API (v1.3 Batch):');
        console.log(JSON.stringify(payload, null, 2));

        const response = await axios.post(TIKTOK_API_URL, payload, {
            headers: {
                'Access-Token': TIKTOK_ACCESS_TOKEN,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ TikTok Event sent successfully!');
        console.log('📊 Response:', JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        console.error('❌ TikTok Events API Error:');
        console.error('Status:', error.response?.status);
        if (error.response?.data) {
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Message:', error.message);
        }
        throw error;
    }
}

/**
 * Test TikTok Events API with test code
 */
async function testTikTokEventsAPI(testEventCode) {
    console.log('🧪 Testing TikTok Events API');
    console.log('📋 Test Code:', testEventCode);

    // Test CompleteRegistration event
    const testEvent = {
        event_name: 'CompleteRegistration',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ip: '127.0.0.1',
        page_url: 'https://sinaldouniverso.netlify.app/test-page',
        // Flat properties that will be mapped to nested structure
        currency: 'BRL',
        value: 0,
        status: 'complete',
        content_type: 'product',
        content_name: 'Tarot Reading Lead Form',
        user: {
            email: sha256('test@example.com'),
            phone_number: sha256('5511999999999') // API uses 'phone' but we map from 'phone_number' internally if needed
        }
    };

    return await sendTikTokEvent(testEvent, testEventCode);
}

module.exports = {
    sendTikTokEvent,
    testTikTokEventsAPI,
    sha256
};
