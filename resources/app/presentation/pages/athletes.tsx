import { AthleteModel } from '@/domain/models'
import {
	AddAthlete,
	DeleteAthlete,
	LoadAthletes,
	LoadEmployees,
	UpdateAthlete
} from '@/domain/usecases'
import {
	Layout,
	LayoutBody,
	AthleteEditor,
	AthleteList,
	ModalDelete,
	FilterDataProps
} from '@/presentation/components'
import { removeAthleteStore } from '@/presentation/redux'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

type AthleteProps = {
	loadAthletes: LoadAthletes
	addAthlete: AddAthlete
	updateAthlete: UpdateAthlete
	deleteAthlete: DeleteAthlete
	loadEmployees: LoadEmployees
}

export function Athletes({
	loadAthletes,
	addAthlete,
	deleteAthlete,
	updateAthlete,
	loadEmployees
}: AthleteProps) {
	const [selectedAthlete, setSelectedAthlete] = useState<AthleteModel>(undefined as any)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const [filtered, setFiltered] = useState<FilterDataProps>({} as FilterDataProps)
	 

	const dispatch = useDispatch()

	const onDelete = async () => {
		if (!selectedAthlete?.id) return toast.error('selecione um registo para excluir')
		setShowFormDelete(true)
	}

	const handleDelete = async () => {
		try {
			await deleteAthlete.delete(selectedAthlete.id)

			toast.success('Atleta excluído com sucesso')
			setShowFormDelete(false)
			dispatch(removeAthleteStore(selectedAthlete?.id))
			setSelectedAthlete({} as any)
		} catch ({ message }) {
			toast.error(message)
		}
	}

	const handleFilter = (filterData: FilterDataProps) => {
		setFiltered(filterData)
	}

	return (
		<Layout title="Atletas">
			{showFormDelete && (
				<ModalDelete
					entity="recibo"
					description={`Deseja realmente excluir o atleta
					${selectedAthlete?.name}?`}
					show={showFormDelete}
					onClose={() => setShowFormDelete(false)}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-4">
					<AthleteEditor
						data={selectedAthlete}
						addAthlete={addAthlete}
						updateAthlete={updateAthlete}
						loadEmployees={loadEmployees}
						onDelete={onDelete}
					/>
					<hr />
					<AthleteList onSelect={setSelectedAthlete}  loadAthletes={loadAthletes} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
