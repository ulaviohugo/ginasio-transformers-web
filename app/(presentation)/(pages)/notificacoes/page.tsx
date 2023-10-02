'use client'

import {
	IconNotification,
	Layout,
	LayoutBody,
	NoData,
	Spinner,
	Title
} from '@/(presentation)/components'
import { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'
import { useNotifications } from '@/(presentation)/hooks'
import { RemoteLoadNotifications } from '@/data/usecases'
import { useDispatch, useSelector } from 'react-redux'
import { loadNotificationStore } from '@/(presentation)/redux'
import { makeRemoteLoadNotifications } from '@/main/factories/usecases/remote'

export default function Notifications() {
	const dispatch = useDispatch()
	const notifications = useSelector(useNotifications())
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		makeRemoteLoadNotifications()
			.load()
			.then((response) => {
				dispatch(loadNotificationStore(response))
			})
			.catch((error) => {
				toast.error(error.message)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<Layout>
			<LayoutBody>
				<Title
					title={`Notificações ${!isLoading ? `(${notifications.length})` : ''}`}
					icon={IconNotification}
				/>
				{isLoading ? (
					<Spinner data="Carregando notificações" />
				) : notifications.length < 1 ? (
					<NoData data="Nenhuma notificação de momento" />
				) : (
					<ul className="flex flex-col">
						{notifications.map(
							({ id, text, notifiable, notifiableId, createdAt, stock }, i) => (
								<li
									key={id}
									className={`flex flex-col p-1 ${
										i < notifications.length - 1 && 'border-b'
									}`}
								>
									<div>{text}</div>
									<div className="flex gap-2 text-sm">
										<div>{stock?.product?.name}</div>
										<div className="">Quantidade restante: {stock?.quantity}</div>
									</div>
								</li>
							)
						)}
					</ul>
				)}
			</LayoutBody>
		</Layout>
	)
}
