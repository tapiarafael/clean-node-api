import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { GetAccountByEmailRepository } from '../../protocols/db/account-repository/get-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  getAccountByEmailRepositoryStub: GetAccountByEmailRepository
}

const makeFakeAuthParams = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password'
})

const makeGetAccountByEmailRepositoryStub = (): GetAccountByEmailRepository => {
  class GetAccountByEmailRepositoryStub implements GetAccountByEmailRepository {
    async get (email: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new GetAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const getAccountByEmailRepositoryStub = makeGetAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(getAccountByEmailRepositoryStub)

  return {
    sut,
    getAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call GetAccountByEmailRepository with correct email', async () => {
    const { sut, getAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(getAccountByEmailRepositoryStub, 'get')
    await sut.auth(makeFakeAuthParams())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})