import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { GetAccountByEmailRepository } from '../../protocols/get-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly getAccountByEmailRepository: GetAccountByEmailRepository

  constructor (getAccountByEmailRepository: GetAccountByEmailRepository) {
    this.getAccountByEmailRepository = getAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.getAccountByEmailRepository.get(authentication.email)
    return ''
  }
}
