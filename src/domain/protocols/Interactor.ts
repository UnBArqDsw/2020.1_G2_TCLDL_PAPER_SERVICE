export interface Interactor<Parameter, Return = Parameter> {
  execute: (data: Parameter) => Promise<Return>
}
