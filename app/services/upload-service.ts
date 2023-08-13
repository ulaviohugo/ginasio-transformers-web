import fs from 'fs/promises'
import path from 'path'
import { FileUtils, StringUtils } from '../utils'
import { Uploader } from '../data/protocols/services'

export class UploadService implements Uploader {
	constructor(
		private readonly file?: File,
		private readonly path?: string
	) {}

	async upload() {
		const file = this.file
		if (!file) {
			throw new Error('Nenhum arquivo selecionado')
		}
		const allowedExtensions = FileUtils.IMG_EXTENSIONS

		if (file.size > FileUtils.SIZE_1MB) {
			throw new Error('O tamanho do arquivo excedeu o permitido.')
		}
		const fileExtension = FileUtils.getExt(file.name)
		if (!allowedExtensions.includes(fileExtension)) {
			throw new Error('Extensão de arquivo não permitido.')
		}
		const fileNameWithNoExt = FileUtils.getNameWithNoExt(file.name)
		const sanitizedFileName = StringUtils.slug(fileNameWithNoExt)

		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)

		const subfolderPath = `${FileUtils.UPLOAD_ABSOLUTE_PATH}${this.path || ''}`
		const filename = sanitizedFileName + '.' + fileExtension
		let filePath = path.join(subfolderPath, filename)

		try {
			await fs.mkdir(subfolderPath, { recursive: true })

			let i = 1
			let fileExists = await this.fileExists(
				path.join(subfolderPath, sanitizedFileName + '.' + fileExtension)
			)
			if (fileExists) {
				while (fileExists) {
					const newPath = path.join(
						subfolderPath,
						sanitizedFileName + `-${i}` + '.' + fileExtension
					)
					fileExists = await this.fileExists(newPath)
					filePath = newPath
					i++
				}
			}

			await fs.writeFile(filePath, buffer)

			const relativePath = `${FileUtils.UPLOAD_RELATIVE_PATH}/${
				this.path ? this.path + '/' : ''
			}${filename}`
			return relativePath
		} catch (error: any) {
			console.error('Erro ao carregar arquivo:', error)
			throw new Error(`Ocorreu um erro ao carregar arquivo`)
		}
	}

	async delete(path: string) {
		const fileExists = await this.fileExists(path)
		if (!fileExists) return
		await fs.unlink(path)
	}

	private async fileExists(filePath: string): Promise<boolean> {
		try {
			await fs.access(filePath)
			return true
		} catch {
			return false
		}
	}
}
