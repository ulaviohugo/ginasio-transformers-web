import {
	HttpResponse,
	HttpClient,
	HttpRequestParams,
	HttpStatusCode
} from '@/data/protocols/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
	async request(data: HttpRequestParams): Promise<HttpResponse> {
		let axiosResponse: AxiosResponse
		try {
			axiosResponse = await axios.request({
				url: data.url,
				method: data.method,
				data: data.body,
				headers: data.headers
			})
		} catch (error) {
			axiosResponse = (error.response && {
				data: error.response.data?.message || error.response.data,
				status: error.response.status
			}) || {
				data:
					String(error.message)?.toLocaleLowerCase()?.indexOf('network') >= 0
						? 'Não foi possível ligar-se ao servidor. Verifique a sua conexão a internet ou tente novamente mais tarde.'
						: error.message,
				status: HttpStatusCode.unprocessable
			}
		}
		return {
			statusCode: axiosResponse.status,
			body: axiosResponse.data
		}
	}
}
