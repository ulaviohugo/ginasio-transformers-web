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
	description: string
	price: number
	paymentMethod: string
	quantity: number
	suppliers_id: number
}	

type ProdutoProps = {
	id: number
	description: string
	price: number
	created_at: Date
	updated_at: Date
	paymentMethod:string
	quantity:number
	suppliers_id: number
	nameProduct: string
}

type SuppliersProps = {
    id: number
	nameSuppliers: string
	nameProduct: string
	descriptionProduct: string
}


export function Product() {
    const user = useSelector(useAuth())

	const [suppliers, setSuppliers] = useState<SuppliersProps[]>([])
	const [produtos, setProdutos] = useState<ProdutoProps[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [seletedProduto, setSeletedProduto] = useState<ProdutoProps>()
	const [formData, setFormData] = useState<FormDataProps>({
		description:'',
		price: 0,
		paymentMethod:'',
		suppliers_id: 0,
		quantity: 0
	})

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const fetchData = async (queryParams?: string) => {
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
		fetchData()
	}, [])

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false)
	}

	const handleOpenDeleteModal = () => {
		if (!seletedProduto?.id) {
			toast.error('Selecione a linha do produto que deseja excluir')
		} else {
			setShowDeleteModal(true)
		}
	}

	const handleClear = () => {
		setSeletedProduto({} as any)
		setFormData({} as any)
	}

	async function handleSubmit() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/produtos'),
			method: 'post',
			body: formData
		})
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Produto cadastrado com sucesso')
			fetchData()
			handleClear()
		} else {
			toast.error(httpResponse.body)
		}
	}

	const fetchSuppliersData = async (queryParams?: string) => {
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
		fetchSuppliersData()
	}, [])

	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/produtos/' + seletedProduto?.id),
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
		if (!seletedProduto?.id) {
			return toast.error('Selecione a linha do produto que deseja editar')
		}
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/produtos/' + seletedProduto?.id),
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
		<Layout title="Cadastro de Produtos">
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
				<Title title="Cadastro de Produtos" icon={IconProduct} />
				<div className="flex items-start gap-3 mt-3">
					<div className="flex-1">
						<form className="grid grid-cols-4 gap-4">
							<Select
								name="suppliers_id"
								onChange={handleInput}
								label="Nome dos fornecedores"
								data={suppliers.map((supplier) => {
									return { text: supplier.nameSuppliers, value:supplier.id }
								})}
								value={formData.suppliers_id || ''}
								defaultText="Selecione"
							/>
							<Select
								name="suppliers_id"
								onChange={handleInput}
								label="Nome dos produto"
								data={suppliers.map((supplier) => {
									return { text: supplier.nameProduct, value:supplier.id }
								})}
								value={formData.suppliers_id || ''}
								defaultText="Selecione"
							/>
							<Input
								name="quantity"
								onChange={handleInput}
								label="Quantidade"
								type="number"
								value={formData.quantity || ''}
							/>
							<Input
								name="description"
								onChange={handleInput}
								label="Descrição"
								type="text"
								placeholder="Qual é a descrição do produto"
								value={formData.description || ''}
							/>
							<Input
								name="price"
								onChange={handleInput}
								label="Preço"
								type="number"
								placeholder="Qual o preço do produto"
								value={formData.price || ''}
							/>
							<Select
								name="paymentMethod"
								onChange={handleInput}
								label="Método de pagamento"
								data={['Dinheiro a vista', 'TPA', 'Transferência'].map((pagamento) => {
									return {text:pagamento}
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
								setSeletedProduto(seletedProduto)
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
									<td>ID do fornecedor</td>
									<td>Nome do Produto</td>
									<td>Quantidade</td>
									<td>Descrição</td>
									<td>Preço</td>
									<td>Metodo de pagamento</td>
									<td>Id do produto</td>
								</tr>
							</thead>
							<tbody>
								{produtos.map((produto) => {
									return (
										<tr
											key={produto.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(produto)
												setSeletedProduto(produto)
											}}
										>
											<td>{produto.suppliers_id}</td>
											<td>{produto.nameProduct}</td>
											<td>{produto.quantity}</td>
											<td>{produto.description}</td>
											<td>{produto.price}</td>
											<td>{produto.paymentMethod}</td>
											<td>{produto.id}</td>
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