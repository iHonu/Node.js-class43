import express from 'express';
import fetch from 'node-fetch';
import { keys } from './sources/keys.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    res.status(400).send({ error: 'cityName is required' });
    return;
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keys.API_KEY}`,
  );

  const data = await response.json();

  if (data.cod === '404') {
    res.send({ weatherText: 'City is not found!' });
  } else {
    const temperature = (data.main.temp - 273.15).toFixed(1);
    res.send({
      weatherText: `Current temperature in ${cityName}: ${temperature}°C`,
    });
  }
});

export default app;
