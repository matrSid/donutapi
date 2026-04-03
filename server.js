import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const API = 'https://api.donutsmp.net';
const KEY = process.env.API_KEY;

app.use(cors());

// Serve frontend
app.use(express.static(join(__dirname, 'public')));

// Proxy API calls
app.use('/api', async (req, res) => {
  try {
    const url = `${API}${req.url}`;
    const response = await fetch(url, {
      headers: {
        Authorization: KEY,
        Accept: 'application/json',
        'x-requested-with': 'XMLHttpRequest',
      },
    });
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));