export function dbErrorHandler(error: any) {
	let handledError = error
	switch (error.name) {
		case 'PrismaClientInitializationError':
			handledError.message = 'Não foi possível se conectar ao banco de dados'
			break

		default:
			break
	}
	return handledError
}