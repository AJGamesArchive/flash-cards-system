/**
 * Type to define the Collection Set page params
 */
interface CollectionSetsParams extends Record<string, string> {
  collectionUUID: string;
  collectionName: string;
};

export default CollectionSetsParams;