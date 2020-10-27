import joi from 'joi';

export class ValidationErrorStub extends Error implements joi.ValidationError {
    public readonly name: 'ValidationError'

    public readonly isJoi: boolean

    public readonly details: joi.ValidationErrorItem[]

    public readonly _object: any

    constructor(
      name: 'ValidationError',
      isJoi: boolean,
      details: joi.ValidationErrorItem[],
    ) {
      super(name);
      this.name = name;
      this.isJoi = isJoi;
      this.details = details;
    }

    annotate() {
      return 'annotate_stub';
    }
}
