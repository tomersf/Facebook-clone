import { Types } from "mongoose";

import IUserDetails from "./UserDetails";

export default interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  picture: string;
  cover: string;
  gender: string;
  bYear: number;
  bMonth: number;
  bDay: number;
  verified: boolean;
  friends: Types.Array<Types.ObjectId>;
  following: Types.Array<Types.ObjectId>;
  followers: Types.Array<Types.ObjectId>;
  requests: Types.Array<any>;
  search: Types.Array<Types.ObjectId>;
  details: IUserDetails;
  savedPosts: Types.Array<Types.ObjectId>;
}
