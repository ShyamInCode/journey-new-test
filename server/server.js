const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const journeyRoutes = require('./routes/journey');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/journey', journeyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 