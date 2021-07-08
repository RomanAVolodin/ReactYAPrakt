import { IUser } from '../../../models/user';

export type TAuthStateType = {
  user: IUser | null;
  isUserFetching: boolean;
  accessToken?: string;
  refreshToken?: string;
};
