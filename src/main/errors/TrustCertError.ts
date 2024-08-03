export class TrustCertError extends Error {
  dataKey: string

  constructor(message: string, dataKey: string) {
    super(message)
    this.dataKey = dataKey
  }
}
