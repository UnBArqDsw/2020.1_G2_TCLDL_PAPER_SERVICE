export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
  locals?: any
}

export interface HttpResponse {
  statusCode: number
  body?: any
}
