/**
 * Type to define the data that powers users
 */
type User = {
  userUUID: string;
  username: string;
  adminFlag: boolean;
  userSince: Date;
  deleted: boolean;
  apiAccount: boolean;
};

export default User;