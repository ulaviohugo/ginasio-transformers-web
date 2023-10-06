export function dbErrorHandler(error: any) {
	const handledError = error
	switch (error.name) {
		case 'PrismaClientInitializationError':
			handledError.message =
				'Não foi possível se conectar ao banco de dados' + error.message
			break

		default:
			break
	}
	return handledError
}
