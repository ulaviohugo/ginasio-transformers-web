import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Layout, LayoutBody, ModalDelete, Select } from '../components'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'
import { DateUtils, months } from '@/utils'
import { FilterDataProps, FilterPayment } from '../components/filter-Payment'

type FormDataProps = {
	athlete_id: number
	year: number
	month: number
	monthlyValue: number
	monthlyFine: number
}

type PaymentProps = {
	id: number
	name: string
	year: number
	month: number
	monthlyValue: number
	monthlyFine: number
	created_at: Date
	updated_at: Date
	athlete_id: number
}

export function Payment() {
	const [mensalidades, setMensalidade] = useState<PaymentProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [selectedMensalidade, setSelectMensalidade] = useState<PaymentProps>()
	const [formData, setFormData] = useState<FormDataProps>({
		athlete_id: 0,
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		monthlyValue: 0,
		monthlyFine: 0
	})

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setMensalidade(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false)
	}

	const handleOpenDeleteModal = () => {
		if (!selectedMensalidade?.id) {
			toast.error('Selecione a linha da mensalidade que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}

	const handleClear = () => {
		setSelectMensalidade({} as any)
		setFormData({} as any)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Mensalidade cadastrada com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade/' + selectedMensalidade?.id),
			method: 'delete',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Mensalidade excluida com sucesso')
			handleCloseDeleteModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleUpdate() {
		if (!selectedMensalidade?.id) {
			return toast.error('Selecione a linha da mensalidade que deseja editar')
		}
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade/' + selectedMensalidade?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Mensalidade Editada com sucesso')
			fetchData()
			handleClear()
		}
		 else {
			toast.error(httpResponse.body)
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		fetchData(
			`?name=${filterData.name}&created_at=${filterData.created_at}&athlete_id=${filterData.athlete_id}&month=${filterData.month}&year=${filterData.year}`
		)
	}

	return (
		<Layout title="Mensalidade">
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir a mensalidade"
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
					show
				/>
			)}
			<LayoutBody>
				<div className="flex items-start gap-3">
					<div className="flex-1">
						Mensalidade
						<form className="flex flex-col gap-4">
							<Input
								name="athlete_id"
								onChange={handleInput}
								label="Nº do Atlheta"
								type="number"
								placeholder="Informe o número do atleta"
								value={formData.athlete_id || ''}
							/>
							<Input
								name="year"
								onChange={handleInput}
								label="Escolhe o ano do mês que deseja pagar"
								type="number"
								value={formData.year || ''}
							/>
							<Select
								name="month"
								onChange={handleInput}
								label="Escolhe o mês que deseja pagar"
								data={DateUtils.getMonthUtils().map((month, i) => ({
									text: month,
									value: i + 1
								}))}
								value={formData.month || ''}
							/>
							<Input
								name="monthlyValue"
								onChange={handleInput}
								label="Pagamento"
								type="number"
								placeholder="Quanto atleta vai pagar"
								value={formData.monthlyValue || ''}
							/>
							<Input
								name="monthlyFine"
								onChange={handleInput}
								label="Multa"
								type="number"
								placeholder="Quanto atleta vai pagar"
								value={formData.monthlyFine || ''}
							/>
						</form>
					</div>
					<div className="flex flex-col gap-2">
						<Button
							onClick={handleSubmit}
							variant="green"
							text="Cadastrar"
							type="button"
						/>
						<Button
							onClick={handleUpdate}
							variant="gray-light"
							text="Editar"
							type="button"
						/>
						<Button
							onClick={() => {
								setSelectMensalidade(selectedMensalidade)
								handleOpenDeleteModal()
							}}
							variant="red"
							text="Excluir"
							type="button"
						/>
						<Button
							onClick={() => {
								handleClear()
							}}
							variant="default"
							text="Limpar"
							type="button"
						/>
					</div>
				</div>
				<div>
					<fieldset>
						<legend>Filtro</legend>
						<FilterPayment onFilter={handleFilter} />
						<table className="w-full">
							<thead>
								<tr className="gap-10">
									<td>Nome</td>
									<td>Mês</td>
									<td>Ano</td>
									<td>Mensalidade</td>
									<td>Data do pagamento</td>
									<td>Multa</td>
									<td>Código do atleta</td>
									<td>Código</td>
								</tr>
							</thead>
							<tbody>
								{mensalidades.map((mensal) => {
									return (
										<tr
											key={mensal.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(mensal)
												setSelectMensalidade(mensal)
											}}
										>
											<td>{mensal.name}</td>
											<td>{mensal.month}</td>
											<td>{mensal.year}</td>
											<td>{mensal.monthlyValue}</td>
											<td>{DateUtils.getDatePt(mensal.created_at).toString()}</td>
											<td>{mensal.monthlyFine}</td>
											<td>{mensal.athlete_id}</td>
											<td>{mensal.id}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
