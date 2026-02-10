const axios = require('axios');
require('dotenv').config();

const AMPLOPAY_BASE_URL = 'https://app.amplopay.com/api/v1';

async function testAmplopayConnection() {
    console.log('🔍 Testing Amplopay Configuration...\n');

    // 1. Check environment variables
    console.log('📋 Environment Variables:');
    console.log('AMPLOPAY_PUBLIC_KEY:', process.env.AMPLOPAY_PUBLIC_KEY ? '✅ Set' : '❌ Missing');
    console.log('AMPLOPAY_SECRET_KEY:', process.env.AMPLOPAY_SECRET_KEY ? '✅ Set' : '❌ Missing');
    console.log('');

    if (!process.env.AMPLOPAY_PUBLIC_KEY || !process.env.AMPLOPAY_SECRET_KEY) {
        console.error('❌ Missing Amplopay credentials in .env file!');
        console.log('\n📝 Add these to your .env file:');
        console.log('AMPLOPAY_PUBLIC_KEY=your_public_key_here');
        console.log('AMPLOPAY_SECRET_KEY=your_secret_key_here');
        return;
    }

    // 2. Test API connection with a minimal PIX charge
    try {
        console.log('🚀 Attempting to create test PIX charge...\n');

        const response = await axios.post(`${AMPLOPAY_BASE_URL}/gateway/pix/receive`, {
            identifier: `test-${Date.now()}`,
            amount: 14.90,
            client: {
                name: 'Test User',
                email: 'test@example.com',
                phone: '11999999999',
                document: '11111111111'
            },
            metadata: {
                source: 'sinal-do-universo-test',
                test: true
            }
        }, {
            headers: {
                'x-public-key': process.env.AMPLOPAY_PUBLIC_KEY,
                'x-secret-key': process.env.AMPLOPAY_SECRET_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ SUCCESS! Amplopay API is working!\n');
        console.log('📦 Response structure:');
        console.log('Response keys:', Object.keys(response.data));

        if (response.data.pix) {
            console.log('PIX keys:', Object.keys(response.data.pix));
            console.log('\n💎 PIX Code:', response.data.pix.code || response.data.pixCode || 'Not found');
            console.log('🖼️  QR Image:', response.data.pix.image || response.data.pix_image || 'Not found');
        }

        console.log('\n📄 Full response:');
        console.log(JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.error('❌ FAILED to create PIX charge!\n');

        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Error data:', JSON.stringify(error.response.data, null, 2));

            if (error.response.status === 401) {
                console.error('\n🔑 Authentication failed! Check your API keys.');
            } else if (error.response.status === 400) {
                console.error('\n📝 Invalid request data. Check the payload format.');
            }
        } else {
            console.error('Error message:', error.message);
        }
    }
}

testAmplopayConnection();
