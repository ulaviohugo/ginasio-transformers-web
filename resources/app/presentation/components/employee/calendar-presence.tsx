import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { EmployeeModel, PresentStatus } from '@/domain/models'
import { DateUtils } from '@/utils'
import { CalendarEvent, IconChevronLeft, IconChevronRight, Input, Select } from '..'

type CalendarPresenceProps = {
	employees: EmployeeModel[]
}

type FormProps = {
	month: number
	year: number
}

type ItemProps = {
	date: Date
	employee: EmployeeModel
}
export function CalendarPresence({ employees }: CalendarPresenceProps) {
	const date = new Date()
	const months = DateUtils.getMonthList()
	const [formData, setFormData] = useState<FormProps>({
		year: date.getUTCFullYear(),
		month: date.getUTCMonth()
	})
	const [calendarDays, setCalendarDays] = useState<number[]>([])
	const [selectedEventItem, setSelectedEventItem] = useState<ItemProps>(null as any)

	useEffect(() => {
		handleLoadDays()
	}, [formData])

	const handleChangeInput = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }

		if (name == 'year' && value.length < 4) {
			data = { ...data, month: undefined as any }
		}
		setFormData(data)
	}

	const handleLoadDays = useCallback(() => {
		const lastDayOfMonth = new Date(formData.year, formData.month, 0).getDate()
		console.log({ lastDayOfMonth, month: formData.month })

		setCalendarDays(Array.from(Array(lastDayOfMonth)))
	}, [formData.month, formData.year])

	const handleShowOption = (item: ItemProps) => {
		setSelectedEventItem(item)
	}

	const compareDates = (date1: Date, date2: Date) => {
		const d1 = DateUtils.convertToDate(date1)
		const d2 = DateUtils.convertToDate(date2)
		return (
			`${d1.getFullYear()}${d1.getMonth()}${d1.getDate()}` ==
			`${d2.getFullYear()}${d2.getMonth()}${d2.getDate()}`
		)
	}

	return (
		<>
			{selectedEventItem && (
				<CalendarEvent
					eventItem={selectedEventItem}
					open={selectedEventItem != null}
					onClose={() => setSelectedEventItem(null as any)}
				/>
			)}
			<div
				className="flex flex-col gap-2 overflow-auto"
				style={{ maxWidth: 'calc(100vw - 192px)' }}
			>
				<div className="flex gap-2">
					<div>Presença</div>
					<label className="font-semibold">
						{/* {StringUtils.getFirstAndLastWord(employees.name)} */}
					</label>
				</div>
				<div className="flex mr-auto items-center gap-2">
					<Input
						type="number"
						name="year"
						value={formData?.year || ''}
						placeholder="Ano"
						onChange={handleChangeInput}
					/>
					<Select
						name="month"
						value={formData?.month || ''}
						data={months.map((month) => ({
							text: DateUtils.getMonthExt(month),
							value: month.toString()
						}))}
						defaultText="Selecione o mês"
						onChange={handleChangeInput}
						disabled={!formData?.year || formData?.year?.toString().length < 4}
					/>
					<IconChevronLeft />
					<IconChevronRight />
				</div>
				{calendarDays.length > 0 && (
					<table className="w-full">
						<thead>
							<tr className=" ">
								<th className="bg-primary text-white text-left">
									<div className="p-4">Funcionário</div>
								</th>
								{calendarDays.map((_, i) => {
									const weekDay = DateUtils.getWeekDay(
										new Date(formData.year, formData.month, i)
									)
									return (
										<th key={`wek-day-${i}`} className="bg-primary text-white p-4">
											{weekDay.toLocaleLowerCase().slice(0, 3)}
										</th>
									)
								})}
							</tr>
						</thead>
						<tbody>
							{employees.map((employee) => (
								<tr key={employee.id}>
									<td className="">
										<div className="whitespace-nowrap bg-green-50 p-4 font-semibold">
											{employee.name}
										</div>
									</td>
									{calendarDays.map((_, i) => {
										const day = i + 1
										const selfDate = new Date(formData.year, formData.month, day)
										const active = date >= selfDate
										const isToday = compareDates(date, selfDate)
										// date.getFullYear() == selfDate.getUTCFullYear() &&
										// date.getMonth() == selfDate.getUTCMonth() &&
										// date.getDate() == selfDate.getUTCDate()

										const present = employee.employee_presences.find(({ date }) =>
											compareDates(date, selfDate)
										)
										console.log({ present })

										const isAbsent = present?.presence_status == PresentStatus.F
										const isPresent = present?.presence_status == PresentStatus.P

										return (
											<td
												key={`key-${i}-${employee.id}`}
												onClick={() =>
													active && handleShowOption({ date: selfDate, employee })
												}
											>
												<div
													className={`flex ${
														active
															? `${
																	isPresent
																		? 'bg-green-100'
																		: isAbsent
																		? 'bg-red-300'
																		: isToday
																		? 'bg-sky-100'
																		: 'bg-red-50'
															  } cursor-pointer hover:font-semibold transition-all duration-300 hover:scale-105`
															: 'bg-gray-100 text-gray-400 cursor-not-allowed'
													} ${isToday && 'font-semibold underline'} p-4 text-left`}
												>
													{day}
												</div>
											</td>
										)
									})}
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	)
}
