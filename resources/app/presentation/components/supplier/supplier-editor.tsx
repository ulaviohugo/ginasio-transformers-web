import React, { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { SupplierModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconPlus,
	ImagePreview,
	Input,
	InputEmail,
	InputPhone,
	Select,
	SupplierProductEditor,
	SupplierProductCardChangeProps,
	IconTrash,
	IconEdit
} from '..'

import {
	ArrayUtils,
	FileUtils,
	LabelUtils,
	MunicipalityProps,
	NumberUtils,
	ObjectUtils,
	ProvinceProps
} from '@/utils'
import {
	addSupplierStore,
	loadCategoryStore,
	loadProductStore,
	updateSupplierStore
} from '@/presentation/redux'
import { AddSupplier, UpdateSupplier } from '@/domain/usecases'
import { useCategories, useLocations, useProducts } from '@/presentation/hooks'
import {
	makeRemoteLoadCategories,
	makeRemoteLoadProduct
} from '@/main/factories/usecases'

type SupplierEditorProps = {
	supplier?: SupplierModel
	addSupplier: AddSupplier
	updateSupplier: UpdateSupplier
	onDelete?: () => void
}

const initialProductItem = { 0: {} }

export function SupplierEditor({
	supplier,
	addSupplier,
	updateSupplier,
	onDelete
}: SupplierEditorProps) {
	const dispatch = useDispatch()
	const { countries, provinces, municipalities } = useSelector(useLocations())
	const categories = useSelector(useCategories())
	const products = useSelector(useProducts())

	const [productItems, setProductItems] = useState<any>(initialProductItem)

	const productList = useMemo(() => Object.keys(productItems), [productItems])

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formData, setFormData] = useState<SupplierModel>(
		supplier || ({} as SupplierModel)
	)
	const [isLoading, setIsLoading] = useState(false)
	const [photoPreview, setPhotoPreview] = useState('')

	const fetchData = (
		remoteResource: { load: () => Promise<any> },
		callback: (response: any) => void
	) => {
		remoteResource
			.load()
			.then((response) => {
				callback(response)
			})
			.catch(() => {
				toast.error('Error ao consultar dados')
			})
	}

	useEffect(() => {
		if (supplier) {
			setProvinceList(
				provinces.filter((province) => province.country_id == supplier.country_id)
			)
			setMunicipalityList(
				municipalities.filter(
					(municipality) => municipality.province_id == supplier.province_id
				)
			)
			if (supplier.supplier_products?.length) {
				const prods = ObjectUtils.convertToObject(supplier.supplier_products)
				setProductItems(prods)
			}
			setFormData(supplier)
		}
		setPhotoPreview(supplier?.photo || '')
	}, [municipalities, provinces, supplier])

	useEffect(() => {
		if (categories.length < 1) {
			fetchData(makeRemoteLoadCategories(), (response) => {
				dispatch(loadCategoryStore(response))
			})
		}
		if (products.length < 1) {
			fetchData(makeRemoteLoadProduct(), (response) => {
				dispatch(loadProductStore(response))
			})
		}
	}, [])

	const handleInputChange = async (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		let data: SupplierModel = { ...formData, [name]: value }

		if (name == 'country_id') {
			data = { ...data, province_id: undefined, municipality_id: undefined }
			setProvinceList(
				provinces.filter((province) => province.country_id == Number(value))
			)
		}
		if (name == 'province_id') {
			data = { ...data, municipality_id: undefined }
			setMunicipalityList(
				municipalities.filter((municipality) => municipality.province_id == Number(value))
			)
		}
		if (name == 'photo') {
			const file = await FileUtils.toBase64((e.target as any)?.files[0])
			data = { ...formData, [name]: file }
			setPhotoPreview(file)
		}
		setFormData(data)
	}

	const handleChangeProduct = ({
		index,
		name,
		value
	}: SupplierProductCardChangeProps) => {
		let data = productItems[index] || { [index]: { [name]: value } }[index]
		const supplier_id = supplier?.id
		if (name == 'category_id') {
			data = { ...data, [name]: value, product_id: undefined, supplier_id }
		} else {
			data = { ...data, [name]: value, supplier_id }
		}

		setProductItems({ ...productItems, [index]: data })
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const handleSubmit = async (type: 'save' | 'update' = 'save') => {
		const update = type == 'update'
		if (update && !formData.id) {
			setIsLoading(false)
			return toast.error('Selecione um registo para editar')
		}
		const supplierProducts = ArrayUtils.convertToArray(productItems)

		const data: SupplierModel = { ...formData, supplier_products: supplierProducts }
		setIsLoading(true)
		try {
			const httpResponse = (
				update ? await updateSupplier.update(data) : await addSupplier.add(data)
			) as SupplierModel

			if (update) {
				dispatch(updateSupplierStore(httpResponse))
			} else {
				dispatch(addSupplierStore(httpResponse))
			}
			toast.success(`Fornecedor ${update ? 'actualizado' : 'cadastrado'} com sucesso`)
			handleClear()
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleAddProductItem = () => {
		const data = { ...productItems }
		const keys = Object.keys(data)

		const key =
			ArrayUtils.getGreaterValue(
				keys.map((keyItem) => NumberUtils.convertToNumber(keyItem))
			) + 1
		Object.assign(data, { [key]: {} })
		setProductItems(data)
	}

	const handleRemoveProductItem = (index: number) => {
		let data = { ...productItems }
		data = ObjectUtils.removeProps(data, [`${index}`])

		setProductItems(data)
	}

	const handleClear = () => {
		setFormData({} as any)
		clearInputFile()
		setProductItems(initialProductItem)
	}

	const handleOpenDelete = () => {
		if (!formData.id) return toast.error('Selecione um registo para excluir')
		if (onDelete) onDelete()
	}
	return (
		<fieldset className="flex gap-2">
			<legend>Cadastro de fornecedor</legend>
			<div className="flex-1 flex gap-1">
				<div>
					<ImagePreview
						photoPreview={photoPreview}
						onInputFileChange={handleInputChange}
						clearInputFile={clearInputFile}
					/>
				</div>
				<div className="flex-1 flex flex-col gap-1">
					<div className="flex gap-1">
						<Input
							type="text"
							id="name"
							name="name"
							value={formData?.name || ''}
							label={LabelUtils.translateField('name')}
							onChange={handleInputChange}
							autoFocus
						/>
						<Input
							type="text"
							id="representative"
							name="representative"
							value={formData?.representative || ''}
							label={LabelUtils.translateField('representative')}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex gap-1">
						<InputPhone
							id="phone"
							name="phone"
							value={formData?.phone || ''}
							label={LabelUtils.translateField('phone')}
							onChange={handleInputChange}
						/>
						<InputEmail
							id="email"
							name="email"
							value={formData?.email || ''}
							label={LabelUtils.translateField('email')}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex gap-1">
						<Select
							id="country_id"
							name="country_id"
							value={formData?.country_id || ''}
							label={LabelUtils.translateField('country_id')}
							data={countries.map(({ name, id }) => ({
								text: name,
								value: id
							}))}
							defaultText="Selecione"
							onChange={handleInputChange}
						/>
						<Select
							id="province_id"
							name="province_id"
							value={formData?.province_id || ''}
							label={LabelUtils.translateField('province_id')}
							data={provinceList.map(({ name, id }) => ({
								text: name,
								value: id
							}))}
							defaultText="Selecione"
							onChange={handleInputChange}
						/>
						<Select
							id="municipality_id"
							name="municipality_id"
							value={formData?.municipality_id || ''}
							label={LabelUtils.translateField('municipality_id')}
							data={municipalityList.map(({ name, id }) => ({
								text: name,
								value: id
							}))}
							defaultText="Selecione"
							onChange={handleInputChange}
						/>
					</div>
					<Input
						type="text"
						id="address"
						name="address"
						value={formData?.address || ''}
						label={LabelUtils.translateField('address')}
						onChange={handleInputChange}
					/>
					<div>
						<Divisor label={`Produtos fornecidos (${productList?.length})`}>
							<div>
								<span
									className="btn-primary"
									onClick={handleAddProductItem}
									title="Adicionar producto"
								>
									<IconPlus />
								</span>
							</div>
						</Divisor>
						<div className="max-h-[250px] overflow-auto">
							{productList?.map((key, i) => (
								<div key={key}>
									<SupplierProductEditor
										itemIndex={Number(key)}
										index={i}
										supplierProduct={productItems[key]}
										onChange={handleChangeProduct}
										onRemoveItem={handleRemoveProductItem}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<ButtonSubmit
					disabled={isLoading}
					isLoading={isLoading}
					onClick={() => handleSubmit('save')}
					className="!bg-green-700 !text-white"
				/>
				<ButtonSubmit
					text="Editar"
					icon={IconEdit}
					disabled={isLoading}
					isLoading={isLoading}
					onClick={() => handleSubmit('update')}
					className="!bg-opacity-60 !text-white"
				/>
				<ButtonCancel text="Limpar" onClick={handleClear} />
				{onDelete && (
					<ButtonCancel
						text="Excluir"
						icon={IconTrash}
						onClick={handleOpenDelete}
						className="!bg-red-700 !text-white"
					/>
				)}
			</div>
		</fieldset>
	)
}

const Divisor = ({ label, children }: { label?: string; children?: ReactNode }) => (
	<div className="mt-3 uppercase">
		{label || ''} {children}
	</div>
)
