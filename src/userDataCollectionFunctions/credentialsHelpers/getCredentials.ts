import { ICredentials } from "../../models/ICredentials";
import { errorHandler } from "../../utils/errorHandler";
import { getCredentialsFromCLI } from "./getCredentialsFromCLI";
import { getCredentialsFromEnvironment } from "./getCredentialsFromEnvironment";
import { areJiraCredentialsCorrect } from "../areJiraCredentialsCorrect";

export async function getCredentials(credentials?: ICredentials) {
  let login, password;
  if (credentials && credentials.env) {
    ({ login, password } = getCredentialsFromEnvironment({
      loginKey: credentials.env.loginKey,
      passwordKey: credentials.env.passwordKey,
    }));
    if (!(await areJiraCredentialsCorrect({ login, password }))) {
      console.log(
        `Environment variables with login key = ${credentials.env.loginKey} and password key = ${credentials.env.passwordKey} are incorrect`
      );
    } else {
      return { login, password };
    }
  }

  console.log("environment credentials keys in config didn't found");
  if (credentials && credentials.login && credentials.password) {
    login = credentials.login;
    const encodedPassword = credentials.password;
    password = Buffer.from(encodedPassword, "base64").toString("ascii");
    if (!(await areJiraCredentialsCorrect({ login, password }))) {
      console.log(`Config login = ${credentials.login} and password = ${credentials.password} are incorrect`);
    } else {
      return { login, password };
    }
  }

  console.log("credentials in config didn't found");
  ({ login, password } = await errorHandler(getCredentialsFromCLI));
  return { login, password };
}
