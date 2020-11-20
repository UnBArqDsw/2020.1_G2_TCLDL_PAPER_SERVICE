import joi from 'joi';
import { AbstractRequestValidator } from './AbstractRequestValidator';

export class CreatePaperRequestValidator extends AbstractRequestValidator {
  constructor() {
    super(joi.object({
      name: joi.string(),
      author: joi.string(),
      dateSubmission: joi.date(),
      link: joi.string().uri(),
      codeLink: joi.string().uri(),
      domain: joi.string(),
      dataset: joi.string(),
      modelName: joi.string(),
      accuracyInformation: joi.object({
        accuracy: joi.string().regex(/^\d+(\.\d+)?$/),
      }),
      modelInformation: joi.object({
        trainingTime: joi.string().regex(/^\d+(\.\d+)?$/),
        trainingDataSize: joi.string(),
        epochs: joi.string(),
      }),
      hardwareInformation: joi.object({
        cpuModel: joi.string(),
        cpuCores: joi.number(),
        cpuGflops: joi.string(),
        gpuModel: joi.string(),
        gpuCores: joi.number(),
        gpuGflops: joi.string(),
        tpuModel: joi.string(),
        tpuCores: joi.number(),
        tpuGflops: joi.string(),
      }),
    }));
  }
}
