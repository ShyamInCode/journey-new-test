const express = require('express');
const router = express.Router();
const axios = require('axios');

const EXTERNAL_ENDPOINT = 'https://journey-new-test.onrender.com/journeys/test/post';

router.post('/execute', async (req, res) => {
    try {
        const inArguments = req.body.inArguments[0];
        
        const payload = {
            email: inArguments.email,
            name: inArguments.name,
            contactKey: inArguments.contactKey
        };

        const response = await axios.post(EXTERNAL_ENDPOINT, payload);
        
        res.status(200).json({
            status: 'success',
            response: response.data
        });
    } catch (error) {
        console.error('Error executing journey:', error);
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});

router.post('/save', (req, res) => {
    res.status(200).json({ status: 'success' });
});

router.post('/publish', (req, res) => {
    res.status(200).json({ status: 'success' });
});

router.post('/validate', (req, res) => {
    res.status(200).json({ status: 'success' });
});

module.exports = router; 