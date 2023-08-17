import { LoadSuppliers } from '@/app/domain/usecases'
import { ok, serverError } from '../../helper'
import { Controller } from '../../protocols'
import { HttpResponse } from '@/app/data/protocols/http'

export class LoadSupplierController implements Controller {
	constructor(private readonly loadSupplier: LoadSuppliers) {}
	async handle(): Promise<HttpResponse> {
		try {
			const data = await this.loadSupplier.load()
			return ok(data)
		} catch (error) {
			return serverError(error)
		}
	}
}
