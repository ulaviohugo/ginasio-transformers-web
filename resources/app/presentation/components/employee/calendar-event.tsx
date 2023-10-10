import React, { useMemo } from 'react'

import { DateUtils, StringUtils } from '@/utils'
import {
	ButtonCancel,
	ButtonSubmit,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	TextArea
} from '..'
import { ChangeEvent, useEffect, useState } from 'react'
import { EmployeeModel } from '@/domain/models'
import { makeRemoteAddEmployeePresence } from '@/main/factories/usecases'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { updateEmployeeStore } from '@/presentation/redux'

type CalendarEventProps = {
	eventItem: EventItemProps
	open: boolean
	onClose: () => void
}

type FormProps = {
	presence_status?: string
	date: Date
	employee_id: number
	entry_time?: string
	exit_time?: string
	delay_duration?: string
	description?: string
}

export type EventItemProps = {
	date: Date
	employee: EmployeeModel
}
export const CalendarEvent = ({ eventItem, open, onClose }: CalendarEventProps) => {
	const dispatch = useDispatch()

	const { date, employee } = eventItem
	const [show, setShow] = useState(open)

	const [formData, setFormData] = useState<FormProps>({} as any)

	const statusPresent = useMemo(() => {
		return employee.employee_presences.find(
			(presence) => presence.date == (DateUtils.getDate(date) as any)
		)
	}, [employee])

	useEffect(() => {
		setFormData({
			...formData,
			date: DateUtils.getDate(date) as any,
			entry_time: statusPresent?.entry_time,
			exit_time: statusPresent?.exit_time,
			delay_duration: statusPresent?.delay_duration,
			presence_status: statusPresent?.presence_status,
			description: statusPresent?.description
		})
	}, [date, employee, statusPresent])

	useEffect(() => {
		setShow(open)
	}, [open])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async () => {
		const data: FormProps = {
			...formData,
			date: DateUtils.getDate(date) as any,
			employee_id: employee.id,
			entry_time: formData?.presence_status == 'P' ? formData.entry_time : (null as any),
			exit_time: formData?.presence_status == 'P' ? formData.exit_time : (null as any)
		}
		makeRemoteAddEmployeePresence()
			.add(data as any)
			.then((response) => {
				let employee_presences = employee.employee_presences || []

				if (!employee_presences.find(({ id }) => response.id == id)) {
					employee_presences = [response, ...employee_presences]
				} else {
					employee_presences = employee_presences.map((presence) => {
						if (presence.id == response.id) return response
						return presence
					})
				}

				dispatch(updateEmployeeStore({ ...employee, employee_presences }))
				toast.success('Dados registados com sucesso')
				onClose()
			})
			.catch((error: any) => toast.error(error.message))
	}

	return (
		<Modal show={show} onClose={onClose} size="sm">
			<ModalTitle>Registo de presença</ModalTitle>
			<ModalBody>
				<div className="text-sm mb-2">
					<label className="font-semibold">
						{StringUtils.getFirstAndLastWord(employee.name)}
					</label>
					{' - '}
					<label
						className={`border-b-2 ${
							formData?.presence_status == 'P' ? 'border-b-green-400' : 'border-b-red-400'
						} transition-all duration-300`}
					>
						Data: {DateUtils.getDatePt(date)}
					</label>
				</div>
				<div className="flex flex-col gap-2">
					<div>
						<div className="inline-flex gap-2">
							<Input
								type="radio"
								name="presence_status"
								value={'P'}
								label="Presente"
								defaultChecked={statusPresent?.presence_status == 'P'}
								onChange={handleInputChange}
							/>
							<Input
								type="radio"
								name="presence_status"
								value={'F'}
								label="Faltou"
								defaultChecked={statusPresent?.presence_status == 'F'}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					{formData?.presence_status == 'P' && (
						<div className="grid grid-cols-3">
							<Input
								type="time"
								name="entry_time"
								id="entry_time"
								value={formData?.entry_time || '00:00'}
								label="Hora entrada"
								onChange={handleInputChange}
							/>
							<Input
								type="time"
								name="exit_time"
								id="exit_time"
								value={formData?.exit_time || '00:00'}
								label="Hora saída"
								onChange={handleInputChange}
							/>
							<Input
								type="time"
								name="delay_duration"
								id="delay_duration"
								value={formData?.delay_duration || '00:00'}
								label="Atraso"
								onChange={handleInputChange}
							/>
						</div>
					)}
					<TextArea
						name="description"
						id="description"
						value={formData?.description || ''}
						label="Observação"
						onChange={handleInputChange}
					/>
				</div>
			</ModalBody>
			<ModalFooter>
				<ButtonSubmit onClick={handleSubmit} />
				<ButtonCancel onClick={onClose} />
			</ModalFooter>
		</Modal>
	)
}
