declare global {
  namespace Express{
  interface Request{
  user?: IUser;
  }
  }
  }

  export interface IUser {
    email: string;
    id: string;
}