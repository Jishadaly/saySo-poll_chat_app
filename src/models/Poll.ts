import { Schema, model, Types, Document, models } from 'mongoose';
import { IOption } from './Options.js';

export interface IPoll extends Document {
  question: string;
  options: Types.ObjectId[] | IOption[]; 
  totalVotes:number
}

const pollSchema = new Schema<IPoll>({
  question: { type: String, required: true }, 
  options: [{ type: Types.ObjectId, ref: 'Option' }], 
  totalVotes:{ type:Number, default:0 }
}
,
 {
   timestamps: true
 }
);


const Poll = models.Poll || model<IPoll>('Poll', pollSchema);

export default Poll;

