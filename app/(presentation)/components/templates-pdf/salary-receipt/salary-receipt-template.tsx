'use client'
import { Document, Page, View, Text, PDFViewer } from '@react-pdf/renderer'

type SalaryReceiptProps = {}

export function SalaryReceiptTemplate(props: SalaryReceiptProps) {
	return (
		<PDFViewer width={'100%'} style={{ height: 'calc(100vh - 30px)' }}>
			<Document>
				<Page
					size={'A4'}
					style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					orientation="landscape"
				>
					<Container title="Original" />
					<View style={{ border: 1 }}></View>
					<Container title="Cópia" />
				</Page>
			</Document>
		</PDFViewer>
	)
}

type Props = { title: string }

function Container({ title }: Props) {
	return (
		<View style={{ flexDirection: 'column', width: '100%' }}>
			<Header title={title} />
			<Body />
		</View>
	)
}

function Header({ title }: Props) {
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
					border: 1,
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
					border: 1,
					padding: 9,
					fontSize: 9
				}}
			>
				<View>
					<Text>ID</Text>
					<Text>001</Text>
				</View>
				<View>
					<Text>FUNCIONÁRIO</Text>
					<Text>Samuel Freitas</Text>
				</View>
				<View>
					<Text>FUNÇÃO</Text>
					<Text>Programador mobile</Text>
				</View>
				<View>
					<Text>Nº CONTRIB.</Text>
					<Text>001355049LA037</Text>
				</View>
				<View>
					<Text>SEG. SOCIAL</Text>
					<Text>00135504</Text>
				</View>
			</View>
		</View>
	)
}

function Body() {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				padding: 8,
				margin: 8,
				marginHorizontal: 'auto',
				fontSize: 8,
				width: '100%'
			}}
		>
			<View style={{ flex: 1, gap: 8 }}>
				<Text
					style={{
						border: 1,
						paddingHorizontal: 8,
						width: '100%',
						textAlign: 'center',
						paddingTop: 2
					}}
				>
					CÓDIGO
				</Text>
				<View style={{ border: 1, paddingHorizontal: 4 }}>
					<Text>10</Text>
					<Text>40</Text>
				</View>
			</View>
			<View style={{ flex: 1, gap: 8 }}>
				<Text
					style={{
						border: 1,
						paddingHorizontal: 8,
						width: '100%',
						textAlign: 'center',
						paddingTop: 2
					}}
				>
					DESCRIÇÃO
				</Text>
				<View style={{ border: 1, paddingHorizontal: 4 }}>
					<Text>10</Text>
					<Text>20</Text>
				</View>
			</View>
			<View style={{ flex: 1, gap: 8 }}>
				<Text
					style={{
						border: 1,
						paddingHorizontal: 8,
						width: '100%',
						textAlign: 'center',
						paddingTop: 2
					}}
				>
					REFERÊNCIA
				</Text>
				<View style={{ border: 1, paddingHorizontal: 4 }}>
					<Text>10</Text>
					<Text>20</Text>
				</View>
			</View>
			<View style={{ flex: 1, gap: 8 }}>
				<Text
					style={{
						border: 1,
						paddingHorizontal: 8,
						width: '100%',
						textAlign: 'center',
						paddingTop: 2
					}}
				>
					VENCIMENTOS
				</Text>
				<View style={{ border: 1, paddingHorizontal: 4 }}>
					<Text>10</Text>
					<Text>20</Text>
				</View>
			</View>
			<View style={{ flex: 1, gap: 8 }}>
				<Text
					style={{
						border: 1,
						paddingHorizontal: 8,
						width: '100%',
						textAlign: 'center',
						paddingTop: 2
					}}
				>
					DESCONTOS
				</Text>
				<View style={{ border: 1, paddingHorizontal: 4 }}>
					<Text>10</Text>
					<Text>20</Text>
				</View>
			</View>
		</View>
	)
}
