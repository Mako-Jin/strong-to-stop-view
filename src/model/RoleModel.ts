export interface RoleModel {
  roleId: string;
  roleName: string;
  roleDesc: string;
  isNeedAuthorized: number;
  roleStatus: number;
  createTime?: Date;
  createUser?: string;
  updateTime?: Date;
  updateUser?: string;
}

export interface RoleState {
  roleId: string;
  roleName: string;
}
