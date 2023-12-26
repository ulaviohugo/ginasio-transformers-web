import { RefundModel } from '@/domain/models'
import {
	AddRefund,
	LoadCategories,
	LoadCustomers,
	LoadProducts,
	UpdateRefund
} from '@/domain/usecases'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
	Button,
	Input,
	InputEmail,
	InputIBAN,
	InputPhone,
	InputPrice,
	Select,
	TextArea
} from '../../form-controls'
import { IconCheck, IconClose, IconEdit, IconTrash } from '../../icons'
import { PdfViewer } from '../../pdf-viewer'
import { useDispatch, useSelector } from 'react-redux'
import {
	useCategories,
	useCustomers,
	useLocations,
	useProducts
} from '@/presentation/hooks'
import toast from 'react-hot-toast'
import {
	addRefundStore,
	loadCategoryStore,
	loadCustomerStore,
	loadProductStore,
	updateRefundStore
} from '@/presentation/redux'
import { NumberUtils } from '@/utils'

type FormDataProps = RefundModel

type RefundEditorProps = {
	addRefund: AddRefund
	updateRefund: UpdateRefund
	loadCustomers: LoadCustomers
	loadCategories: LoadCategories
	loadProducts: LoadProducts
	data?: RefundModel
	onDelete: () => void
}

export function RefundEditor({
	addRefund,
	updateRefund,
	loadCustomers,
	loadCategories,
	loadProducts,
	data,
	onDelete
}: RefundEditorProps) {
	const dispatch = useDispatch()

	const [formData, setFormData] = useState<FormDataProps>({} as any)

	const [pdfUrl, setPdfUrl] = useState('')

	const customers = useSelector(useCustomers())
	const categories = useSelector(useCategories())
	const productList = useSelector(useProducts())
	const products = useMemo(() => {
		return formData.category_id
			? productList.filter(({ category_id }) => category_id == formData.category_id)
			: productList
	}, [formData.category_id, productList])

	const { provinces, municipalities } = useSelector(useLocations())
	const municipalityList = useMemo(() => {
		return formData.province_id
			? municipalities.filter(({ province_id }) => province_id == formData.province_id)
			: municipalities
	}, [formData.province_id, municipalities])

	useEffect(() => {
		if (data?.id) {
			setFormData(data as any)
		} else {
			setFormData({} as any)
		}
	}, [data])

	useEffect(() => {
		if (customers.length < 1) {
			loadCustomers
				.load()
				.then((response) => dispatch(loadCustomerStore(response)))
				.catch(({ message }) => toast.error(message))
		}
		if (categories.length < 1) {
			loadCategories
				.load()
				.then((response) => dispatch(loadCategoryStore(response)))
				.catch(({ message }) => toast.error(message))
		}
		if (productList.length < 1) {
			loadProducts
				.load()
				.then((response) => dispatch(loadProductStore(response)))
				.catch(({ message }) => toast.error(message))
		}
	}, [])

	const handleChangeInput = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		let data = { ...formData, [name]: value }
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined as any }
		}
		if (name == 'category_id') {
			data = { ...data, product_id: undefined as any }
		}
		setFormData(data)
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		try {
			const update = type == 'update'
			if (update && !formData.id) {
				return toast.error('Selecione um registo na tabela abaixo para editar')
			}

			const data: FormDataProps = {
				...formData,
				amount: NumberUtils.convertToPrice(formData.amount)
			}
			const httpResponse = await (update
				? updateRefund.update(data)
				: addRefund.add(data))

			setPdfUrl(httpResponse.file_path)
			toast.success('Admissão processada com sucesso')
			if (update) {
				dispatch(updateRefundStore(httpResponse))
			} else {
				dispatch(addRefundStore(httpResponse))
			}
		} catch ({ message }: any) {
			toast.error(message)
		}
	}

	const handleClear = () => {
		setFormData({} as any)
	}
	return (
		<fieldset>
			<legend>Reembolso</legend>
			<PdfViewer pdfUrl={pdfUrl} onClose={() => setPdfUrl('')} />

			<div className="flex gap-2">
				<div className="flex-1 flex flex-col gap-2">
					<div className="grid grid-cols-4 items-start gap-2">
						<Select
							name="customer_id"
							label="Cliente"
							data={customers.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.customer_id || ''}
							onChange={handleChangeInput}
						/>
						<Input
							name="purchase_date"
							type="date"
							label="Data da Compra"
							value={(formData.purchase_date as any) || ''}
							onChange={handleChangeInput}
						/>
						<Select
							name="category_id"
							label="Categoria"
							data={categories.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.category_id || ''}
							onChange={handleChangeInput}
						/>
						<Select
							name="product_id"
							label="Produto"
							data={products.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.product_id || ''}
							onChange={handleChangeInput}
						/>
						<InputPhone
							name="phone"
							label="Telefone"
							value={formData.phone || ''}
							onChange={handleChangeInput}
						/>
						<InputEmail
							name="email"
							label="E-mail"
							value={formData.email || ''}
							onChange={handleChangeInput}
						/>
						<Select
							name="province_id"
							label="Província"
							data={provinces.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.province_id || ''}
							onChange={handleChangeInput}
						/>
						<Select
							name="municipality_id"
							label="Município"
							data={municipalityList.map(({ name, id }) => ({ text: name, value: id }))}
							defaultText="Selecione"
							value={formData?.municipality_id || ''}
							onChange={handleChangeInput}
						/>
						<Input
							name="address"
							label="Endereço"
							value={formData.address || ''}
							onChange={handleChangeInput}
						/>
						<InputIBAN
							name="iban"
							label="IBAN"
							value={formData.iban || ''}
							onChange={handleChangeInput}
						/>
						<InputPrice
							name="amount"
							label="Valor"
							value={formData.amount || ''}
							onChange={handleChangeInput}
						/>
					</div>
					<TextArea
						name="description"
						label="Descrição"
						value={formData.description || ''}
						onChange={handleChangeInput}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<Button
						variant="green"
						text="Salvar"
						icon={IconCheck}
						onClick={() => handleSubmit('save')}
					/>
					<Button
						variant="gray-light"
						text="Editar"
						icon={IconEdit}
						onClick={() => handleSubmit('update')}
					/>
					<Button text="Limpar" icon={IconClose} onClick={handleClear} />
					<Button variant="red" text="Excluir" icon={IconTrash} onClick={onDelete} />
				</div>
			</div>
		</fieldset>
	)
}
