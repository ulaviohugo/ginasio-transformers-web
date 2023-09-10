'use client'

import { EmployeeModel } from '@/domain/models'
import { NumberUtils, SalaryUtils } from '@/utils'
import { Document, Page, View, Text, PDFViewer } from '@react-pdf/renderer'

export type ReceiptDataProps = {
	year: number
	month: string
	workedDays: number
}

type SalaryReceiptProps = {
	employee: EmployeeModel
	receiptData: ReceiptDataProps
	currentUser: EmployeeModel
}

type HeaderProps = {
	title: string
	employee: EmployeeModel
	receiptData: ReceiptDataProps
	currentUser: EmployeeModel
}

type ItemProps = {
	title: 'Código' | 'Descrição' | 'Referência' | 'Vencimentos' | 'Descontos'
	contents: string[] | number[]
}

const border = 0.5
const fontSize_sm = 8
const fontSize_md = 9
const fontSize_title = 12

export const getSalaryItems = (
	employee: EmployeeModel,
	receiptDate: ReceiptDataProps
): ItemProps[] => {
	const { baseSalary = 0 } = employee
	const workedDays = NumberUtils.convertToNumber(receiptDate.workedDays)
	const currentBaseSalary = SalaryUtils.getSalaryPerDay(baseSalary) * workedDays
	console.log({ workedDays })

	const percent = SalaryUtils.getIRtPercent(currentBaseSalary)
	const irtPercent = percent ? `${percent}%` : 'Isento'
	return [
		{
			title: 'Código',
			contents: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
		},
		{
			title: 'Descrição',
			contents: [
				'Salário base',
				'Subsídio de alimentação',
				'Subsídio de produtividade',
				'Subsídio de Transporte',
				'Abono de Família',
				'INSS',
				'IRT',
				'Outros descontos',
				'Subsídio de férias',
				'13º Décimo terceiro'
			]
		},
		{
			title: 'Referência',
			contents: [
				`${workedDays} Dias`,
				`${workedDays} Dias`,
				`${workedDays} Dias`,
				`${workedDays} Dias`,
				'Mensal',
				'3%',
				irtPercent,
				'',
				'',
				''
			]
		},
		{
			title: 'Vencimentos',
			contents: [currentBaseSalary, 5000, 10000, 1000, 0, 0, 0, 0, 0, 0]
		},
		{
			title: 'Descontos',
			contents: [
				0,
				0,
				0,
				0,
				0,
				SalaryUtils.getINSS(currentBaseSalary),
				SalaryUtils.getIRtValue(currentBaseSalary),
				0,
				0,
				0
			]
		}
	]
}

export function SalaryReceiptTemplate({
	employee,
	receiptData,
	currentUser
}: SalaryReceiptProps) {
	return (
		<PDFViewer width={'100%'} style={{ height: 'calc(100vh - 30px)' }}>
			<Document title={employee.name}>
				<Page
					size={'A4'}
					style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					orientation="landscape"
				>
					<Container
						title="Original"
						employee={employee}
						receiptData={receiptData}
						currentUser={currentUser}
					/>
					<View style={{ border: border }}></View>
					<Container
						title="Cópia"
						employee={employee}
						receiptData={receiptData}
						currentUser={currentUser}
					/>
				</Page>
			</Document>
		</PDFViewer>
	)
}

function Container({ title, employee, receiptData, currentUser }: HeaderProps) {
	const items = getSalaryItems(employee, receiptData)
	return (
		<View style={{ flexDirection: 'column', width: '100%', fontSize: fontSize_md }}>
			<Header title={title} employee={employee} receiptData={receiptData} />
			<Body items={items} />
			<ResumeContent
				employee={employee}
				receiptData={receiptData}
				currentUser={currentUser}
			/>
		</View>
	)
}

function Header({ title, employee, receiptData }: Omit<HeaderProps, 'currentUser'>) {
	return (
		<View
			style={{
				padding: 8,
				gap: 8
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					border: border,
					padding: 8,
					fontSize: fontSize_title
				}}
			>
				<Text>Recibo de pagamento de salário</Text>
				<Text
					style={{ fontSize: fontSize_sm }}
				>{`${receiptData.month} ${receiptData.year}`}</Text>
				<Text>{title}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: 8,
					border: border,
					padding: 9
				}}
			>
				<View>
					<Text>ID</Text>
					<Text>{employee.id}</Text>
				</View>
				<View>
					<Text>FUNCIONÁRIO</Text>
					<Text style={{ flexWrap: 'nowrap' }}>{employee.name}</Text>
				</View>
				<View>
					<Text>FUNÇÃO</Text>
					<Text>{employee.position}</Text>
				</View>
				<View>
					<Text>Nº CONTRIB.</Text>
					<Text>{employee.nif}</Text>
				</View>
				<View>
					<Text>SEG. SOCIAL</Text>
					<Text>{employee.socialSecurity}</Text>
				</View>
			</View>
		</View>
	)
}

