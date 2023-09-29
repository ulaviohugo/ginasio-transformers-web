'use client'

import { ChangeEvent } from 'react'
import { Input, Select } from '..'

type InsuredEditorProps = {
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function InsuredEditor({ onChange }: InsuredEditorProps) {
	return (
		<fieldset className="my-4">
			<legend>Novo segurado</legend>
			<div className="grid grid-cols-4 gap-2">
				<Input
					name="name"
					id="name"
					label="Nome"
					placeholder="Digite o nome do segurado"
					onChange={onChange}
				/>
				<Input
					name="cardName"
					id="cardName"
					label="Nome a constar no cartão"
					placeholder="Digite o nome a constar no cartão"
					onChange={onChange}
				/>
				<Input
					type="date"
					name="birthDate"
					id="birthDate"
					label="Data de nascimento"
					placeholder="Digite o nome a constar no cartão"
					onChange={onChange}
				/>
				<Select
					name="gender"
					id="gender"
					label="Sexo"
					data={[{ text: 'Masculino' }, { text: 'Feminino' }]}
					defaultText="Selecione"
				/>
				<Select
					name="maritalStatus"
					id="maritalStatus"
					label="Estado civil"
					data={[
						{ text: 'Solteiro(a)' },
						{ text: 'Casado(a)' },
						{ text: 'Divorciado(a)' },
						{ text: 'Viúvo(a)' }
					]}
					defaultText="Selecione"
				/>
			</div>
		</fieldset>
	)
}
