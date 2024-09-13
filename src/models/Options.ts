import { Schema, models,model, Types, Document } from 'mongoose';
import { IPoll } from './Poll';
import { IUser } from './User';

// Option Interface
export interface IOption extends Document {
  text: string;
  poll: Types.ObjectId | IPoll; // Reference to Poll
  votedUsers:Types.ObjectId[]|IUser;
  voteCount:string ;
}

// Option Schema
const optionSchema = new Schema<IOption>({
  text: { type: String, required: true }, // Option text
  poll: { type: Types.ObjectId, ref: 'Poll', required: true }, // Reference to the poll this option belongs to
  votedUsers: [{ type: Types.ObjectId, ref: 'User' }],
  voteCount :{ type: String}
});

// Option Model
const Option = models.Option || model<IOption>('Option', optionSchema);

export default Option;