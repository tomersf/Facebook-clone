import User from "../models/User";

export const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

export const validateLength = (text: string, min: number, max: number) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

export const validateUsername = async (username: string) => {
  let flag = false;

  do {
    let isUsernameExists = await User.findOne({ username });
    if (isUsernameExists) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      flag = true;
    } else {
      flag = false;
    }
  } while (flag);
  return username;
};
