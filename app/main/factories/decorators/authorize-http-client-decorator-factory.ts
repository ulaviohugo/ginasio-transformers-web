import { HttpClient } from '@/app/data/protocols/http'
import { makeLocalStorageAdapter } from '../cache'
import { makeFetchHttpClient } from '../http'
import { AuthorizeHttpClientDecorator } from '../../decorators'

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
	new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeFetchHttpClient())
