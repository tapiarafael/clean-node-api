import app from '../config/app'
import request from 'supertest'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test-body-parser', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test-body-parser')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
