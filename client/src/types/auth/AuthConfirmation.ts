/**
 * Type to define the data returned from the API to confirm a users login state
 */
type AuthConfirmation = {
  loggedIn: boolean;
  user: {
    username: string;
    uuid: string;
    isAdmin: boolean;
  };
};

export default AuthConfirmation;