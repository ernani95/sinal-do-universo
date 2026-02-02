const axios = require('axios');

const AMPLOPAY_BASE_URL = 'https://app.amplopay.com/api/v1';

/**
 * Generates a PIX charge using Amplopay API
 * @param {Object} paymentData 
 * @param {string} paymentData.identifier - Unique ID for the transaction
 * @param {number} paymentData.amount - Amount in BRL
 * @param {Object} paymentData.client - Client data (name, email, phone, document)
 * @returns {Promise<Object>} - Amplopay response with QR Code and transaction ID
 */
async function createPixCharge(paymentData) {
    try {
        const response = await axios.post(`${AMPLOPAY_BASE_URL}/gateway/pix/receive`, {
            identifier: paymentData.identifier,
            amount: paymentData.amount,
            client: {
                name: paymentData.client.name,
                email: paymentData.client.email,
                phone: paymentData.client.phone,
                document: paymentData.client.document // CPF/CNPJ
            },
            // Metadata for tracking
            metadata: {
                source: 'sinal-do-universo',
                readingId: paymentData.identifier
            },
            // We'll configure the webhook URL in the app later
            callbackUrl: process.env.WEBHOOK_URL || 'https://your-domain.com/api/webhooks/amplopay'
        }, {
            headers: {
                'x-public-key': process.env.AMPLOPAY_PUBLIC_KEY,
                'x-secret-key': process.env.AMPLOPAY_SECRET_KEY,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Amplopay API Error:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Fetches transaction details by ID
 */
async function getTransactionStatus(transactionId) {
    try {
        const response = await axios.get(`${AMPLOPAY_BASE_URL}/gateway/transactions`, {
            params: { id: transactionId },
            headers: {
                'x-public-key': process.env.AMPLOPAY_PUBLIC_KEY,
                'x-secret-key': process.env.AMPLOPAY_SECRET_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Amplopay Status Error:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    createPixCharge,
    getTransactionStatus
};
