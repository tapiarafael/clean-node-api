import { AccountModel } from '../usecases/add-account/db-add-account-protocols'

export interface GetAccountByEmailRepository {
  get: (email: string) => Promise<AccountModel>
}
