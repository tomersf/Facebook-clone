import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { IUser } from "../interfaces";
import {
  validateEmail,
  validateLength,
  validateUsername,
} from "../helpers/validation";
import { InvalidEmailError, EmailExistsError } from "../errors/EmailErrors";
import InvalidLengthError from "../errors/LengthError";
import { generateToken } from "../helpers/tokens";
import { sendVerificationEmail } from "../helpers/mailer";
import { ENVS, extractENV } from "../helpers/env";

export const register: RequestHandler = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body as IUser;

    if (!validateEmail(email)) {
      const error = new InvalidEmailError();
      return res.status(error.status).json({ message: error.message });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new EmailExistsError();
      return res.status(error.status).json({ message: error.message });
    }

    if (!validateLength(firstName, 3, 30)) {
      const error = new InvalidLengthError(3, 30, "firstName");
      return res.status(error.status).json({ message: error.message });
    }

    if (!validateLength(lastName, 3, 30)) {
      const error = new InvalidLengthError(3, 30, "lastName");
      return res.status(error.status).json({ message: error.message });
    }

    if (!validateLength(password, 6, 40)) {
      const error = new InvalidLengthError(3, 30, "password");
      return res.status(error.status).json({ message: error.message });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = firstName + lastName;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      firstName,
      lastName,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${extractENV(
      ENVS.BASE_URL
    )}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.firstName, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
      verified: user.verified,
      message: "Register Success! Please activate your email",
    });
  } catch (error) {
    const message = (error as Error).message ?? "Something went wrong...";
    res.status(500).json({
      message,
    });
  }
};

export const activateAccount: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const userPayload = jwt.verify(
      token,
      extractENV(ENVS.TOKEN_SECRET)
    ) as jwt.JwtPayload;
    const user = await User.findById(userPayload.id);
    if (user?.verified) {
      return res
        .status(400)
        .json({ message: "This email is already activated!" });
    } else {
      await User.findByIdAndUpdate(user?.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfuly" });
    }
  } catch (error) {}
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email address you entered is not connected to an account",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials, Please try again!",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
      verified: user.verified,
      message: "Register Success! Please activate your email",
    });
  } catch (error) {}
};
