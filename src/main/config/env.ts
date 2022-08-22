export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://root:mongodb@localhost:27017/clean-node-api?authSource=admin',
  port: process.env.port ?? 3000
}
