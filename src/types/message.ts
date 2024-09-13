import { IUser } from "./user";

export interface IMessage {
    _id: string;
    poll: string;
    text: string;
    time: string;
    user: IUser;
    __v: number;
  }