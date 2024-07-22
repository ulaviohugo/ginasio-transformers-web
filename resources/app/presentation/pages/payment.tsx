import React, { ChangeEvent, useEffect, useState } from 'react';
import {
	Button,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	Select,
	SubMenu,
	Title
} from '../components';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http';
import toast from 'react-hot-toast';
import { DateUtils, MenuUtils } from '@/utils';
import { FilterDataProps, FilterPayment } from '../components/filter-Payment';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks';
import { ModalEdit } from '../components/modal/modal-edit';
import { NotFound } from './notfound';

type FormDataProps = {
	athlete_id: number;
	year: number;
	month: number;
	monthlyValue: number;
	monthlyFine: number;
	amount: number;
	paymentMethod: string;
};

type PaymentProps = {
	id: number;
	name: string;
	year: number;
	month: number;
	monthlyValue: number;
	monthlyFine: number;
	created_at: Date;
	updated_at: Date;
	athlete_id: number;
	paymentMethod: string;
};

export function Payment() {
	const user = useSelector(useAuth());

	const [mensalidades, setMensalidade] = useState<PaymentProps[]>([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedMensalidade, setSelectMensalidade] = useState<PaymentProps>();

	const isAdmin = user.role === 'Admin';
	const isNormal = user.role === 'Normal';
	const isRecepcionista = user?.position === 'Recepcionista';

	const [formData, setFormData] = useState<FormDataProps>({
		athlete_id: 0,
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		monthlyValue: 10000, // Valor mensal fixo (exemplo)
		monthlyFine: 0,
		amount: 0,
		paymentMethod: ''
	});

	const [filtered, setFiltered] = useState<FilterDataProps>({
		athlete_id: '' as any,
		month: '' as any,
		name: '' as any,
		gym_id: '' as any,
		created_at: '' as any,
		year: new Date().getFullYear()
	});

	const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const fetchData = async (queryParams?: string) => {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade' + (queryParams || '')),
			method: 'get'
		});
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			setMensalidade(httpResponse.body);
		} else {
			toast.error(httpResponse.body);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const handleCloseEditModal = () => {
		setShowEditModal(false);
	};

	const handleOpenDeleteModal = () => {
		if (!selectedMensalidade?.id) {
			toast.error('Selecione a linha da mensalidade que deseja excluir');
		} else {
			setShowDeleteModal(true);
		}
	};

	const handleOpenUpdateModal = () => {
		if (!selectedMensalidade?.id) {
			toast.error('Selecione a mensalidade que deseja Editar');
		} else {
			setShowEditModal(true);
		}
	};

	const handleClear = () => {
		setSelectMensalidade({} as any);
		setFormData({
			athlete_id: 0,
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
			monthlyValue: 10000, // Reinicializa com o valor mensal fixo (exemplo)
			monthlyFine: 0,
			amount: 0,
			paymentMethod: ''
		});
	};

	async function handleSubmit() {
    try {
        const hasPaid = await checkIfAthletePaid(formData.athlete_id, formData.year, formData.month);

        if (!hasPaid && new Date().getDate() > 1) {
            setFormData({
                ...formData,
                monthlyFine: 1500
            });
        }

        const httpResponse = await makeAuthorizeHttpClientDecorator().request({
            url: makeApiUrl('/mensalidade'),
            method: 'post',
            body: formData
        });

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            toast.success('Mensalidade cadastrada com sucesso');
            fetchData();
            handleClear();
        } else {
            // Tratamento específico para o erro de violação de chave única
            if (
                httpResponse.body &&
                httpResponse.body.error === 'O atleta já pagou este mês.'
            ) {
                toast.error('O atleta já pagou este mês.');
            } else {
                // Tratamento genérico para outros erros
                toast.error(
                    'Erro ao cadastrar a mensalidade. Por favor, tente novamente mais tarde.'
                );
            }
        }
    } catch (error) {
        // Tratamento para erros não esperados
        console.error('Ocorreu um erro ao processar a requisição:', error);
        toast.error(
            'Erro ao processar a requisição. Por favor, tente novamente mais tarde.'
        );
    }
}


	async function handleDelete() {
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade/' + selectedMensalidade?.id),
			method: 'delete',
			body: formData
		});
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Mensalidade excluida com sucesso');
			handleCloseDeleteModal();
			fetchData();
			handleClear();
		} else {
			toast.error(httpResponse.body);
		}
	}

	async function handleUpdate() {
		if (!selectedMensalidade?.id) {
			return toast.error('Selecione a linha da mensalidade que deseja editar');
		}
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl('/mensalidade/' + selectedMensalidade?.id),
			method: 'put',
			body: formData
		});
		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			toast.success('Mensalidade Editada com sucesso');
			handleCloseEditModal();
			fetchData();
			handleClear();
		} else {
			toast.error(httpResponse.body);
		}
	}

	async function handleFilter(filterData: FilterDataProps) {
		setFiltered(filterData);
		fetchData(
			`?name=${filterData.name}&created_at=${filterData.created_at}&athlete_id=${filterData.athlete_id}&month=${filterData.month}&year=${filterData.year}&gym_id=${filterData.gym_id}`
		);
	}

	const handleOpenPdf = () => {
		const queryParams = `?athlete_id=${filtered.athlete_id}&name=${filtered.name}&created_at=${filtered.created_at}&month=${filtered.month}&year=${filtered.year}&gym_id=${filtered.gym_id}`;
		window.open(`/pdf/mensalidades${queryParams}`);
	};

	const handleOpenReceiptPdf = () => {
		const queryParams = `?athlete_id=${filtered.athlete_id}&name=${filtered.name}&created_at=${filtered.created_at}&month=${filtered.month}&year=${filtered.year}&gym_id=${filtered.gym_id}`;
		window.open(`/pdf/recibo${queryParams}`);
	};

	async function checkIfAthletePaid(athlete_id: number, year: number, month: number): Promise<boolean> {
		// Lógica para verificar se o atleta já pagou este mês
		const httpResponse = await makeAuthorizeHttpClientDecorator().request({
			url: makeApiUrl(`/mensalidade/paid?athlete_id=${athlete_id}&year=${year}&month=${month}`),
			method: 'get'
		});

		if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
			// Se retornar algum resultado, significa que o atleta já pagou
			return httpResponse.body.length > 0;
		} else {
			toast.error('Aplicamos uma multa no atleta')
			return false;
		}
	}

	if (!(isAdmin || (isNormal && isRecepcionista))) return <NotFound />;
	return (
		<Layout title="Mensalidade">
			{showDeleteModal && (
				<ModalDelete
					description="Deseja realmente Excluir a mensalidade"
					onClose={handleCloseDeleteModal}
					onSubmit={handleDelete}
					show
				/>
			)}
			{showEditModal && (
				<ModalEdit
					description="Deseja salvar as alterações feitas no(a) mensalidade"
					onClose={handleCloseEditModal}
					onSubmit={handleUpdate}
					show
				/>
			)}
			<LayoutBody>
				<SubMenu submenus={MenuUtils.athletesareaMenuItens({ role: user.role })} />
				<Title title="Mensalidade" />
				<div className="flex items-start gap-3 mt-3">
					<div className="flex-1">
					<form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <Input
        name="athlete_id"
        onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
                handleInput(e);
            }
        }}
        label="Nº do Processo"
        required
        type="number"
        placeholder="Informe o número do atleta"
        value={formData.athlete_id || ''}
    />
    <Input
        name="amount"
        onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
                handleInput(e);
            }
        }}
        label="Quantidade"
        required
        type="number"
        placeholder="Quantidade de meses"
        value={formData.amount || ''}
    />
    <Input
        name="year"
        onChange={handleInput}
        label="Ano"
        required
        type="number"
        value={formData.year || ''}
    />
    <Select
        name="month"
        onChange={handleInput}
        label="Mês"
        required
        data={DateUtils.getMonthUtils().map((month, i) => ({
            text: month,
            value: i + 1
        }))}
        defaultText="Selecione"
        value={formData.month || ''}
    />
    <Input
        name="monthlyValue"
        onChange={handleInput}
        label="Pagamento"
        required
        type="number"
        placeholder="Quanto atleta vai pagar"
        value={formData.monthlyValue.toString()}
        disabled={true}
    />
    <Input
        name="monthlyFine"
        onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0) {
                handleInput(e);
            }
        }}
        label="Multa"
        type="number"
        placeholder="Quanto atleta vai pagar de multa"
        value={formData.monthlyFine || ''}
    />
    <Select
        name="paymentMethod"
        onChange={handleInput}
        label="Método de pagamento"
        required
        data={['Dinheiro a vista', 'TPA', 'Transferência'].map((pagamento) => ({
            text: pagamento
        }))}
        value={formData.paymentMethod || ''}
        defaultText="Selecione"
    />
