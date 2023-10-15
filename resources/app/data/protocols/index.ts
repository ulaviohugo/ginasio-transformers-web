export type QueryParams<T = any> = {
	filter?: { [key in keyof T]?: T[key] }
}
