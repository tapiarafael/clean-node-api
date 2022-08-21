import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('Bcryp Adapter', () => {
  test('Should call bcrypt with correct params ', async () => {
    const SALT = 12
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })
})