</form>

					</div>
					<div className="flex flex-col gap-2">
						<Button
							onClick={handleSubmit}
							variant="green"
							text="Cadastrar"
							type="button"
						/>
						<Button
							onClick={() => {
								setSelectMensalidade(selectedMensalidade);
								handleOpenUpdateModal();
							}}
							variant="gray-light"
							text="Salvar"
							type="button"
						/>
						<Button
							onClick={() => {
								setSelectMensalidade(selectedMensalidade);
								handleOpenDeleteModal();
							}}
							variant="red"
							text="Excluir"
							type="button"
						/>
						<Button
							onClick={() => {
								handleClear();
							}}
							variant="default"
							text="Limpar"
							type="button"
						/>
						<Button
							onClick={() => {
								handleOpenPdf();
							}}
							variant="default"
							text="Propina"
							type="button"
						/>
					</div>
				</div>
				<div>
					<fieldset>
						<legend>Filtro</legend>
						<Button
							onClick={() => {
								handleOpenReceiptPdf();
							}}
							variant="default"
							text="Recibo"
							type="button"
						/>
						<FilterPayment onFilter={handleFilter} />
						<table className="w-full">
							<thead>
								<tr className="gap-10">
									<td>Nome</td>
									<td>Mês</td>
									<td>Ano</td>
									<td>Mensalidade</td>
									<td>Data do pagamento</td>
									<td>Multa</td>
									<td>Nº do processo</td>
									<td>Código</td>
									<td>Método de pagamento</td>
								</tr>
							</thead>
							<tbody>
								{mensalidades.map((mensal) => {
									return (
										<tr
											key={mensal.id}
											className="cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setFormData(mensal);
												setSelectMensalidade(mensal);
											}}
										>
											<td>{mensal.name}</td>
											<td>{DateUtils.getMonthExt(mensal.month - 1)}</td>
											<td>{mensal.year}</td>
											<td>{mensal.monthlyValue}</td>
											<td>{DateUtils.getDatePt(mensal.created_at).toString()}</td>
											<td>{mensal.monthlyFine}</td>
											<td>{mensal.athlete_id}</td>
											<td>{mensal.id}</td>
											<td>{mensal.paymentMethod}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	);
}
