require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors()); // Allow all origins for dev, restrict in prod
app.use(morgan('dev'));
app.use(express.json());

const supabase = require('./db');
const amplopay = require('./amplopayService');
const { generateInterpretation } = require('./geminiService');

// Routes
// 1. Health Check
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Sinal do Universo API is running',
        version: '1.0.0'
    });
});

// 2. Reading Initialization
app.post('/api/readings/init', async (req, res) => {
    try {
        const { leadData, question, cards } = req.body;
        console.log('📝 New Reading Request:', leadData.email);

        // Save to Supabase
        const { data, error } = await supabase
            .from('readings')
            .insert([
                {
                    user_name: leadData.name,
                    user_email: leadData.email,
                    user_phone: leadData.phone,
                    question: question,
                    cards_json: cards, // Should be an array of objects or IDs
                    status: 'PENDING'
                }
            ])
            .select() // Setup to return the created record
            .single();

        if (error) throw error;

        console.log('✅ Reading saved:', data.id);

        res.json({
            success: true,
            readingId: data.id,
            // In a real scenario, this would be a Stripe Checkout URL with client_reference_id = data.id
            paymentUrl: '/checkout-simulation'
        });

    } catch (error) {
        console.error('❌ Error saving reading:', error.message);
        res.status(500).json({ success: false, error: 'Database error' });
    }
});

// 3. Amplopay PIX Creation
app.post('/api/payments/create-pix', async (req, res) => {
    try {
        const { readingId } = req.body;

        // 1. Fetch reading/user info
        const { data: reading, error } = await supabase
            .from('readings')
            .select('*')
            .eq('id', readingId)
            .single();

        if (error || !reading) return res.status(404).json({ error: 'Reading not found' });

        // 2. Generate PIX via Amplopay
        const payment = await amplopay.createPixCharge({
            identifier: readingId,
            amount: 14.90, // Adjusted price as requested
            client: {
                name: reading.user_name,
                email: reading.user_email,
                phone: reading.user_phone,
                document: '11111111111' // Valid-format 11 digit string
            }
        });

        console.log('💎 Amplopay Response Keys:', Object.keys(payment));
        if (payment.pix) console.log('💎 Pix Keys:', Object.keys(payment.pix));

        // 3. Update reading with payment ID
        // Note: Using stripe_session_id as a temporary storage if payment_id doesn't exist
        const transId = payment.id || payment.transactionId || payment.transaction_id;

        const { error: updateError } = await supabase
            .from('readings')
            .update({
                stripe_session_id: transId, // Fallback to existing column
                status: 'PENDING' // Use valid enum value from schema.sql
            })
            .eq('id', readingId);

        if (updateError) {
            console.error('❌ Database update error:', updateError.message);
            // We continue anyway since we have the PIX code to show the user
        }

        const pixCodeString = payment.pix?.code || payment.pixCode || payment.pix_code;
        const qrCodeUrl = payment.pix?.image || payment.pix_image || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pixCodeString)}`;

        res.json({
            success: true,
            pixCode: pixCodeString,
            qrCode: qrCodeUrl,
            transactionId: transId
        });

    } catch (error) {
        console.error('❌ Error creating PIX:', error.message);
        res.status(500).json({ success: false, error: 'Payment gateway error' });
    }
});

// 4. Amplopay Webhook
app.post('/api/webhooks/amplopay', async (req, res) => {
    console.log('🔔 Amplopay Webhook Received:', JSON.stringify(req.body, null, 2));

    const { event, transaction, token } = req.body;

    // Token verification logic could go here

    if (event === 'TRANSACTION_PAID') {
        const readingId = transaction.identifier;
        console.log(`💰 Payment confirmed for reading: ${readingId}`);

        // Update DB
        const { error } = await supabase
            .from('readings')
            .update({ status: 'PAID' })
            .eq('id', readingId);

        if (error) console.error('Error updating status on payment:', error);
    }

    res.json({ status: 'received' });
});

// 5. Payment Status Check (Polling fallback)
app.get('/api/payments/status/:readingId', async (req, res) => {
    try {
        const { readingId } = req.params;
        const { data: reading } = await supabase
            .from('readings')
            .select('status')
            .eq('id', readingId)
            .single();

        res.json({ success: true, status: reading?.status });
    } catch (error) {
        res.status(500).json({ error: 'Status check failed' });
    }
});


// 4. Get Final Result (AI Integration)
app.get('/api/readings/:id/result', async (req, res) => {
    const { id } = req.params;
    console.log('🔮 Requesting result for:', id);

    try {
        // 1. Fetch Reading
        const { data: reading, error } = await supabase
            .from('readings')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !reading) {
            return res.status(404).json({ success: false, error: 'Reading not found' });
        }

        // 2. Check Payment Status (Simulation: Allow 'PENDING' for now to facilitate testing)
        // In prod: if (reading.status !== 'PAID') return res.status(403).json({ error: 'Payment required' });

        // 3. Check Cache (If interpretation already exists, return it)
        if (reading.interpretation) {
            console.log('⚡ Returning cached interpretation');
            return res.json({
                success: true,
                status: reading.status,
                interpretation: reading.interpretation
            });
        }

        // 4. Generate with AI (If not cached)
        console.log('🤖 Generating new interpretation with Gemini...');
        const aiResult = await generateInterpretation(reading);

        // 5. Save to Database (Cache)
        const { error: updateError } = await supabase
            .from('readings')
            .update({
                interpretation: aiResult,
                status: 'DELIVERED' // Mark as delivered/consumed
            })
            .eq('id', id);

        if (updateError) console.error('Error caching result:', updateError);

        // 6. Return Result
        res.json({
            success: true,
            status: 'DELIVERED',
            interpretation: aiResult
        });

    } catch (error) {
        console.error('❌ Error in result endpoint:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`);
});
