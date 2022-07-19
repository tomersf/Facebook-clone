enum ENVS {
  PORT = "PORT",
  DATABASE_URL = "DATABASE_URL",
  TOKEN_SECRET = "TOKEN_SECRET",
  BASE_URL = "BASE_URL",
  EMAIL = "EMAIL",
  MAILING_ID = "MAILING_ID",
  MAILING_SECRET = "MAILING_SECRET",
  MAILING_REFRESH = "MAILING_REFRESH",
  MAILING_ACCESS = "MAILING_ACCESS",
}

const extractENV = (envVariable: ENVS | string): string | never => {
  const extractedVar = process.env[envVariable];
  if (!extractedVar) {
    throw new Error(`No variable ${envVariable} was found!`);
  }
  return extractedVar;
};

const getAllENVS = (): any | never => {
  const envsObject: any = {};
  Object.keys(ENVS).forEach((key) => {
    envsObject[key] = extractENV(key);
  });
  return envsObject;
};

export { extractENV, getAllENVS, ENVS };
