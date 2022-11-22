import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'invalid_value ' })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should return undefined if validation succeeds', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })

    expect(error).toBeUndefined()
  })
})
