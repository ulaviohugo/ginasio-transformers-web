export class NotFoundError extends Error {
  constructor(message: string = 'Registo não encontrado') {
    super(message)
    this.name = 'NotFoundError'
  }
}
