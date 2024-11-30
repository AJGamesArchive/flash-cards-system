/**
 * Collection type
 */
type Collection = {
  collectionUUID: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorUUID: string;
  numSets: number;
};

export default Collection;