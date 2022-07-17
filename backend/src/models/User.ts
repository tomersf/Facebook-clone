import { Schema, model } from "mongoose";

import { IUser } from "../interfaces";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true, text: true },
    lastName: { type: String, required: true, trim: true, text: true },
    username: {
      type: String,
      required: true,
      trim: true,
      text: true,
      unique: true,
    },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    picture: { type: String, default: "PICUTRE_URL" },
    cover: { type: String, trim: true },
    gender: { type: String, required: true, trim: true },
    bYear: { type: Number, required: true, trim: true },
    bDay: { type: Number, required: true, trim: true },
    bMonth: { type: Number, required: true, trim: true },
    verified: { type: Boolean, default: false },
    friends: [],
    search: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    details: {
      bio: String,
      otherName: String,
      job: String,
      workplace: String,
      highSchool: String,
      college: String,
      currentCity: String,
      hometown: String,
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: String,
    },
    followers: [],
    following: [],
    savedPosts: [
      {
        post: {
          type: Schema.Types.ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  { timestamps: true }
);

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

export default User;
