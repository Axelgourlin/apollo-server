// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

import { gql } from 'apollo-server'

// your data.
export const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Skill {
    title: String!
    votes: Int!
  }

  type Wilder {
    id: ID!
    name: String!
    city: String!
    skills: [Skill]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getAllWilders: [Wilder]
    getWilderById(id: ID): Wilder
  }

  type Mutation {
    createWilder(name: String!, city: String!): Wilder
    updateWilder(id: ID!, name: String, city: String): Wilder
    deleteWilder(id: ID!): Wilder
  }
`
