const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {
    pastSales,
    generateWeeklyIndicators
} = require('./tools')

const app = express();
const port = process.env.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/first_week', (req, res) => {
    futureSales = []
  res.json({ past_sales: pastSales, state: generateWeeklyIndicators(0)});
});

app.post('/next_week', (req, res) => {
    const { week } = req.body
    res.json({state : generateWeeklyIndicators(week)})
});

let futureSales = []
app.post('/predict', (req, res) => {
    const { week } = req.body;
    let min; let max;
    if (week % 40 <= 5 ) {
        min = 13000; max = 27000 
    }
    else {
        min = 14000; max = 17000;
    }
    
    futureSales.push( Math.random() * (max - min) + min)
    res.json({ future_sales : futureSales })
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
