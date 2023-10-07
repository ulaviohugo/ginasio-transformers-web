import { CustomerRepository } from '@/data/protocols'
import { prismaService } from '@/infra/db'
import { CustomerModel } from '@/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaCustomerMapper } from '@/infra/db/prisma/mappers'

export class CustomerPrismaRepository implements CustomerRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: CustomerModel): Promise<CustomerModel> {
		return (await this.prisma.customer.create({
			data: PrismaCustomerMapper.toPrisma(param)
		})) as CustomerModel
	}

	async loadAll(): Promise<CustomerModel[]> {
		return (await this.prisma.customer.findMany()) as CustomerModel[]
	}

	async findById(id: number): Promise<CustomerModel | null> {
		return (await this.prisma.customer.findUnique({
			where: { id }
		})) as CustomerModel
	}

	async findByEmail(email: string): Promise<CustomerModel | null> {
		return (await this.prisma.customer.findUnique({
			where: { email }
		})) as CustomerModel
	}

	async count(): Promise<number> {
		return this.prisma.customer.count()
	}

	async update(param: CustomerModel): Promise<CustomerModel> {
		return (await this.prisma.customer.update({
			data: PrismaCustomerMapper.toPrisma(param),
			where: { id: param.id }
		})) as CustomerModel
	}

	async delete(customer_id: number): Promise<boolean> {
		const deletedCustomer = await this.prisma.customer.delete({
			where: { id: customer_id }
		})
		return !!deletedCustomer
	}
}
