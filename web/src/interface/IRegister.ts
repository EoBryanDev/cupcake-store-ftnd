interface IRegister {
  data: {

    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    legalId: string,
    birthDate: Date,
    createdAt: Date,
    token: string,
    expires_in: number,
    expires_at: string,

  },
  error: string;
}

export type { IRegister }
