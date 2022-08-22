import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as any as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.url)

    return this.client.db().collection(name)
  },

  map: ({ _id, ...collection }: any): any => {
    return {
      ...collection,
      id: _id.toString()
    }
  }
}
