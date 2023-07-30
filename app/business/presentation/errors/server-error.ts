export class ServerError extends Error {
  constructor(stack: string) {
    super('Error no servidor')
    this.name = 'ServerError'
    this.stack = stack
  }
}
