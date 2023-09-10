import { HttpStatusCode } from '@/data/protocols/http'
import { adaptResponse } from '@/main/adapters'
import { UploadService } from '@/services'
import fs from 'fs'
import path from 'path'

type Params = {
	params: {
		filepath: string[]
	}
}

export async function GET(_req: Request, { params: { filepath } }: Params) {
	try {
		const imagePath = path.join(process.cwd(), `public/uploads/${filepath.join('/')}`)
		const fileExists = await new UploadService().fileExists(imagePath)

		if (!fileExists) return handleError('Imagem não encontrada')

		const imageBuffer = fs.readFileSync(imagePath)
		return new Response(imageBuffer)
	} catch (error: any) {
		return handleError('Imagem não encontrada')
	}
}

const handleError = (error: string) =>
	adaptResponse({ statusCode: HttpStatusCode.notFound, body: { error } })
