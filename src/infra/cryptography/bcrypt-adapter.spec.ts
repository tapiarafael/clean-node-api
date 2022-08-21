import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}))

describe('Bcryp Adapter', () => {
  test('Should call bcrypt with correct params ', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return a hash on success ', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)

    const result = await sut.encrypt('any_value')
    expect(result).toBe('hashed_password')
  })
})
