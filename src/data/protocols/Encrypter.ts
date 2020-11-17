export interface Encrypter {
  encrypt: (value: string) => Promise<string>
  compare: (stringEncrypted: string, stringNotEncrypted: string) => Promise<boolean>
}
