import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

const API = 'https://api.donutsmp.net';
const KEY = process.env.API_KEY;

app.use(cors());

app.use('/api', async (req, res) => {
    try {
      const path = req.url; // already starts with /v1/...
      const url = `${API}${path}`;
  
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
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  });

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});