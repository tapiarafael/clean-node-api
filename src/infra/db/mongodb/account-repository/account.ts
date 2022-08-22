import { AccountModel } from '../../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccount {
  async add (accountParams: AddAccountModel): Promise<AccountModel> {
    const accountColletion = MongoHelper.getCollection('accounts')

    const { insertedId } = await accountColletion.insertOne(accountParams)
    const account = await accountColletion.findOne(insertedId)

    return MongoHelper.map(account)
  }
}
