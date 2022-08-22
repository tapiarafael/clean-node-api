import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}))

const SALT = 12
const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(SALT)

  return sut
}

describe('Bcryp Adapter', () => {
  test('Should call bcrypt with correct params', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()

    const result = await sut.encrypt('any_value')
    expect(result).toBe('hashed_password')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce((new Error()) as any as never)

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
