import { Schema, model, Types, Document, models } from 'mongoose';
import { IOption } from './Options.js';
import { IMessage } from './Message';
import { IUser } from './User.js';


export interface IPoll extends Document {
  
  question: string;
  options: Types.ObjectId[] | IOption[]; // Array of option IDs
  votedUsers: Types.ObjectId[] | IUser[]; // Users who voted
  chatUsers: Types.ObjectId[] | IUser[]; // Users who started chats
  messages: Types.ObjectId[] | IMessage[]; // Array of message IDs (referencing Message)
}


const pollSchema = new Schema<IPoll>({
  question: { type: String, required: true }, // Poll question
  options: [{ type: Types.ObjectId, ref: 'Option' }], // Array of option IDs
  votedUsers: [{ type: Types.ObjectId, ref: 'User' }], // Users who voted
  chatUsers: [{ type: Types.ObjectId, ref: 'User' }], // Users who started chats
  messages: [{ type: Types.ObjectId, ref: 'Message' }], // Messages in the poll
});


const Poll = models.Poll || model<IPoll>('Poll', pollSchema);

export default Poll;


// import { Schema, model, Types, Document, models } from 'mongoose';
// import { IOption } from './Options';
// import { IMessage } from './Message';
// import { IUser } from './User';

// // Poll Interface
// export interface IPoll extends Document {
//   question: string;
//   options: Types.ObjectId[] | IOption[];
//   votedUsers: Types.ObjectId[] | IUser[];
//   chatUsers: Types.ObjectId[] | IUser[];
//   messages: Types.ObjectId[] | IMessage[];
// }

// // Poll Schema
// const pollSchema = new Schema<IPoll>({
//   question: { type: String, required: true },
//   options: [{ type: Types.ObjectId, ref: 'Option' }],
//   votedUsers: [{ type: Types.ObjectId, ref: 'User' }],
//   chatUsers: [{ type: Types.ObjectId, ref: 'User' }],
//   messages: [{ type: Types.ObjectId, ref: 'Message' }],
// });

// // Check if the Poll model already exists before defining it
// const Poll = models.Poll || model<IPoll>('Poll', pollSchema);

// export default Poll;
