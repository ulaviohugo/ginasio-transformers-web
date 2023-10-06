import React from 'react'
import {
	IconInsured,
	PolicyholderEditor,
	Layout,
	LayoutBody,
	Title,
	Spinner,
	NoData,
	Modal,
	ModalTitle,
	ModalBody,
	IconPlus,
	CardActions
} from '@/presentation/components'
import { useInsureds, useLocations } from '@/presentation/hooks'
import { loadInsuredStore } from '@/presentation/redux'
import { InsuredModel } from '@/domain/models'
import {
	makeRemoteAddInsured,
	makeRemoteLoadInsureds
} from '@/main/factories/usecases/remote'
import { mockInsured } from '@/test/model/mocks'
import { PrintUtils } from '@/utils'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export function Insureds() {
	const dispatch = useDispatch()
	const { provinces, municipalities } = useSelector(useLocations())

	const insureds = useSelector(useInsureds())
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)

	useEffect(() => {
		makeRemoteLoadInsureds()
			.load()
			.then((response) => dispatch(loadInsuredStore(response)))
			.catch(({ message }) => toast.error(message))
			.finally(() => setIsLoading(false))
	}, [])

	const handleShowEditor = () => {
		setShowEditor(true)
	}

	const handleHideEditor = () => {
		setShowEditor(false)
	}

	const handlePrint = (insured: InsuredModel) => {
		const province = provinces.find((province) => province.id == insured.provinceId)?.name
		const municipality = municipalities.find(
			(municipality) => municipality.id == insured.municipalityId
		)?.name

		PrintUtils.printPolicy({ ...insured, province, municipality })
	}
	return (
		<Layout>
			<LayoutBody>
				{showEditor && (
					<Modal show onClose={handleHideEditor} size="full">
						<ModalTitle>Segurado</ModalTitle>
						<ModalBody>
							<PolicyholderEditor
								addInsured={makeRemoteAddInsured()}
								policyholder={mockInsured()}
								onSubmitSuccess={handleHideEditor}
							/>
						</ModalBody>
					</Modal>
				)}
				<Title title={`Segurados (${insureds.length})`} icon={IconInsured} />
				<div className="my-2">
					<button className="btn-primary" onClick={handleShowEditor}>
						<IconPlus />
					</button>
				</div>
				<div className="">
					{isLoading ? (
						<Spinner />
					) : insureds.length < 1 ? (
						<NoData />
					) : (
						<ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4">
							{insureds.map((insured) => {
								const isPolicyholder = !insured.policyholderId
								return (
									<li key={insured.id} className="flex flex-col shadow p-3">
										<div className="border-b pb-1 mb-1">
											<button
												className="font-semibold hover:underline"
												title="Abrir detalhes"
											>
												{insured.name}
											</button>
										</div>

										{isPolicyholder ? (
											<div className="flex flex-col gap-1 text-sm">
												<div>
													<span className="inline-flex px-[6px] py-[2px] bg-green-50 border border-green-200 text-xs rounded-md text-black">
														Titular de co-seguro
													</span>
												</div>
												<div className="flex gap-1 items-center">
													<IconInsured />{' '}
													<div>
														Segurados:{' '}
														<span className="font-bold">{insured.insureds?.length}</span>
													</div>
												</div>
												<div className="flex gap-2">
													<button
														className="btn-default"
														onClick={() => handlePrint(insured)}
													>
														Imprimir apólice
													</button>
													<button
														className="btn-default"
														onClick={() => handlePrint(insured)}
													>
														Enviar por e-mail
													</button>
												</div>
											</div>
										) : (
											<div className="text-sm">
												<span className="inline-flex px-[6px] py-[2px] bg-orange-50 border border-orange-200 text-xs rounded-md text-black">
													Dependente
												</span>
												<div>Titular: {insured.policyholder?.name}</div>
											</div>
										)}
										<div className="mt-auto">
											<CardActions className="mt-2" border />
										</div>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
