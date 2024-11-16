/**
 * Type to define the data that powers users
 */
type User = {
  userUUID: string;
  username: string;
  password: string;
  adminFlag: boolean;
  loginToken: string | null;
  userSince: Date;
  deleted: boolean;
};

export default User;