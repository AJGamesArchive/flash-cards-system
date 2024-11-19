/**
 * Type to define the data required to hide specific flashcards from specific users
 */
type HiddenCardAllocation = {
	allocationUUID: string;
	userUUID: string;
	cardUUID: string;
};

export default HiddenCardAllocation;
