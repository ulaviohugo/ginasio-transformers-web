export class FileUtils {
	static readonly IMG_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'ico']
	static readonly SIZE_1MB = 1024 * 1024
	static readonly SIZE_10MB = this.SIZE_1MB * 10

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

		return occurrences < 1 ? '' : splitFileName[occurrences - 1]
	}
}
