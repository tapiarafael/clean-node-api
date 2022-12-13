import { LogErrorRepository } from '../../data/protocols/db/log-repository/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepositor: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepositor
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) await this.logErrorRepository.logError(httpResponse.body.stack)

    return httpResponse
  }
}
