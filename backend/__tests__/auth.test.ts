import request from 'supertest'
import app from '../src/index'   // експортуй express-app із index.ts без .listen()

describe('Auth Routes', () => {
  it('реєстрація нового користувача', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'u1', email: 'u1@example.com', password: 'pass123' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message', 'User created')
  })

  it('логін існуючого користувача', async () => {
    await request(app)
      .post('/api/register')
      .send({ username: 'u2', email: 'u2@test.com', password: 'pass456' })

    const res = await request(app)
      .post('/api/login')
      .send({ usernameOrEmail: 'u2', password: 'pass456' })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
})
