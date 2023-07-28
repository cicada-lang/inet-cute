export class InternalError extends Error {
  constructor(public message: string) {
    super(message)
  }
}
