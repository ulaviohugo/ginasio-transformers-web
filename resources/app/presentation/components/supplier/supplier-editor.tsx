import React, {
	ChangeEvent,
	FormEvent,
	ReactNode,
	useEffect,
	useMemo,
	useState
} from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { SupplierModel } from '@/domain/models'
import {
	ButtonCancel,
	ButtonSubmit,
	IconPlus,
	IconSupplier,
	ImagePreview,
	Input,
	InputEmail,
	InputPhone,
	Modal,
	ModalBody,
	ModalFooter,
	ModalTitle,
	Select,
	SupplierProductEditor,
	ProductCardChangeProps
} from '..'

import {
	ArrayUtils,
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
	show: boolean
	onClose: () => void
	addSupplier: AddSupplier
	updateSupplier: UpdateSupplier
}

export function SupplierEditor({
	supplier,
	show,
	onClose,
	addSupplier,
	updateSupplier
}: SupplierEditorProps) {
	const dispatch = useDispatch()
	const { countries, provinces, municipalities } = useSelector(useLocations())
	const categories = useSelector(useCategories())
	const products = useSelector(useProducts())

	const [productItems, setProductItems] = useState<any>({ 0: {} })

	const productList = useMemo(() => Object.keys(productItems), [productItems])

	const [provinceList, setProvinceList] = useState<ProvinceProps[]>([])
	const [municipalityList, setMunicipalityList] = useState<MunicipalityProps[]>([])

	const [formDate, setFormData] = useState<SupplierModel>(
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
				setProductItems(ObjectUtils.convertToObject(supplier.supplier_products))
			}
		}
		if (supplier?.photo) setPhotoPreview(supplier.photo)
	}, [supplier])

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
		let data: SupplierModel = { ...formDate, [name]: value }

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
			const file = (e.target as any)?.files[0]
			data = { ...formDate, [name]: file }
			handleInputFile(file)
		}
		setFormData(data)
	}

	const handleChangeProduct = ({ index, name, value }: ProductCardChangeProps) => {
		let data = productItems[index] || { [index]: { [name]: value } }[index]
		const supplier_id = supplier?.id
		if (name == 'category_id') {
			data = { ...data, [name]: value, product_id: undefined, supplier_id }
		} else {
			data = { ...data, [name]: value, supplier_id }
		}

		setProductItems({ ...productItems, [index]: data })
	}

	const handleInputFile = (file: File) => {
		if (file) {
			const reader = new FileReader()

			reader.onload = function (e) {
				setPhotoPreview(String(e.target?.result))
			}

			reader.readAsDataURL(file)
		}
	}

	const clearInputFile = () => {
		setFormData((prev) => ({ ...prev, photo: '' }))
		setPhotoPreview('')
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		const supplierProducts = ArrayUtils.convertToArray(productItems)

		const data: SupplierModel = { ...formDate, supplier_products: supplierProducts }
		try {
			const httpResponse = (
				formDate.id ? await updateSupplier.update(data) : await addSupplier.add(data)
			) as SupplierModel

			if (formDate.id) {
				dispatch(updateSupplierStore(httpResponse))
			} else {
				dispatch(addSupplierStore(httpResponse))
			}
			toast.success(
				`Fornecedor ${formDate.id ? 'actualizado' : 'cadastrado'} com sucesso`
			)
			onClose()
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
	return (
		<Modal show={show} onClose={onClose} size="lg">
			<ModalTitle>
				<IconSupplier />{' '}
				{supplier?.id ? `Fornecedor - ${supplier.name}` : 'Cadastrar fornecedor'}
			</ModalTitle>
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<div className="flex gap-1">
						<div>
							<ImagePreview
								photoPreview={photoPreview}
								onInputFileChange={handleInputChange}
								clearInputFile={clearInputFile}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<div className="flex gap-1">
								<Input
									type="text"
									id="name"
									name="name"
									value={formDate?.name || ''}
									label={LabelUtils.translateField('name')}
									onChange={handleInputChange}
									autoFocus
								/>
								<Input
									type="text"
									id="representative"
									name="representative"
									value={formDate?.representative || ''}
									label={LabelUtils.translateField('representative')}
									onChange={handleInputChange}
								/>
							</div>
							<Divisor label="Contactos" />
							<div className="flex gap-1">
								<InputPhone
									id="phone"
									name="phone"
									value={formDate?.phone || ''}
									label={LabelUtils.translateField('phone')}
									onChange={handleInputChange}
								/>
								<InputEmail
									id="email"
									name="email"
									value={formDate?.email || ''}
									label={LabelUtils.translateField('email')}
									onChange={handleInputChange}
								/>
							</div>
							<Divisor label="Endereço" />
							<div className="flex gap-1">
								<Select
									id="country_id"
									name="country_id"
									value={formDate?.country_id || ''}
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
									value={formDate?.province_id || ''}
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
									value={formDate?.municipality_id || ''}
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
								value={formDate?.address || ''}
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
					<ModalFooter>
						<ButtonSubmit type="submit" disabled={isLoading} isLoading={isLoading} />
						<ButtonCancel onClick={onClose} />
					</ModalFooter>
				</form>
			</ModalBody>
		</Modal>
	)
}

const Divisor = ({ label, children }: { label?: string; children?: ReactNode }) => (
	<div className="mt-3 uppercase">
		{label || ''} {children}
	</div>
)
