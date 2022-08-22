import app from '../config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  test('Should return default content type as json', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test-content-type')
      .expect('content-type', /json/)
  })
})
