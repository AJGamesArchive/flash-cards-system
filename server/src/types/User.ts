/**
 * Type to define the full user data
 */
export type FullUser = {
	userUUID: string;
	username: string;
	password: string;
	adminFlag: boolean;
	userSince: Date;
	loginToken: string | null;
	deleted: boolean;
	apiAccount: boolean;
};

/**
 * Type to define the front-facing user data
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
