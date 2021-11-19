import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";

export class GeneralError extends Error {
  private _errorCode: number;
  constructor(message: string){
    super();
    this.message = message;
    this._errorCode = HttpResponseStatusCode.INTERNAL_ERROR
  }

  set errorCode(code: number) {
    this._errorCode = code;
  }

  get errorCode(): number {
    return this._errorCode;
  }
}

// ES6 instanceof 문제로 변경
export const BadRequest = (message: string) => {
  const error = new GeneralError(message)
  error.errorCode = HttpResponseStatusCode.BAD_REQUEST;
  return error
}

export const InvalidRequest = (message: string) => {
  const error = new GeneralError(`${message} is invalid`)
  error.errorCode = HttpResponseStatusCode.NOT_FOUND_ERROR;
  return error
}

export const NotFound = (message: string) => {
  const error = new GeneralError(message)
  error.errorCode = HttpResponseStatusCode.NOT_FOUND_ERROR;
  return error
}

