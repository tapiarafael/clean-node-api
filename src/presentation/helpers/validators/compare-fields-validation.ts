import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols/validation'

export class CompareFieldsValidation implements Validation {
  private readonly field: string
  private readonly fieldToCompare: string

  constructor (field: string, fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate (input: any): Error | undefined {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }
  }
}
