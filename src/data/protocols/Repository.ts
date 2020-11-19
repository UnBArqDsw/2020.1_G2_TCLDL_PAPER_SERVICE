export interface Repository<Parameter, Return = Parameter> {
  execute: (data: Parameter) => Promise<Return>
}
