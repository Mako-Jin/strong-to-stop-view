import { RoleState } from "./RoleModel";

export interface LoginModel {
  username: string;
  password: string;
  authType: string;
}

export interface UserModel {
  userId: string;
  username: string;
  nickName: string;
  avatar: string;
  phoneNum: string;
  emailAddress: string;
}

export interface UserState {
  userInfo: UserModel | null;
  accessToken: string;
  refreshToken: string;
  roleList: RoleState[];
}
