import { NotificationRepository } from '@/app/data/protocols'
import { prismaService } from '..'
import { NotificationModel } from '@/app/domain/models'
import { PrismaClient } from '@prisma/client'
import { PrismaNotificationMapper } from '../mappers'

export class NotificationPrismaRepository implements NotificationRepository {
	private prisma: PrismaClient
	constructor() {
		this.prisma = prismaService
	}

	async add(param: NotificationModel): Promise<NotificationModel> {
		return (await this.prisma.notification.create({
			data: PrismaNotificationMapper.toPrisma(param)
		})) as NotificationModel
	}

	async loadAll(): Promise<NotificationModel[]> {
		return (await this.prisma.notification.findMany()) as NotificationModel[]
	}

	async findById(id: number): Promise<NotificationModel | null> {
		return (await this.prisma.notification.findUnique({
			where: { id }
		})) as NotificationModel
	}

	async count(): Promise<number> {
		return this.prisma.notification.count()
	}

	async update(param: NotificationModel): Promise<NotificationModel> {
		return (await this.prisma.notification.update({
			data: PrismaNotificationMapper.toPrisma(param),
			where: { id: param.id }
		})) as NotificationModel
	}

	async delete(notificationId: number): Promise<boolean> {
		const deletedNotification = await this.prisma.notification.delete({
			where: { id: notificationId }
		})
		return !!deletedNotification
	}
}
