import { ApolloServer, gql } from 'apollo-server'
import { Schema, model, connect } from 'mongoose'
import 'dotenv/config'
import { IWilder } from './models/wilder.model'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  # This Book type has two fields: title and author
  #   type Book {
  #     title: String! # returns a String
  #     author: Author! # returns an Author
  #   }

  #   type Author {
  #     name: String!
  #     books: [Book] # A list of Books
  #   }

  type Skill {
    title: String!;
    votes: Int!;
  }

  type Wilder {
    id: ID!
    name: String!;
    city: String!;
    skills: [Skill];
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    wilders: [Wilder]
    getWilderById(wilderId: ID): Wilder
  }

  type Mutation {
    createWilder(wilder: Wilder): Wilder
    updateWilder(id: ID!, wilder: Wilder!): Post
  }
`

// prettier-ignore
const WilderSchema = new Schema<IWilder>({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }]
});

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getAllWilders: async (): Promise<IWilder[]> => {
      return await WilderSchema.find()
    }
  }
  // Mutation: {
  // }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const Init = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`, { autoIndex: true })
    console.log('Connected to database !')
  } catch (error) {
    console.log(error)
  }

  const server = new ApolloServer({ typeDefs, resolvers })

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}
Init()
