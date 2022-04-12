import { IWilder } from '../models/wilder.model'
import WilderModel from '../models/wilder.model'

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    getAllWilders: async (): Promise<IWilder[]> => {
      return await WilderModel.find()
    },
    getWilderById: async (_: unknown, args: { id: string }): Promise<IWilder | unknown> => {
      try {
        const res = await WilderModel.findById(args.id)
        return res
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    createWilder: async (_: unknown, args: { name: string, city: string }): Promise<IWilder | unknown> => {
      const wilder = new WilderModel({
        name: args.name,
        city: args.city
      })
      try {
        return await wilder.save()
      } catch (error) {
        return error
      }
    },
    updateWilder: async (
      _: unknown,
      args: { id: string, name?: string, city?: string }
    ): Promise<IWilder | unknown> => {
      try {
        return await WilderModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              city: args.city
            }
          },
          { new: true }
        )
      } catch (error) {
        return error
      }
    },
    deleteWilder: async (_: unknown, args: { id: string }): Promise<IWilder | unknown> => {
      try {
        return await WilderModel.findByIdAndDelete(args.id)
      } catch (error) {
        return error
      }
    }
  }
}
