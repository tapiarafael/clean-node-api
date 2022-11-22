import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup/signup'

const controller = makeSignUpController()

export default (router: Router): void => {
  router.post('/signup', adaptRoute(controller))
}
