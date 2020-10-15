import { ValidationError } from 'joi';

export const sanitizeJoiError = (errors: ValidationError) => errors.details.map(
  (detail) => detail.context?.label,
).join(',');
