import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const { body, statusCode } = await controller.handle(httpRequest)

    if (statusCode >= 400) {
      return response.status(statusCode).json({ error: body.message })
    }

    response.status(statusCode).json(body)
  }
}
