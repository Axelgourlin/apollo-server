import { ApolloServer } from 'apollo-server'
import { connect } from 'mongoose'
import 'dotenv/config'
import { resolvers } from './resolvers/resolver'
import { typeDefs } from './types/typeDefs'

const Init = async (): Promise<void> => {
  try {
    await connect(`mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`, { autoIndex: true })
    console.log('Connected to database !')
  } catch (error) {
    console.log(error)
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}
Init()
