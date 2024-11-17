/**
 * Type to define the user data stored in a JWT
 */
interface JWTData {
  username: string;
  uuid: string;
  isAdmin: boolean;
};

export default JWTData;
