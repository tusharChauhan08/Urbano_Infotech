const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

beforeAll(async () => {
  await User.sync({ force: true });
});

describe('Authentication API', () => {
  it('should signup a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Signup successful, please check your email to verify your account');
  });

  it('should not login unverified user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Invalid credentials or unverified email');
  });
});
