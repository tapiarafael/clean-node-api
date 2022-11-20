import { ServerError, UnauthorizedError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const serverError = (error: Error): HttpResponse => ({
  body: new ServerError(error.stack),
  statusCode: 500
})

export const unauthorized = (): HttpResponse => ({
  body: new UnauthorizedError(),
  statusCode: 401
})

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200
})
