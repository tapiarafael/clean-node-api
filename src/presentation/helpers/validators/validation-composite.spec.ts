import { InvalidParamError, MissingParamError } from '../../errors'
import { Validation } from '../../protocols/validation'
import { ValidationComposite } from './validation-composite'

interface SutType {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}
const makeSut = (): SutType => {
  const validationStubs = [
    makeValidation(),
    makeValidation()
  ]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    const [missingParamValidation] = validationStubs
    jest.spyOn(missingParamValidation, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    const [invalidParamError, missingParamValidation] = validationStubs
    jest.spyOn(invalidParamError, 'validate').mockReturnValueOnce(new InvalidParamError('field'))
    jest.spyOn(missingParamValidation, 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should return undefined if all validation passes', () => {
    const { sut } = makeSut()

    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeUndefined()
  })
})
