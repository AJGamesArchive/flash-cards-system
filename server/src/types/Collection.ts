/**
 * Type to define the data that powers a collection
 */
type Collection = {
	collectionUUID: string;
	name: string;
	description: string;
	createdOn: Date;
	updatedOn: Date;
	authorUUID: string;
};

export default Collection;
