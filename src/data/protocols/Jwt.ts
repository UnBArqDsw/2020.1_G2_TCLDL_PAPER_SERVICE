export interface Jwt {
    generate(data: any): string
    verify(data: string): any
}
