export class BadRequestError extends Error {
  constructor(fields: string) {
    super(`Invalid request body with error in this fields: ${fields}`);
    this.name = this.constructor.name;
  }
}
