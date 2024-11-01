const express = require('express');
const router = express.Router();
const apiService = require('../services/apiService');

router.post('/save', (req, res) => {
    console.log('Save:', req.body);
    res.status(200).json({ success: true });
});

router.post('/publish', (req, res) => {
    console.log('Publish:', req.body);
    res.status(200).json({ success: true });
});

router.post('/validate', (req, res) => {
    console.log('Validate:', req.body);
    res.status(200).json({ success: true });
});

router.post('/execute', async (req, res) => {
    try {
        const { inArguments } = req.body;
        const config = inArguments[0];
        
        const result = await apiService.sendData(
            config.endpoint,
            config.headers,
            config.body
        );
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Execute error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 