'use client'

import { DateUtils, StringUtils } from '@/utils'
import {
	ButtonCancel,
	ButtonSubmit,
	Input,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle
} from '..'
import { ChangeEvent, useEffect, useState } from 'react'
import { EmployeeModel } from '@/domain/models'

type CalendarEventProps = {
	eventItem: EventItemProps
	open: boolean
	onClose: () => void
}

type FormProps = {
	presenceStatus: string
	date: Date
}

export type EventItemProps = {
	date: Date
	employee: EmployeeModel
}
export const CalendarEvent = ({ eventItem, open, onClose }: CalendarEventProps) => {
	const { date, employee } = eventItem
	const [show, setShow] = useState(open)
	const [formData, setFormData] = useState<FormProps>({} as any)
	useEffect(() => {
		setShow(open)
	}, [open])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, presenceStatus: e.target.value })
	}

	const handleSubmit = async () => {
		const data: FormProps = { ...formData, date }
	}

	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>Registo de presença</ModalTitle>
			<ModalBody>
				<div className="text-sm mb-2">
					<div>Funcionário: {StringUtils.getFirstAndLastWord(employee.name)}</div>
					<div>Data: {DateUtils.getDatePt(date)}</div>
				</div>
				<div className="flex">
					<Input
						type="radio"
						name="presenceStatus"
						value={'P'}
						label="Presente"
						onChange={handleInputChange}
					/>
					<Input
						type="radio"
						name="presenceStatus"
						value={'F'}
						label="Faltou"
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
