export abstract class GenericResponse<T> {
  success: boolean;

  payload: T | T[];

  message?: string;
}
