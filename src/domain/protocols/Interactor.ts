export interface Interactor<Parameter, Return> {
  execute: (data: Parameter) => Promise<Return>
}
