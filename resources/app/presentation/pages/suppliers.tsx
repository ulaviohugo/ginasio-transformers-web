import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	IconSupliers,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	Select,
	SubMenu,
	Title
} from '../components'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http'
import toast from 'react-hot-toast'
import { DataUtils, DateUtils, MenuUtils, months } from '@/utils'
import { FilterDataProps, FilterSuppliers } from '../components/filter-Suppliers'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'

type FormDataProps = {
	user_id: number
	nameSuppliers: string
	nameProduct: string
	descriptionProduct: string
	purchasesHistoric: string
	serviceProvided: string
	status: string
	contactName: string
	address: string
	Phone: number
	email: string
	site: string
	deliveryTimes: Date
	returnExchangePolicy: string
	contractsAgreements: string
	ratingsComments: string
    paymentMethod: string
}

type SuppliersProps = {
    id: number
	user_id: number
	nameSuppliers: string
	nameProduct: string
	descriptionProduct: string
	purchasesHistoric: string
	serviceProvided: string
	status: string
	contactName: string
	address: string
	Phone: number
	email: string
	site: string
	deliveryTimes: Date
	returnExchangePolicy: string
	contractsAgreements: string
	ratingsComments: string
    paymentMethod: string
    created_at: Date
}

export function Suppliers() {
	const user = useSelector(useAuth())

	const [suppliers, setSuppliers] = useState<SuppliersProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [seletedSuppliers, setSeletedSuppliers] = useState<SuppliersProps>()
	const [formData, setFormData] = useState<FormDataProps>({
        user_id: 0,
        nameSuppliers: '',
        nameProduct: '',
        descriptionProduct: '',
        purchasesHistoric: '',
        serviceProvided: '',
        status: '',
        contactName: '',
        address: '',
        Phone: 0,
        email: '',
        site: '',
        deliveryTimes: new Date(),
        returnExchangePolicy: '',
        contractsAgreements: '',
        ratingsComments: '',
        paymentMethod: ''
	})

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/suppliers' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setSuppliers(httpResponse.body)
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
		if (!seletedSuppliers?.id) {
			toast.error('Selecione a linha do fornecedor que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}

	const handleClear = () => {
		setSeletedSuppliers({} as any)
		setFormData({} as any)
	}

    const handleChangeInput = async (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }
		setFormData(data)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/suppliers'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('fornecedor cadastrado com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/suppliers/' + seletedSuppliers?.id),
			method: 'delete',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Fornecedor excluido com sucesso')
			handleCloseDeleteModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleUpdate() {
		if (!seletedSuppliers?.id) {
			return toast.error('Selecione a linha do fornecedor que deseja editar')
		}
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/suppliers/' + seletedSuppliers?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Fornecedor Editado com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		fetchData(
			`?nameSuppliers=${filterData.nameSuppliers}&created_at=${filterData.created_at}&nameProduct=${filterData.nameProduct}`
		)
	}

	return (
		<Layout title="Cadastro de Fornecedor">
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir o seu fornecedor"
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
					show
				/>
			)}
			<LayoutBody>
				<SubMenu submenus={MenuUtils.financeMenuItens({ role: user.role })} />
				<Title title="Cadastro de Fornecedor" icon={IconSupliers} />
				<div className="flex items-start gap-3 mt-3">
					<div className="flex-1">
						<form className="grid grid-cols-4 gap-4">
							<Input
								name="nameSuppliers"
								onChange={handleInput}
								label="Nome do Fornecedor"
								type="text"
								value={formData.nameSuppliers || ''}
							/>
							<Input
								name="nameProduct"
								onChange={handleInput}
								label="Nome do produto"
								type="text"
								value={formData.nameProduct || ''}
							/>
							<Input
								name="Phone"
								onChange={handleInput}
								label="contato"
								type="number"
								value={formData.Phone || ''}
							/>
							<Input
								name="address"
								onChange={handleInput}
								label="Endereço"
								type="text"
								value={formData.address || ''}
							/>
							<Input
								name="contactName"
								onChange={handleInput}
								label="Nome do contato"
								type="text"
								value={formData.contactName || ''}
							/>
							<Input
								name="descriptionProduct"
								onChange={handleInput}
								label="Descrição do produto"
								type="text"
								value={formData.descriptionProduct || ''}
							/>
							<Input
								name="contractsAgreements"
								onChange={handleInput}
								label="Contratos e Acordos"
								type="text"
								value={formData.contractsAgreements || ''}
							/>
							<Input
								name="email"
								onChange={handleInput}
								label="E-mail"
								type="email"
								value={formData.email || ''}
							/>
							<Input
								name="purchasesHistoric"
								onChange={handleInput}
								label="Histórico de Compras"
								type="text"
								value={formData.purchasesHistoric || ''}
							/>
							<Input
								name="ratingsComments"
								onChange={handleInput}
								label="Avaliações e Comentários"
								type="text"
								value={formData.ratingsComments || ''}
							/>
							<Input
								name="deliveryTimes"
								onChange={handleInput}
								label="Tempos de Entrega"
								type="date"
								value={(formData?.deliveryTimes as any) || ''}
							/>
							<Select
								name="serviceProvided"
								label="Serviço Fornecido"
								data={['Produtos','Equipamentos'].map((text) => ({
									text
								}))}
								defaultText="Selecione"
								value={formData?.serviceProvided || ''}
								onChange={handleChangeInput}
							/>
							<Input
								name="site"
								onChange={handleInput}
								label="Site"
								type="text"
								value={formData.site || ''}
							/>
							<Select
								name="status"
								label="Status do Fornecedor"
								data={[
									{ text: 'Activo', value: 'active' },
									{ text: 'Inactivo', value: 'inactive' }
								].map((text) => text)}
								defaultText="Selecione"
								value={formData?.status || ''}
								onChange={handleChangeInput}
							/>
							<Select
								name="paymentMethod"
								onChange={handleInput}
								label="Método de pagamento"
								data={['Dinheiro a vista', 'TPA', 'Transferência'].map((pagamento) => {
									return { text: pagamento }
								})}
								value={formData.paymentMethod || ''}
								defaultText="Selecione"
							/>
							<Input
								name="returnExchangePolicy"
								onChange={handleInput}
								label="Política de Devolução e Troca"
								type="text"
								value={formData.returnExchangePolicy || ''}
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
								setSeletedSuppliers(seletedSuppliers)
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
						<FilterSuppliers onFilter={handleFilter} />
						<table className="w-full">
							<thead>
								<tr className="gap-10">
									<td>Nome do fornecedor</td>
									<td>Nome do produto</td>
									<td>contato</td>
									<td>Status do Fornecedor</td>
									<td>ID do Fornedor</td>
									<td>Utilizador</td>
									<td>Data</td>
								</tr>
							</thead>
							<tbody>
								{suppliers.map((supplier) => {
									return (
										<tr
											key={supplier.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(supplier)
												setSeletedSuppliers(supplier)
											}}
										>
											<td>{supplier.nameSuppliers}</td>
											<td>{supplier.nameProduct}</td>
											<td>{supplier.Phone}</td>
											<td>{supplier.status}</td>
											<td>{supplier.id}</td>
											<td>{supplier.user_id}</td>
											<td>{DateUtils.getDatePt(supplier.created_at).toString()}</td>
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
