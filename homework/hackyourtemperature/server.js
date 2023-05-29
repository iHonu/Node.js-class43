import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(`City name ${cityName} added`);
});

app.listen(3000);
