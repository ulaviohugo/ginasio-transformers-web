'use client'
import { Employee } from '@/app/domain/models'
import { NumberUtils, SalaryUtils } from '@/app/utils'
import { Document, Page, View, Text, PDFViewer } from '@react-pdf/renderer'

type SalaryReceiptProps = { employee: Employee }

type CardProps = { title: string; employee: Employee }

type ItemProps = {
	title: string
	contents: string[] | number[]
}

const border = 0.5

const getSalaryItems = (employee: Employee): ItemProps[] => {
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
				'22 Dias',
				'22 Dias',
				'22 Dias',
				'22 Dias',
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

export function SalaryReceiptTemplate({ employee }: SalaryReceiptProps) {
	return (
		<PDFViewer width={'100%'} style={{ height: 'calc(100vh - 30px)' }}>
			<Document title={employee.name}>
				<Page
					size={'A4'}
					style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					orientation="landscape"
				>
					<Container title="Original" employee={employee} />
					<View style={{ border: border }}></View>
					<Container title="Cópia" employee={employee} />
				</Page>
			</Document>
		</PDFViewer>
	)
}

function Container({ title, employee }: CardProps) {
	const items = getSalaryItems(employee)
	return (
		<View style={{ flexDirection: 'column', width: '100%' }}>
			<Header title={title} employee={employee} />
			<Body items={items} />
		</View>
	)
}

function Header({ title, employee }: CardProps) {
	return (
		<View
			style={{
				// flex: 1,
				flexDirection: 'column',
				padding: 8,
				gap: 8
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					border: border,
					padding: 8,
					fontSize: 12
				}}
			>
				<Text>Recibo de pagamento de salário</Text>
				<Text style={{ fontSize: 9 }}>{title}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: 8,
					border: border,
					padding: 9,
					fontSize: 9
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
				padding: 8,
				margin: 8,
				marginHorizontal: 'auto',
				fontSize: 8,
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

function ResumeContent({ employee }: { employee: Employee }) {
	return <View></View>
}
