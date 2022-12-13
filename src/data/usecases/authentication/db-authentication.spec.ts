import { GetAccountByEmailRepository } from '../../protocols/get-account-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

interface SutTypes {
  sut: DbAuthentication
  getAccountByEmailRepositoryStub: GetAccountByEmailRepository
}

const makeGetAccountByEmailRepositoryStub = (): GetAccountByEmailRepository => {
  class GetAccountByEmailRepositoryStub implements GetAccountByEmailRepository {
    async get (email: string): Promise<AccountModel> {
      return {
        id: 'any_id',
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password'
      }
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
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
