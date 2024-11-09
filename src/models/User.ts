import { Schema, model, Document, models } from 'mongoose';


export interface IUser extends Document {
  username: string;
  email: string;
  profile:string;
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  profile:{type:String, required:true},
  },{
    timestamps: true
  });


const User = models.User || model<IUser>('User', userSchema);

export default User;