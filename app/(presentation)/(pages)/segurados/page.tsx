'use client'

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
	IconPlus
} from '@/(presentation)/components'
import { useLocations } from '@/(presentation)/hooks'
import { InsuredModel } from '@/domain/models'
import {
	makeRemoteAddInsured,
	makeRemoteLoadInsureds
} from '@/main/factories/usecases/remote'
import { mockInsured } from '@/test/model/mocks'
import { PrintUtils } from '@/utils'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function Segurados() {
	const { provinces, municipalities } = useSelector(useLocations())

	const [insureds, setInsureds] = useState<InsuredModel[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)

	useEffect(() => {
		makeRemoteLoadInsureds()
			.load()
			.then(setInsureds)
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
									<li key={insured.id} className="shadow p-3">
										<div className="border-b pb-1 mb-1">
											<button
												className="font-semibold hover:underline"
												title="Abrir detalhes"
											>
												{insured.name}
											</button>
										</div>
										{isPolicyholder && (
											<div className="flex flex-col gap-1 text-sm">
												<div className="">Segurados: {insured.insureds?.length}</div>
												<div>
													<button
														className="btn-default"
														onClick={() => handlePrint(insured)}
													>
														Imprimir apólice
													</button>
												</div>
											</div>
										)}
										{insured.policyholder && (
											<div className="text-sm">Titular: {insured.policyholder?.name}</div>
										)}
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
