import {
	useSuppliers,
	useLocations,
	useCategories,
	useProducts
} from '@/presentation/hooks'
import { CountryProps, MunicipalityProps, ObjectUtils, ProvinceProps } from '@/utils'
import React, { ChangeEvent, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../spinner'
import { SupplierModel } from '@/domain/models'
import { QueryParams } from '@/data/protocols'
import { SupplierFilterFields, LoadSuppliersParams } from '@/domain/usecases'
import { Button, Select } from '../form-controls'
import { IconClose, IconSearch } from '../icons'

type SupplierListProps = {
	isLoading: boolean
	onSelectSupplier: (supplier: SupplierModel) => void
	onFilter: (filterParams: QueryParams<SupplierModel>) => void
	onClearFilter: () => void
	filteredSuppliers: SupplierModel[]
}

export type SupplierFilterProps = LoadSuppliersParams

export function SupplierList({
	isLoading,
	onSelectSupplier,
	onFilter,
	onClearFilter,
	filteredSuppliers
}: SupplierListProps) {
	const { countries, provinces, municipalities } = useSelector(useLocations())
	const suppliers = useSelector(useSuppliers())
	const categories = useSelector(useCategories())
	const products = useSelector(useProducts())

	const countriesObject = ObjectUtils.convertToObject<CountryProps>(
		countries,
		'id',
		'name'
	) as any

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

	const [filter, setFilter] = useState<SupplierFilterFields>({} as any)
	const [selectedRow, setSelectedRow] = useState(0)

	const hasFilter = useMemo(() => {
		return !ObjectUtils.isEmpty(filter)
	}, [filter])

	const municipalitiesFilter = useMemo(
		() =>
			filter.category_id
				? municipalities.filter(({ province_id }) => province_id == filter.category_id)
				: municipalities,
		[filter.category_id, municipalities]
	)

	const productsFilter = useMemo(
		() =>
			filter.category_id
				? products.filter(({ category_id }) => category_id == filter.category_id)
				: products,
		[filter.category_id, products]
	)

	const handleChangeFilter = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFilter({ ...filter, [name]: value })
	}

	const clearFilter = () => {
		setFilter({} as any)
		onClearFilter()
	}

	const handleSelectRow = (id: number) => {
		setSelectedRow(selectedRow != id ? id : 0)
	}
	const handleSelectSupplier = (supplier: SupplierModel) => {
		handleSelectRow(supplier.id)
		onSelectSupplier(selectedRow != supplier.id ? supplier : ({} as any))
	}
	return (
		<fieldset>
			<legend>Fornecedores {isLoading && <Spinner />}</legend>
			<div className="flex gap-2 items-start">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b font-semibold">
							<td className="px-1">Código</td>
							<td className="px-1">Nome</td>
							<td className="px-1">Representante</td>
							<td className="px-1">Telefone</td>
							<td className="px-1">E-mail</td>
							<td className="px-1">País</td>
							<td className="px-1">Província</td>
							<td className="px-1">Município</td>
							<td className="px-1">Endereço</td>
						</tr>
					</thead>
					{filteredSuppliers.length > 0 && (
						<tbody>
							{filteredSuppliers.map((supplier, i) => {
								return (
									<tr
										key={supplier.id}
										className={`cursor-pointer transition-all duration-150 ${
											i % 2 !== 0 && 'bg-gray-100'
										} ${
											selectedRow == supplier.id
												? 'bg-primary text-white'
												: 'hover:bg-gray-200'
										}`}
										onClick={() => handleSelectSupplier(supplier)}
									>
										<td className="px-1">{supplier.id}</td>
										<td className="px-1">{supplier.name}</td>
										<td className="px-1">{supplier.representative}</td>
										<td className="px-1">{supplier.phone}</td>
										<td className="px-1">{supplier.email}</td>
										<td className="px-1">
											{supplier.country_id && countriesObject[supplier.country_id]}
										</td>
										<td className="px-1">
											{supplier.province_id && provincesObject[supplier.province_id]}
										</td>
										<td className="px-1">
											{supplier.municipality_id &&
												municipalitiesObject[supplier.municipality_id]}
										</td>
										<td className="px-1">{supplier.address}</td>
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
								label="Fornecedor"
								value={filter?.id || ''}
								data={suppliers.map(({ name, id }) => ({
									text: name,
									value: String(id)
								}))}
								defaultText="Todos"
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
							<Select
								name="category_id"
								label="Categoria"
								value={filter?.category_id || ''}
								data={categories.map(({ name, id }) => ({
									text: name,
									value: String(id)
								}))}
								defaultText="Todos"
								onChange={handleChangeFilter}
							/>
							<Select
								name="product_id"
								label="Produto"
								value={filter?.product_id || ''}
								data={productsFilter.map(({ name, id }) => ({
									text: name,
									value: String(id)
								}))}
								defaultText="Todos"
								onChange={handleChangeFilter}
							/>
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
				<Spinner data="Carregando fornecedores..." />
			) : (
				filteredSuppliers?.length < 1 && <div>Nenhum fornecedor de momento.</div>
			)}
		</fieldset>
	)
}
