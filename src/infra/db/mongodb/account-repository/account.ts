import { ObjectID } from 'bson'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccount {
  async add (accountParams: AddAccountModel): Promise<AccountModel> {
    const accountColletion = MongoHelper.getCollection('accounts')

    const { insertedId } = await accountColletion.insertOne(accountParams)
    const { _id, ...account } = await accountColletion.findOne(insertedId) as AccountModel & {_id: ObjectID}

    return {
      ...account,
      id: _id.toString()
    }
  }
}
