export interface Uploader {
	upload(): Promise<string>
	delete(path: string): Promise<void>
}
