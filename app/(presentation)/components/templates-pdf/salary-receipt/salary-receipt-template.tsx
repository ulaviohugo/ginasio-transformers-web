'use client'
import { Employee } from '@/app/domain/models'
import { NumberUtils, SalaryUtils } from '@/app/utils'
import { Document, Page, View, Text, PDFViewer } from '@react-pdf/renderer'

export type ReceiptDataProps = {
	year: number
	month: string
	workedDays: number
}

type SalaryReceiptProps = {
	employee: Employee
	receiptData: ReceiptDataProps
}

type HeaderProps = {
	title: string
	employee: Employee
	receiptData: ReceiptDataProps
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
	employee: Employee,
	receiptDate: ReceiptDataProps
): ItemProps[] => {
	const { baseSalary = 0 } = employee
	const percent = SalaryUtils.getIRtPercent(baseSalary)
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
				`${receiptDate.workedDays} Dias`,
				`${receiptDate.workedDays} Dias`,
				`${receiptDate.workedDays} Dias`,
				`${receiptDate.workedDays} Dias`,
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
			contents: [baseSalary, 5000, 10000, 1000, 0, 0, 0, 0, 0, 0]
		},
		{
			title: 'Descontos',
			contents: [
				0,
				0,
				0,
				0,
				0,
				SalaryUtils.getINSS(baseSalary),
				SalaryUtils.getIRtValue(baseSalary),
				0,
				0,
				0
			]
		}
	]
}

export function SalaryReceiptTemplate({ employee, receiptData }: SalaryReceiptProps) {
	return (
		<PDFViewer width={'100%'} style={{ height: 'calc(100vh - 30px)' }}>
			<Document title={employee.name}>
				<Page
					size={'A4'}
					style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					orientation="landscape"
				>
					<Container title="Original" employee={employee} receiptData={receiptData} />
					<View style={{ border: border }}></View>
					<Container title="Cópia" employee={employee} receiptData={receiptData} />
				</Page>
			</Document>
		</PDFViewer>
	)
}

function Container({ title, employee, receiptData }: HeaderProps) {
	const items = getSalaryItems(employee, receiptData)
	return (
		<View style={{ flexDirection: 'column', width: '100%', fontSize: fontSize_md }}>
			<Header title={title} employee={employee} receiptData={receiptData} />
			<Body items={items} />
			<ResumeContent employee={employee} receiptData={receiptData} />
		</View>
	)
}

function Header({ title, employee, receiptData }: HeaderProps) {
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
					<Text>{employee.name}</Text>
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

function ResumeContent({ employee, receiptData }: SalaryReceiptProps) {
	const salaryHeaders = getSalaryItems(employee, receiptData)
	const totalSalary = salaryHeaders
		.filter((salary) => salary.title == 'Vencimentos')
		.map((salary) => salary.contents)
		.reduce((acc, current) => Number(acc) + Number(current), 0)

	const totalDiscount = salaryHeaders
		.filter((salary) => salary.title == 'Descontos')
		.map((salary) => salary.contents)
		.reduce((acc, current) => Number(acc) + Number(current), 0)

	return (
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
				<Text>{employee.name}</Text>
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
						<Text>{totalSalary}</Text>
					</View>

					<View style={{ borderBottom: border, padding: 8, flex: 1 }}>
						<Text>Total de Descontos</Text>
						<Text>{totalDiscount}</Text>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ padding: 8 }}>Valor líquido</Text>
					<Text style={{ padding: 8 }}>15000</Text>
				</View>
			</View>
		</View>
	)
}