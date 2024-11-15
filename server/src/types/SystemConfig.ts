/**
 * Type to define the data in the SystemCOnfig table  
 */
type SystemConfig = {
  configUUID: string;
  setCreationLimit: number;
  creationCounter: number;
  currentDate: Date;
};

export default SystemConfig;