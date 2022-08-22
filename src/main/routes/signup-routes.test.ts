import app from '../config/app'
import request from 'supertest'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'pass123',
        passwordConfirmation: 'pass123'
      })
      .expect(200)
  })
})
