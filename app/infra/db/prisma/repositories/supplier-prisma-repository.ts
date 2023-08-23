import { SupplierRepository } from '@/app/data/protocols'
import { prismaService } from '..'
import { Supplier } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaSupplierMapper } from '../mappers'

export class SupplierPrismaRepository implements SupplierRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: Supplier): Promise<Supplier> {
		return (await this.prisma.supplier.create({
			data: PrismaSupplierMapper.toPrisma(param),
			include: {
				supplierProducts: {
					select: { categoryId: true, productId: true, unitPrice: true }
				}
			}
		})) as Supplier
	}

	async loadAll(): Promise<Supplier[]> {
		return (await this.prisma.supplier.findMany({
			include: {
				supplierProducts: {
					select: { categoryId: true, productId: true, unitPrice: true }
				}
			}
		})) as Supplier[]
	}

	async findById(id: number): Promise<Supplier | null> {
		return (await this.prisma.supplier.findUnique({
			where: { id }
		})) as Supplier
	}

	async findByEmail(email: string): Promise<Supplier | null> {
		return (await this.prisma.supplier.findUnique({
			where: { email }
		})) as Supplier
	}

	async count(): Promise<number> {
		return this.prisma.supplier.count()
	}

	async update(param: Supplier): Promise<Supplier> {
		return (await this.prisma.supplier.update({
			data: PrismaSupplierMapper.toPrisma(param),
			where: { id: param.id },
			include: {
				supplierProducts: {
					select: { categoryId: true, productId: true, unitPrice: true }
				}
			}
		})) as Supplier
	}

	async delete(supplierId: number): Promise<boolean> {
		const deletedSupplier = await this.prisma.supplier.delete({
			where: { id: supplierId }
		})
		return !!deletedSupplier
	}
}
