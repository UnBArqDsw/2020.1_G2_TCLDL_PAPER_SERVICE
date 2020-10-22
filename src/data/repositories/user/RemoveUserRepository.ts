export interface RemoveUserRepository {
  execute: (parameter: string) => Promise<void>
}
