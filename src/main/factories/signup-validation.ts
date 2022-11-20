
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const fields = ['name', 'email', 'password', 'passwordConfirmation']
  const validations: Validation[] = []

  for (const field of fields) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
