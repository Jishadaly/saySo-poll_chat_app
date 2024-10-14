import { IOption } from "./options";
export interface IPoll {
    _id: string;
    question: string;
    options: IOption[];
    votedUsers: string[];
    chatUsers: string[];
    messages: string[];
    __v: number;
    createdAt:Date
  }
  