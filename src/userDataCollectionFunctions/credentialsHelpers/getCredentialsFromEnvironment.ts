export function getCredentialsFromEnvironment({ loginKey, passwordKey }: { loginKey: string; passwordKey: string }) {
  const login = process.env[loginKey];
  const encodedPassword = process.env[passwordKey];
  const password = Buffer.from(encodedPassword ?? "", "base64").toString("ascii");
  return { login, password };
}
