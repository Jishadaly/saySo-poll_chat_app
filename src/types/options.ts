export interface IOption {
    _id: string;
    text: string;
    poll: string;
    votedUsers: string[]; // Array of user IDs who voted
    voteCount:number
    percentage: number
  }