import { HttpClient } from '@/data/protocols/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { makeFetchHttpClient } from '@/main/factories/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
	new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeFetchHttpClient())
