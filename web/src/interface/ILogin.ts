interface ILogin {
  data: {
    email: string;
    firstName: string;
    lastName: string;
    access_token: string,
    expires_in: number,
    expires_at: string,

  },
  error: string;
}

interface IUserInfo {
  email: string;
  firstName: string;
  lastName: string;

}
export type { ILogin, IUserInfo }