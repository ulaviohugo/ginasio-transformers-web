export class FileUtils {
	static readonly IMG_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'ico', 'webp']
	static readonly SIZE_1MB = 1024 * 1024
	static readonly SIZE_10MB = this.SIZE_1MB * 10
	// static readonly UPLOAD_ABSOLUTE_PATH = (process.cwd(), 'public', 'uploads')
	static readonly UPLOAD_ABSOLUTE_PATH = 'public/uploads'
	static readonly UPLOAD_RELATIVE_PATH = '/uploads'

	static getNameWithNoExt(file: File | string) {
		const fileName: string = (file as any)?.name || file
		const splitFileName = fileName.split('.')
		const occurrences = splitFileName.length

		return occurrences < 1 ? fileName : splitFileName[occurrences - 2]
	}

	static getExt(file: File | string) {
		const fileName: string = (file as any)?.name || file
		const splitFileName = fileName.split('.')
		const occurrences = splitFileName.length

		return occurrences < 1 ? '' : splitFileName[occurrences - 1]?.toLocaleLowerCase()
	}

	static getUploadPath(filePath: string) {
		const newFilePath = filePath.replace(this.UPLOAD_RELATIVE_PATH, '')
		return `${this.UPLOAD_RELATIVE_PATH}${newFilePath}`
	}

	static getUploadAbsolutePath(filePath: string) {
		const newFilePath = filePath.replace(this.UPLOAD_RELATIVE_PATH, '')
		return `${this.UPLOAD_ABSOLUTE_PATH}${newFilePath}`
	}

	static async toBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result as any)
			reader.onerror = reject
		})
	}

	static async urlToBase64(imageUrl: string): Promise<string> {
		return new Promise((resolve, reject) => {
			fetch(imageUrl)
				.then((response) => {
					return response.blob()
				})
				.then((blob) => {
					const reader = new FileReader()
					reader.readAsDataURL(blob)
					reader.onload = () => resolve(reader.result as any)
					reader.onerror = reject
				})
				.catch(reject)
		})
	}
}
