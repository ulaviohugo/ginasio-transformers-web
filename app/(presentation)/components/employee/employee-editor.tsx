import { Employee } from '@/app/domain/models'
import { Modal, ModalBody, ModalTitle } from '..'

type EmployeeEditorProps = {
	employee?: Employee
	show: boolean
	onClose: () => void
}

export function EmployeeEditor({ employee, show, onClose }: EmployeeEditorProps) {
	return (
		<Modal show={show} onClose={onClose}>
			<ModalTitle>
				<h2 className="text-xl font-semibold mb-4">Formulário Extraordinário</h2>
			</ModalTitle>
			<ModalBody>
				<div className="mx-auto bg-white p-1 rounded shadow-md">
					<form className="">
						<div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block font-medium text-gray-700">
									Nome:
								</label>
								<input
									type="text"
									id="name"
									name="name"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="gender" className="block font-medium text-gray-700">
									Gênero:
								</label>
								<input
									type="text"
									id="gender"
									name="gender"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="dateOfBirth" className="block font-medium text-gray-700">
									Data de Nascimento:
								</label>
								<input
									type="date"
									id="dateOfBirth"
									name="dateOfBirth"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="hireDate" className="block font-medium text-gray-700">
									Data de Contratação:
								</label>
								<input
									type="date"
									id="hireDate"
									name="hireDate"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="maritalStatus"
									className="block font-medium text-gray-700"
								>
									Estado Civil:
								</label>
								<select
									id="maritalStatus"
									name="maritalStatus"
									className="mt-1 p-2 w-full border rounded"
								>
									<option value="single">Solteiro(a)</option>
									<option value="married">Casado(a)</option>
									<option value="divorced">Divorciado(a)</option>
									<option value="widowed">Viúvo(a)</option>
								</select>
							</div>
							<div>
								<label
									htmlFor="educationDegree"
									className="block font-medium text-gray-700"
								>
									Grau de Educação:
								</label>
								<input
									type="text"
									id="educationDegree"
									name="educationDegree"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="phone1" className="block font-medium text-gray-700">
									Telefone 1:
								</label>
								<input
									type="tel"
									id="phone1"
									name="phone1"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="phone2" className="block font-medium text-gray-700">
									Telefone 2:
								</label>
								<input
									type="tel"
									id="phone2"
									name="phone2"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="email" className="block font-medium text-gray-700">
									Email:
								</label>
								<input
									type="email"
									id="email"
									name="email"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div className="md:col-span-2">
								<label
									htmlFor="residentialAddress"
									className="block font-medium text-gray-700"
								>
									Endereço Residencial:
								</label>
								<textarea
									id="residentialAddress"
									name="residentialAddress"
									rows={2}
									className="mt-1 p-2 w-full border rounded"
								></textarea>
							</div>
							<div>
								<label htmlFor="documentType" className="block font-medium text-gray-700">
									Tipo de Documento:
								</label>
								<input
									type="text"
									id="documentType"
									name="documentType"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="documentNumber"
									className="block font-medium text-gray-700"
								>
									Número do Documento:
								</label>
								<input
									type="text"
									id="documentNumber"
									name="documentNumber"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="nif" className="block font-medium text-gray-700">
									NIF:
								</label>
								<input
									type="text"
									id="nif"
									name="nif"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="dependents" className="block font-medium text-gray-700">
									Número de Dependentes:
								</label>
								<input
									type="number"
									id="dependents"
									name="dependents"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="socialSecurity"
									className="block font-medium text-gray-700"
								>
									Segurança Social:
								</label>
								<input
									type="text"
									id="socialSecurity"
									name="socialSecurity"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="position" className="block font-medium text-gray-700">
									Cargo:
								</label>
								<input
									type="text"
									id="position"
									name="position"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="baseSalary" className="block font-medium text-gray-700">
									Salário Base:
								</label>
								<input
									type="text"
									id="baseSalary"
									name="baseSalary"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="contractEndDate"
									className="block font-medium text-gray-700"
								>
									Data de Fim de Contrato:
								</label>
								<input
									type="date"
									id="contractEndDate"
									name="contractEndDate"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="workTime" className="block font-medium text-gray-700">
									Horário de Trabalho:
								</label>
								<input
									type="text"
									id="workTime"
									name="workTime"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label htmlFor="iban" className="block font-medium text-gray-700">
									IBAN:
								</label>
								<input
									type="text"
									id="iban"
									name="iban"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
							<div>
								<label
									htmlFor="accountNumber"
									className="block font-medium text-gray-700"
								>
									Número de Conta:
								</label>
								<input
									type="text"
									id="accountNumber"
									name="accountNumber"
									className="mt-1 p-2 w-full border rounded"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
						>
							Enviar
						</button>
					</form>
				</div>
			</ModalBody>
		</Modal>
	)
}
