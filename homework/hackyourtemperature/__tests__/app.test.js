import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /', () => {
  it('It should specify json in the content type header', async () => {
    const response = await request.post('/weather').send({
      cityName: 'London',
    });
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('json'),
    );
  });

  it('should return weather information when valid cityName is provided', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'London' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('London:');
  });

  it('should return "City is not found!" when invalid cityName is provided', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'InvalidCity' });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toBe('City is not found!');
  });

  it('should return an error when no cityName is provided', async () => {
    const response = await request.post('/weather').send('');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('cityName is required');
  });
});
