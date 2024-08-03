export class ConnectionError extends Error {
  constructor(message: string) {
    super(message)
    console.error('ConnectionError', message)
  }
}
