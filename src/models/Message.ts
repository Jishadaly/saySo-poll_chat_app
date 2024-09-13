import { Schema, model, Types, Document, models } from 'mongoose';
import { IUser } from './User';
import { IPoll } from './Poll';


export interface IMessage extends Document {
  poll: Types.ObjectId | IPoll;
  text: string;
  user: Types.ObjectId | IUser ; 
  time: Date;
}


const messageSchema = new Schema<IMessage>({
  poll: { type: Types.ObjectId, required:true},
  text: { type: String, required: true }, 
  user: { type: Types.ObjectId, ref: 'User', required: true }, 
  time: { type: Date, default: Date.now }, 
  
});


const Message =models.Message || model<IMessage>('Message', messageSchema);

export default Message;
