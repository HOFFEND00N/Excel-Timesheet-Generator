import { getCredentialsFromEnvironment } from "../getCredentialsFromEnvironment";
import { getCredentials } from "../getCredentials";
import { areJiraCredentialsCorrect } from "../areJiraCredentialsCorrect";
import { getCredentialsFromCLI } from "../getCredentialsFromCLI";

jest.mock("../getCredentialsFromEnvironment");
jest.mock("../getCredentialsFromCLI");
jest.mock("../areJiraCredentialsCorrect");

test("should return credentials from environment", async () => {
  (getCredentialsFromEnvironment as jest.Mock).mockReturnValue({ login: "login", password: "password" });
  (areJiraCredentialsCorrect as jest.Mock).mockReturnValue(true);
  const expectedLogin = "login",
    expectedPassword = "password";

  const { login: actualLogin, password: actualPassword } = await getCredentials({
    env: { loginKey: "", passwordKey: "" },
  });

  expect(actualLogin).toEqual(expectedLogin);
  expect(actualPassword).toEqual(expectedPassword);
});

test("should return credentials from config, when credentials from environment are incorrect", async () => {
  (getCredentialsFromEnvironment as jest.Mock).mockReturnValue({ login: "bad login", password: "password" });
  (areJiraCredentialsCorrect as jest.Mock).mockImplementation(({ login }) => {
    return login !== "bad login";
  });
  const expectedLogin = "login",
    expectedPassword = "password";
  const encodedPassword = "cGFzc3dvcmQ=";

  const { login: actualLogin, password: actualPassword } = await getCredentials({
    login: "login",
    password: encodedPassword,
    env: { loginKey: "", passwordKey: "" },
  });

  expect(actualLogin).toEqual(expectedLogin);
  expect(actualPassword).toEqual(expectedPassword);
});

test("should return credentials from CLI, when credentials from environment and config are incorrect", async () => {
  (getCredentialsFromEnvironment as jest.Mock).mockReturnValue({ login: "bad login", password: "password" });
  (getCredentialsFromCLI as jest.Mock).mockReturnValue({ login: "login", password: "password" });
  (areJiraCredentialsCorrect as jest.Mock).mockImplementation(({ login }) => {
    return login !== "bad login";
  });
  const expectedLogin = "login",
    expectedPassword = "password";

  const { login: actualLogin, password: actualPassword } = await getCredentials({
    login: "bad login",
    password: "password",
    env: { loginKey: "", passwordKey: "" },
  });

  expect(actualLogin).toEqual(expectedLogin);
  expect(actualPassword).toEqual(expectedPassword);
});

test("should return credentials from config, when credentials from environment are not present", async () => {
  (getCredentialsFromCLI as jest.Mock).mockReturnValue({ login: "login", password: "password" });
  (areJiraCredentialsCorrect as jest.Mock).mockImplementation(({ login }) => {
    return login !== "bad login";
  });
  const expectedLogin = "login",
    expectedPassword = "password";
  const encodedPassword = "cGFzc3dvcmQ=";

  const { login: actualLogin, password: actualPassword } = await getCredentials({
    login: "login",
    password: encodedPassword,
  });

  expect(actualLogin).toEqual(expectedLogin);
  expect(actualPassword).toEqual(expectedPassword);
});

test("should return credentials from CLI, when credentials from environment and config are not present", async () => {
  (getCredentialsFromCLI as jest.Mock).mockReturnValue({ login: "login", password: "password" });
  const expectedLogin = "login",
    expectedPassword = "password";

  const { login: actualLogin, password: actualPassword } = await getCredentials();

  expect(actualLogin).toEqual(expectedLogin);
  expect(actualPassword).toEqual(expectedPassword);
});
