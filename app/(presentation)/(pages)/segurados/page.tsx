'use client'

import {
	IconUser,
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
import { InsuredModel } from '@/domain/models'
import {
	makeRemoteAddInsured,
	makeRemoteLoadInsureds
} from '@/main/factories/usecases/remote'
import { mockInsured } from '@/test/model/mocks'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Segurados() {
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
				<Title title={`Segurados (${insureds.length})`} icon={IconUser} />
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
							{insureds.map((insured) => (
								<li key={insured.id} className="shadow p-3">
									<button
										className="font-semibold hover:underline"
										title="Abrir detalhes"
									>
										{insured.name}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
