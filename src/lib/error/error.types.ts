export type FieldError = {
  field: string;
  reason: string;
}

export class ApiError extends Error {
  public status: number;
  public code: string;
  public title: string;
  public detail?: string;
  public fields?: FieldError[];

  constructor(name: string, status: number, code: string, title: string, detail?: string, stack?: string, fields?: FieldError[]) {
    super(title);
    this.name = name;
    this.status = status;
    this.code = code;
    this.title = title;
    this.detail = detail;
    this.stack = stack;
    this.fields = fields;
  }
}

export class BadRequestError extends ApiError {
  constructor(errorData: ErrorData, fields?: FieldError[]) {
    super(ERRORS_TYPE.BAD_REQUEST, 400, errorData.code, errorData.title, errorData.detail, undefined, fields);
  }
}

export class NotFoundError extends ApiError {
  constructor(errorData: ErrorData) {
    super(ERRORS_TYPE.NOT_FOUND, 404, errorData.code, errorData.title, errorData.detail);
  }
}

export class ProjectError extends ApiError {
  constructor(errorData: ErrorData) {
    super(ERRORS_TYPE.ERROR, 500, errorData.code, errorData.title, errorData.detail);
  }
}

export const ERRORS_TYPE = {
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  ERROR: 'ERROR',
};

export type ErrorData = {
  code: string;
  title: string;
  detail?: string;
}

export type WsErrorsType = {
  badRequest: {
    default: ErrorData,
  },
  notFound: {
    default: ErrorData
  },
  ERROR: ErrorData
};

export const WsErrors: WsErrorsType = {
  badRequest: {
    default: {
      code: '/badrequest',
      title: 'Request data does not respect the required format',
      detail: '',
    },
  },
  notFound: {
    default: {
      code: '/notfound',
      title: 'The requested resource does not exist',
    },
  },
  ERROR: {
    code: '/error/default',
    title: 'An error has occurred',
    detail: '',
  },
};
