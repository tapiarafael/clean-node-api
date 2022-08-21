import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  body: error,
  statusCode: 400
})

export const serverError = (): HttpResponse => ({
  body: new ServerError(),
  statusCode: 500
})

export const ok = (data: any): HttpResponse => ({
  body: data,
  statusCode: 200
})
