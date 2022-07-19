import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
import { getAllENVS } from "./env";

const { OAuth2 } = google.auth;

const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = getAllENVS();
const oauth_link = "https://developers.google.com/oauthplayground";
const auth = new OAuth2(MAILING_ID, MAILING_SECRET, oauth_link);

export const sendVerificationEmail = async (
  email: string,
  name: string,
  url: string
) => {
  console.log(EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET);
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = await auth.getAccessToken();
  if (!accessToken.token) throw Error("No valid access token!");

  const stmp = nodemailer.createTransport({
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken: accessToken.token,
    },
    service: "gmail",
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="" alt=""><span>Action require: Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Facebook clone. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook clone allows you to stay in touch with all your friends! share photos,events and more!</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
