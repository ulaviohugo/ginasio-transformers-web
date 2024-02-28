import React, { ChangeEvent, useEffect, useState } from 'react'
import {
	Button,
	IconProduct,
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
import { FilterDataProps, FilterProduto } from '../components/filter-produto'
import { useSelector } from 'react-redux'
import { useAuth } from '../hooks'

type FormDataProps = {
	user_id: number
	athlete_id: number
	paymentMethod: string
	quantity: number
	produto_id: number
	totalPrice: number
}

type SaleProps = {
	id: number
	nameProduct: string
	totalPrice: number
	unitPrice: number
	user_id: number
	created_at: Date
	updated_at: Date
	athlete_id: number
	paymentMethod: string
	quantity: number
	produto_id: number
}

type ProdutoProps = {
	nameProduct: string
	id: number
}

export function Sale() {
	const user = useSelector(useAuth())

	const [produtos, setProdutos] = useState<ProdutoProps[]>([])
	const [vendas, setVendas] = useState<SaleProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [seletedSale, setSeletedSale] = useState<SaleProps>()
	const [formData, setFormData] = useState<FormDataProps>({
		user_id: 0,
		paymentMethod: '',
		quantity: 0,
		athlete_id: 0,
		produto_id: 0,
		totalPrice: 0
	})

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/vendas' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setVendas(httpResponse.body)
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
		if (!seletedSale?.id) {
			toast.error('Selecione a linha de venda que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}

	const handleClear = () => {
		setSeletedSale({} as any)
		setFormData({} as any)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/vendas'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Venda efetuada com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	const fetchProductsData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/produtos' + (queryParams || '')),
			method: 'get'
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setProdutos(httpResponse.body)
		} else {
			toast.error(httpResponse.body)
		}
	}

	useEffect(() => {
		fetchProductsData()
	}, [])

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/vendas/' + seletedSale?.id),
			method: 'delete',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Produto excluido com sucesso')
			handleCloseDeleteModal()
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleUpdate() {
		if (!seletedSale?.id) {
			return toast.error('Selecione a linha do produto que deseja editar')
		}
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/vendas/' + seletedSale?.id),
			method: 'put',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Produto Editado com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		fetchData(
			`?nameProduct=${filterData.nameProduct}&created_at=${filterData.created_at}&price=${filterData.price}`
		)
	}

	return (
		<Layout title="Venda de Produtos">
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir a produto"
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
					show
				/>
			)}
			<LayoutBody>
				<SubMenu submenus={MenuUtils.financeMenuItens({ role: user.role })} />
				<Title title="Venda de Produtos" icon={IconProduct} />
				<div className="flex items-start gap-3 mt-3">
					<div className="flex-1">
						<form className="grid grid-cols-4 gap-4">
							<Select
								name="produto_id"
								onChange={handleInput}
								label="Nomes do produto"
								data={produtos.map((produto) => {
									return { text: produto.nameProduct, value:produto.id }
								})}
								value={formData.produto_id || ''}
								defaultText="Selecione"
							/>
							<Input
								name="quantity"
								onChange={handleInput}
								label="Quantidade de produto"
								type="number"
								value={formData.quantity || ''}
							/>
							<Input
								name="produto_id"
								onChange={handleInput}
								label="ID do produto"
								type="number"
								value={formData.produto_id || ''}
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
								setSeletedSale(seletedSale)
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
						<FilterProduto onFilter={handleFilter} />
						<table className="w-full">
							<thead>
								<tr className="gap-10">
									<td>Nome</td>
									<td>Id do produto</td>
									<td>quatidade</td>
									<td>Id do utilizador</td>
									<td>Preço</td>
									<td>Metodo de pagamento</td>
								</tr>
							</thead>
							<tbody>
								{vendas.map((produto) => {
									return (
										<tr
											key={produto.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(produto)
												setSeletedSale(produto)
											}}
										>
											<td>{produto.nameProduct}</td>
											<td>{produto.id}</td>
											<td>{produto.quantity}</td>
											<td>{produto.user_id}</td>
											<td>{produto.totalPrice}</td>
											<td>{produto.paymentMethod}</td>
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
