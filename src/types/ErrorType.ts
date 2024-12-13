export interface ErrorType extends Error {
  code?: number;
  details?: any;
}
