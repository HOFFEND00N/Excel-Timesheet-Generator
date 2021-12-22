export interface ICredentials {
  login?: string;
  password?: string;
  env?: {
    loginKey: string;
    passwordKey: string;
  };
}
