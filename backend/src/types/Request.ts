/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      name: string;
      email: string;
      isADmin: boolean;
      token: string;
    };
  }
}
