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
	FilterDataProps,
	SubMenu
} from '@/presentation/components'
import { removeAthleteStore } from '@/presentation/redux'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { HandleOpenCard } from '../components/athlete/HandleOpenCard'
import { HandleOpenCardIMC } from '../components/athlete/HandleOpenCardIMC'
import { useAuth } from '../hooks'
import { NotFound } from './notfound'
import { MenuUtils } from '@/utils'

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
	const [showCard, setShowCard] = useState(false)
	const [showCardIMC, setShowCardIMC] = useState(false)

	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'
	const isNormal = user.role == 'Normal'
	const isRecepcionista = user?.position == 'Recepcionista';

	const dispatch = useDispatch()

	const onDelete = async () => {
		if (!selectedAthlete?.id) return toast.error('Selecione um registro para excluir')
		setShowFormDelete(true)
	}

	const handleOpenCard = async () => {
		setShowCard(true)
	}

	const handleCloseCard = () => {
		setShowCard(false)
	}

	const handleOpenCardIMC = async () => {
		setShowCardIMC(true)
	}

	const handleCloseCardIMC = () => {
		setShowCardIMC(false)
	}

	const handleDelete = async () => {
		try {
			await deleteAthlete.delete(selectedAthlete.id)

			toast.success('Atleta excluído com sucesso')
			setShowFormDelete(false)
			dispatch(removeAthleteStore(selectedAthlete?.id))
			setSelectedAthlete(undefined as any) // Limpa o atleta selecionado
		} catch ({ message }) {
			toast.error(message)
		}
	}

	const handleFilter = (filterData: FilterDataProps) => {
		setFiltered(filterData)
	}

	if (!(isAdmin || (isNormal && isRecepcionista))) return <NotFound />;
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
			{showCard && (
				<HandleOpenCard
					show={showCard}
					onClose={handleCloseCard} // Adiciona uma função para fechar a modal
				/>
			)}
			{showCardIMC && (
				<HandleOpenCardIMC
					show={showCardIMC}
					onClose={handleCloseCardIMC} // Adiciona uma função para fechar a modal
				/>
			)}
			<LayoutBody>
			<SubMenu submenus={MenuUtils.athletesareaMenuItens({ role: user.role })} />
				<div className="flex flex-col gap-4">
					<AthleteEditor
						data={selectedAthlete}
						addAthlete={addAthlete}
						updateAthlete={updateAthlete}
						loadEmployees={loadEmployees}
						onDelete={onDelete}
						handleOpenDetalhe={handleOpenCard}
						handleOpenDetalheIMC={handleOpenCardIMC}
					/>
					<hr />
					<AthleteList onSelect={setSelectedAthlete}  loadAthletes={loadAthletes} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
