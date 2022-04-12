import { Schema, model } from 'mongoose'

export type Skill = { title: string, votes: number }

export interface IWilder {
  name: string;
  city: string;
  skills: Skill[];
}

// prettier-ignore
const WilderSchema = new Schema<IWilder>({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }]
});

// prettier-ignore
export default model<IWilder>('Wilder', WilderSchema)
