const express = require('express');
const router = express.Router();
const axios = require('axios');

const EXTERNAL_ENDPOINT = 'https://6728fd8f6d5fa4901b6bc529.mockapi.io/journeys/test/post';

router.post('/execute', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        
        if (!req.body.inArguments || !req.body.inArguments.length) {
            throw new Error('No inArguments received');
        }

        // Combine all inArguments into a single object
        const payload = req.body.inArguments.reduce((acc, curr) => {
            return { ...acc, ...curr };
        }, {});

        // Add testField if not already present
        if (!payload.testField) {
            payload.testField = "shyamm-ram-test";
        }

        console.log('Final payload to send:', payload);

        // Make the API call
        const response = await axios.post(EXTERNAL_ENDPOINT, payload);
        console.log('External API response:', response.data);

        res.status(200).json({
            status: 'ok',
            payload: payload
        });
    } catch (error) {
        console.error('Execute Error:', error);
        res.status(500).json({
            status: 'error',
            error: error.message,
            details: error.stack
        });
    }
});

router.post('/save', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            isConfigured: true
        }
    });
});

router.post('/publish', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            isConfigured: true
        }
    });
});

router.post('/validate', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            isConfigured: true
        }
    });
});

router.post('/stop', (req, res) => {
    res.status(200).json({
        status: 'success'
    });
});

module.exports = router; 