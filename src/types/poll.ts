import { IOption } from "./options";
export interface IPoll {
    _id: string;
    question: string;
    options: IOption[];
    __v: number;
    totalVotes:number
    createdAt:Date
  }
  