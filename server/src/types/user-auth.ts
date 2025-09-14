import { User } from "../models/user";

export interface UserAuth extends Omit<User, "password" | "createdAt"> {
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth | null;
    }
  }
}
