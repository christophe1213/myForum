export type Reply = {
    id: string
    userId: string;
    message: string;
    createdAt: Date;
    replies:Reply[]
};

export type Thread = {
    id?:string
  title: string;
  description:string
  author: User;
  replies: Reply[];
  createdAt:Date
};
export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};