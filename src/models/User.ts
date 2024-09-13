import { Schema, model, Document, models } from 'mongoose';

// User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  profile:string;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  profile:{type:String, required:true},
  },{
    timestamps: true
  });

// User Model
const User = models.User || model<IUser>('User', userSchema);

export default User;