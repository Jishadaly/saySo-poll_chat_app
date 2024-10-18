export interface IOption {
    _id: string;
    text: string;
    poll: string;
    votedUsers: string[]; 
    voteCount:number
    percentage: number
  }