function Body({ items }: { items: ItemProps[] }) {
	return (
		<View
			style={{
				flexDirection: 'row',
				paddingHorizontal: 8,
				fontSize: fontSize_sm,
				width: '100%'
			}}
		>
			{items.map((item, i) => (
				<View key={i} style={{ gap: 8, width: i == 0 ? 250 : i == 1 ? 510 : '100%' }}>
					<Text
						style={{
							borderTop: border,
							borderRight: i == items.length - 1 ? border : 0,
							borderLeft: i <= items.length ? border : 0,
							borderBottom: border,
							paddingHorizontal: 8,
							textAlign: 'center',
							paddingTop: 2
						}}
					>
						{item.title.toUpperCase()}
					</Text>
					<View
						style={{
							borderTop: border,
							borderRight: i == items.length - 1 ? border : 0,
							borderLeft: i <= items.length ? border : 0,
							borderBottom: border,
							paddingHorizontal: 4
						}}
					>
						{item.contents.map((content, i) => (
							<Text key={`${content}-${i}`} style={{ minHeight: 20 }}>
								{typeof content == 'number'
									? NumberUtils.formatCurrency(content)
									: content}
							</Text>
						))}
					</View>
				</View>
			))}
		</View>
	)
}

function ResumeContent({ employee, receiptData, currentUser }: SalaryReceiptProps) {
	const salaryHeaders = getSalaryItems(employee, receiptData)
	const totalSalary =
		(
			salaryHeaders.find((salary) => salary.title == 'Vencimentos')?.contents as number[]
		)?.reduce((acc, current) => Number(acc) + Number(current), 0) || 0

	const totalDiscount =
		(
			salaryHeaders.find((salary) => salary.title == 'Descontos')?.contents as number[]
		)?.reduce((acc, current) => Number(acc) + Number(current), 0) || 0

	const netSalary = Number(totalSalary) - Number(totalDiscount)

	const salaryPerDay = SalaryUtils.getSalaryPerDay(employee.baseSalary)
	const salaryPerHour = SalaryUtils.getSalaryPerHour(employee.baseSalary)

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					marginHorizontal: 8,
					marginTop: 8,
					border: border
				}}
			>
				<View
					style={{
						padding: 8,
						gap: 8,
						alignItems: 'center',
						borderRight: border
					}}
				>
					<Text>ENTREGUEI</Text>
					<Text style={{ borderTop: border, width: 150, marginTop: 8 }}></Text>
					<Text>{currentUser.name}</Text>
				</View>

				<View style={{ flex: 1 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<View
							style={{ borderBottom: border, padding: 8, flex: 1, borderRight: border }}
						>
							<Text>Total de Vencimentos</Text>
							<Text>{NumberUtils.formatCurrency(totalSalary)}</Text>
						</View>

						<View style={{ borderBottom: border, padding: 8, flex: 1 }}>
							<Text>Total de Descontos</Text>
							<Text>{NumberUtils.formatCurrency(totalDiscount)}</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ padding: 8 }}>Valor líquido</Text>
						<Text style={{ padding: 8 }}>{NumberUtils.formatCurrency(netSalary)}</Text>
					</View>
				</View>
			</View>
			<View
				style={{
					flexDirection: 'row',
					padding: 8,
					margin: 8,
					justifyContent: 'space-between',
					border
				}}
			>
				<View>
					<Text>Salário base</Text>
					<Text>{NumberUtils.formatCurrency(employee.baseSalary)}</Text>
				</View>
				<View>
					<Text>Salário por dia</Text>
					<Text>{NumberUtils.formatCurrency(salaryPerDay)}</Text>
				</View>
				<View>
					<Text>Salário por hora</Text>
					<Text>{NumberUtils.formatCurrency(salaryPerHour)}</Text>
				</View>
			</View>
			<View
				style={{
					padding: 8,
					margin: 8,
					gap: 8,
					border
				}}
			>
				<Text style={{ textAlign: 'center' }}>
					DECLARO TER RECEBIDO A IMPORTÂNCIA LÍQUIDA DISCRIMINADA NESTE RECIBO
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<View style={{ alignItems: 'center', gap: 8 }}>
						<Text>_____/_____/_____</Text>
						<Text>DATA</Text>
					</View>
					<View style={{ alignItems: 'center', gap: 8 }}>
						<Text>________________________________</Text>
						<Text>ASSINATURA DO FUNCIONÁRIO</Text>
					</View>
				</View>
			</View>
		</View>
	)
}
