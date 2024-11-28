/**
 * Interface to define the additional options that can be passed to an API request hook
 */
interface APIRequestHookOptions {
  immediate?: boolean;
  ignoreStatusCodes?: number[];
};

export default APIRequestHookOptions;