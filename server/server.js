require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const activityRoutes = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/journey', activityRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 