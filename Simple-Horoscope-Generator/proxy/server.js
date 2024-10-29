// proxy-server/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Route for fetching horoscope data
app.get('/api/horoscope/:sign', async (req, res) => {
  const { sign } = req.params;
  try {
    const response = await axios.get(`https://ohmanda.com/api/horoscope/${sign}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching horoscope:', error.message);
    res.status(500).json({ error: 'Failed to fetch horoscope' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
