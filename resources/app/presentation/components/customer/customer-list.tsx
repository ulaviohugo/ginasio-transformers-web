import { useCustomers, useLocations } from '@/presentation/hooks'
import { DateUtils, MunicipalityProps, ObjectUtils, ProvinceProps } from '@/utils'
import React, { ChangeEvent, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../spinner'
import { CustomerModel } from '@/domain/models'
import { QueryParams } from '@/data/protocols'
import { CustomerFilterFields, LoadCustomersParams } from '@/domain/usecases'
import { Button, Select } from '../form-controls'
import { IconClose, IconSearch } from '../icons'

type CustomerListProps = {
	isLoading: boolean
	onSelectCustomer: (customer: CustomerModel) => void
	onFilter: (filterParams: QueryParams<CustomerModel>) => void
	onClearFilter: () => void
	filteredCustomers: CustomerModel[]
}

export type CustomerFilterProps = LoadCustomersParams

export function CustomerList({
	isLoading,
	onSelectCustomer,
	onFilter,
	onClearFilter,
	filteredCustomers
}: CustomerListProps) {
	const { provinces, municipalities } = useSelector(useLocations())
	const customers = useSelector(useCustomers())

	const provincesObject = ObjectUtils.convertToObject<ProvinceProps>(
		provinces,
		'id',
		'name'
	) as any

	const municipalitiesObject = ObjectUtils.convertToObject<MunicipalityProps>(
		municipalities,
		'id',
		'name'
	) as any

	const [filter, setFilter] = useState<CustomerFilterFields>({} as any)
	const [selectedRow, setSelectedRow] = useState(0)

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filter)
	}, [filter])

	const municipalitiesFilter = useMemo(
		() =>
			filter.province_id
				? municipalities.filter(({ province_id }) => province_id == filter.province_id)
				: municipalities,
		[filter.province_id, municipalities]
	)

	const handleChangeFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		let data = { ...filter, [name]: value }
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
		}
		setFilter(data)
	}

	const clearFilter = () => {
		const filter = {}
		setFilter(filter as any)
		onClearFilter()
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}
	const handleSelectCustomer = (customer: CustomerModel) => {
		handleSelectRow(customer.id)
		onSelectCustomer(selectedRow != customer.id ? customer : ({} as any))
	}
	return (
		<fieldset>
			<legend>Clientes {isLoading && <Spinner />}</legend>
			<div className="flex gap-2 items-start">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b font-semibold">
							<td className="px-1">Código</td>
							<td className="px-1">Nome</td>
							<td className="px-1">Data de nascimento</td>
							<td className="px-1">Mês Aniversário</td>
							<td className="px-1">Telefone</td>
							<td className="px-1">Província</td>
							<td className="px-1">Município</td>
							<td className="px-1">Endereço</td>
							<td className="px-1">E-mail</td>
							<td className="px-1">Tipo de Cliente</td>
						</tr>
					</thead>
					{filteredCustomers.length > 0 && (
						<tbody>
							{filteredCustomers.map((customer, i) => {
								return (
									<tr
										key={customer.id}
										className={`cursor-pointer transition-all duration-150 ${
											i % 2 !== 0 && 'bg-gray-100'
										} ${
											selectedRow == customer.id
												? 'bg-primary text-white'
												: 'hover:bg-gray-200'
										}`}
										onClick={() => handleSelectCustomer(customer)}
									>
										<td className="px-1">{customer.id}</td>
										<td className="px-1">{customer.name}</td>
										<td className="px-1">
											{DateUtils.getDatePt(customer.date_of_birth)}
										</td>
										<td className="px-1">
											{customer.date_of_birth &&
												DateUtils.getMonthExt(customer.date_of_birth)}
										</td>
										<td className="px-1">{customer.phone}</td>
										<td className="px-1">
											{customer.province_id && provincesObject[customer.province_id]}
										</td>
										<td className="px-1">
											{customer.municipality_id &&
												municipalitiesObject[customer.municipality_id]}
										</td>
										<td className="px-1">{customer.address}</td>
										<td className="px-1">{customer.email}</td>
										<td className="px-1">{customer.customer_type}</td>
									</tr>
								)
							})}
						</tbody>
					)}
				</table>
				<fieldset>
					<legend>Filtro</legend>
					<div className="min-w-[324px] flex flex-col gap-2">
						<div className="flex flex-col gap-1">
							<Select
								name="id"
								label="Cliente"
								value={filter?.id || ''}
								data={customers.map(({ name, id }) => ({
									text: name,
									value: String(id)
								}))}
								defaultText="Todos"
								onChange={handleChangeFilter}
							/>
							<div className="flex gap-2">
								<Select
									name="start_month_of_birth"
									label="Início Aniversário"
									value={filter?.start_month_of_birth || ''}
									data={DateUtils.getMonthListExt().map((month, i) => ({
										text: month,
										value: String(i + 1)
									}))}
									defaultText="Todos"
									onChange={handleChangeFilter}
								/>
								<Select
									name="end_month_of_birth"
									label="Fim Aniversário"
									value={filter?.end_month_of_birth || ''}
									data={DateUtils.getMonthListExt().map((month, i) => ({
										text: month,
										value: String(i + 1)
									}))}
									defaultText="Todos"
									onChange={handleChangeFilter}
								/>
							</div>
							<div className="flex gap-2">
								<Select
									name="province_id"
									label="Província"
									value={filter?.province_id || ''}
									data={provinces.map(({ name, id }) => ({
										text: name,
										value: String(id)
									}))}
									defaultText="Todas"
									onChange={handleChangeFilter}
								/>
								<Select
									name="municipality_id"
									label="Municípios"
									value={filter?.municipality_id || ''}
									data={municipalitiesFilter.map(({ name, id }) => ({
										text: name,
										value: String(id)
									}))}
									defaultText="Todos"
									onChange={handleChangeFilter}
								/>
							</div>
						</div>
						<div className="flex gap-1">
							<Button
								variant="gray-light"
								text="Filtrar"
								onClick={() => onFilter({ filter })}
								icon={IconSearch}
								isLoading={isLoading}
							/>
							{hasFilter && (
								<Button text="Limpar" icon={IconClose} onClick={clearFilter} />
							)}
						</div>
					</div>
				</fieldset>
			</div>
			{isLoading ? (
				<Spinner data="Carregando clientes..." />
			) : (
				filteredCustomers?.length < 1 && <div>Nenhum cliente de momento.</div>
			)}
		</fieldset>
	)
}
