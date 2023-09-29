'use client'

import { PDFDocument } from 'pdf-lib'
import { useEffect, useState } from 'react'

import { Layout, LayoutBody, LogoBase64, SubMenu } from '@/(presentation)/components'
import {
	ApolicePage1Utils,
	ApolicePage2Utils,
	ApolicePage3Utils,
	ApoliceStyle,
	DateUtils,
	SubmenuUtils,
	makeRectangle
} from '@/utils'
import { InsuredModel } from '@/domain/models'

export default function Apolice() {
	const [pdfData, setPdfData] = useState<string | null>(null)
	const currentDate = new Date()

	const insured: Partial<InsuredModel> = {
		paymentMethod: 'TPA',
		paymentFrequency: 'Semestral'
	}

	useEffect(() => {
		generatePDF()
	}, [])

	const generatePDF = async () => {
		const pdfDoc = await PDFDocument.create()
		const pageHeight = 842
		const pageWidth = 595
		const pageSize = [pageWidth, pageHeight] as any

		/* // PAGE 1
		const page = pdfDoc.addPage(pageSize)
		await ApolicePage1Utils.build({ page, pdfDoc })

		// PAGE 2
		const page2 = pdfDoc.addPage(pageSize)
		await ApolicePage2Utils.build({ page: page2, pdfDoc })
 */
		/* PAGE 3 */
		const page3 = pdfDoc.addPage(pageSize)
		// await ApolicePage3Utils.build({ page: page33, pdfDoc })
		const style = ApoliceStyle
		const padding = style.defaultPadding

		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		/* HEADER */
		page3.drawImage(imageLogo, { x: padding, y: pageHeight - 80, width: 70, height: 48 })

		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 115
		})
		page3.drawText(`OBRIGAÇÕES E CONDIÇÕES GERAIS`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 125,
			y: pageHeight - 112,
			size: style.fontSizeTitle
		})

		page3.drawText(`NOTA:`, {
			font: await pdfDoc.embedFont(style.fontBoldItalic),
			x: padding,
			y: pageHeight - 128,
			size: style.fontSizeText
		})
		page3.drawText(
			`Todos os dados estão sujeitos a alteração com 15 (quinze) dias de antecedência.`,
			{
				font: await pdfDoc.embedFont(style.fontBoldItalic),
				x: padding + 25,
				y: pageHeight - 128,
				size: style.fontSizeText,
				color: style.colorRed
			}
		)

		makeRectangle({
			page: page3,
			width: 125,
			x: padding,
			y: pageHeight - 148
		})
		page3.drawText(`TAXA DE CADASTRO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 144,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 370,
			x: padding + 125,
			y: pageHeight - 148
		})
		page3.drawText(`3 500,00 POR CONTRATO`, {
			x: padding + 129,
			y: pageHeight - 144,
			size: style.fontSizeText
		})

		makeRectangle({
			page: page3,
			width: 125,
			x: padding,
			y: pageHeight - 162
		})
		page3.drawText(`ESPECIALIDADES`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 158,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 370,
			x: padding + 125,
			y: pageHeight - 162
		})
		// page3.drawText(`3 500,00 POR CONTRATO`, {
		// 	x: padding + 129,
		// 	y: pageHeight - 162,
		// 	size: style.fontSizeText
		// })

		makeRectangle({
			page: page3,
			width: 125,
			x: padding,
			y: pageHeight - 176
		})
		page3.drawText(`HORÁRIO DE ATENDIMENTO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 172,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 370,
			x: padding + 125,
			y: pageHeight - 176
		})
		page3.drawText(`ATENDIMENTO DAS 07:30 ÀS 20:00, DE SEGUNDA-FEIRA À SÁBADO`, {
			x: padding + 129,
			y: pageHeight - 172,
			size: style.fontSizeText
		})

		// DOCUMENTAÇÃO NECESSÁRIA
		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 205
		})
		page3.drawText(`DOCUMENTAÇÃO NECESSÁRIA`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 135,
			y: pageHeight - 202,
			size: style.fontSizeTitle
		})

		// PLANO INDIVIDUAL OU FAMILIAR
		makeRectangle({
			page: page3,
			height: 50,
			width: 125,
			x: padding,
			y: pageHeight - 255
		})
		page3.drawText(`PLANO INDIVIDUAL OU FAMILIAR`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 232,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			height: 50,
			width: 370,
			x: padding + 125,
			y: pageHeight - 255
		})
		page3.drawText(
			`DOCUMENTAÇÃO OBRIGATÓRIA PARA OS UTENTES: SEJAM ESTES MAIORES DE IDADE, BILHETE DE`,
			{
				x: padding + 129,
				y: pageHeight - 215,
				size: style.fontSizeText
			}
		)
		page3.drawText(
			`IDENTIDADE, CÓPIA DO CARTÃO DE CONTRIBUINTE, 1 (UMA) FOTO TIPO PASSE, CONTACTO TELEFÓNICO.`,
			{
				x: padding + 129,
				y: pageHeight - 225,
				size: style.fontSizeText
			}
		)
		makeRectangle({
			page: page3,
			height: 25,
			width: 370,
			x: padding + 125,
			y: pageHeight - 255
		})
		page3.drawText(`NOTA:`, {
			x: padding + 129,
			y: pageHeight - 240,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page3.drawText(
			`PARA OS MENORES DE IDADE CÉDULA DE NASCIMENTO OU BILHETE DE IDENTIDADE E 1 (UMA)`,
			{
				x: padding + 155,
				y: pageHeight - 240,
				size: style.fontSizeText
			}
		)
		page3.drawText(`FOTO TIPO PASSE.`, {
			x: padding + 129,
			y: pageHeight - 250,
			size: style.fontSizeText
		})

		// PLANO EMPRESARIAL
		makeRectangle({
			page: page3,
			height: 58,
			width: 125,
			x: padding,
			y: pageHeight - 313
		})
		page3.drawText(`PLANO EMPRESARIAL`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 286,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			height: 33,
			width: 370,
			x: padding + 125,
			y: pageHeight - 288
		})
		page3.drawText(
			`DOCUMENTAÇÃO OBRIGATÓRIA: ALVARÁ , CERTIDÃO COMERCIAL, NIF, REQUERIMENTO DO`,
			{
				x: padding + 129,
				y: pageHeight - 265,
				size: style.fontSizeText
			}
		)
		page3.drawText(
			`ADMINISTRADOR DA EMPRESA AUTENTICADO, CÓPIA DO BILHETE DE IDENTIDADE E DO CARTÃO DE`,
			{
				x: padding + 129,
				y: pageHeight - 275,
				size: style.fontSizeText
			}
		)
		page3.drawText(`CONTRIBUINTE DO MESMO.`, {
			x: padding + 129,
			y: pageHeight - 285,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			height: 25,
			width: 370,
			x: padding + 125,
			y: pageHeight - 313
		})
		page3.drawText(`NOTA:`, {
			x: padding + 129,
			y: pageHeight - 298,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page3.drawText(
			`ANEXAR A CÓPIA DO BILHETE DE IDENTIDADE E 1 (UMA) FOTO TIPO PASSE DE CADA`,
			{
				x: padding + 155,
				y: pageHeight - 298,
				size: style.fontSizeText
			}
		)
		page3.drawText(
			`COLABORADOR, CONTACTO TELEFÓNICO, BEM COMO A FUNÇÃO OU ÁREA DE ACTIVIDADE.`,
			{
				x: padding + 129,
				y: pageHeight - 308,
				size: style.fontSizeText
			}
		)

		// COMPOSIÇÃO
		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 345
		})
		page3.drawText(`COMPOSIÇÃO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 195,
			y: pageHeight - 342,
			size: style.fontSizeTitle
		})
		makeRectangle({
			page: page3,
			width: 125,
			x: padding,
			y: pageHeight - 359
		})
		page3.drawText(`TITULARES:`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 355,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 370,
			x: padding + 125,
			y: pageHeight - 359
		})
		page3.drawText(`TODO UTENTE COM VÍNCULO LABORAL;`, {
			x: padding + 129,
			y: pageHeight - 355,
			size: style.fontSizeText
		})

		makeRectangle({
			page: page3,
			width: 125,
			x: padding,
			y: pageHeight - 372
		})
		page3.drawText(`DEPENDENTES:`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 368,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 370,
			x: padding + 125,
			y: pageHeight - 372
		})
		page3.drawText(`TODOS SEM EXCEÇÃO;`, {
			x: padding + 129,
			y: pageHeight - 368,
			size: style.fontSizeText
		})

		makeRectangle({
			page: page3,
			width: 125,
			x: padding,
			y: pageHeight - 386
		})
		page3.drawText(`ENTIDADES:`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 382,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			width: 370,
			x: padding + 125,
			y: pageHeight - 386
		})
		page3.drawText(`ACEITAÇÃO SOMENTE AS INSTITUIÇÕES COM 5 OU MAIS COLABORADORES;`, {
			x: padding + 129,
			y: pageHeight - 382,
			size: style.fontSizeText
		})

		makeRectangle({
			page: page3,
			height: 25,
			width: 125,
			x: padding,
			y: pageHeight - 411
		})
		page3.drawText(`PRESTADORES DE SERVIÇOS:`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 5,
			y: pageHeight - 402,
			size: style.fontSizeText
		})
		makeRectangle({
			page: page3,
			height: 25,
			width: 370,
			x: padding + 125,
			y: pageHeight - 411
		})
		page3.drawText(
			`ACEITAMOS SOMENTE COM DECLARAÇÃO DE FONTE DE RENDA, ACOMPANHADA DOS 3 ÚLTIMOS `,
			{
				x: padding + 129,
				y: pageHeight - 396,
				size: style.fontSizeText
			}
		)
		page3.drawText(`RECIBOS DE PAGAMENTO OU ADIANTAMENTO DE 3 MESES COMO GARANTIA.`, {
			x: padding + 129,
			y: pageHeight - 406,
			size: style.fontSizeText
		})

		// TIPO DE CONTRATAÇÃO
		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 439
		})
		page3.drawText(`TIPO DE CONTRATAÇÃO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 175,
			y: pageHeight - 436,
			size: style.fontSizeTitle
		})

		const typeOfContracts = [
			'A CONTRATAÇÃO PODERÁ SER TOTAL OU PARCIAL;',
			'A OPÇÃO DO PLANO É LIVRE. PORÉM OS DEPENDENTES NÃO PODEM OPTAR POR PLANOS DIFERENTE AO DO TITULAR;',
			[
				'OBS:',
				'CASO HAJA INTERESSE, A COMERCIALIZAÇÃO DO CO-SEGURO SOCIAL É FEITA SOMENTE NO CONSULTÓRIO MEDLOPES.'
			]
		]
		for (let i = 0; i < typeOfContracts.length; i++) {
			const item = typeOfContracts[i]
			const y = pageHeight - (i + 24) * style.cellHeight - 117
			makeRectangle({
				page: page3,
				width: pageWidth - 100,
				x: padding,
				y
			})
			if (typeof item == 'string') {
				page3.drawText(item, {
					x: padding + 5,
					y: y + 3,
					size: style.fontSizeText
				})
			} else if (Array.isArray(item)) {
				const [obs, text] = item
				page3.drawText(obs, {
					font: await pdfDoc.embedFont(style.fontBoldItalic),
					x: padding + 5,
					y: y + 3,
					size: style.fontSizeText
				})
				page3.drawText(text, {
					font: await pdfDoc.embedFont(style.fontBoldItalic),
					x: padding + 25,
					y: y + 3,
					size: style.fontSizeText,
					color: style.colorRed
				})
			}
		}

		// FORMA DE PAGAMENTO
		makeRectangle({
			page: page3,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 509
		})
		page3.drawText(`FORMA DE PAGAMENTO`, {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 175,
			y: pageHeight - 506,
			size: style.fontSizeTitle
		})

		const paymentMethods = [
			['PAGAMENTO', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL'],
			['DINHEIRO', '', '', ''],
			['MULTICAIXA', '', '', ''],
			['TPA', '', '', ''],
			['TRANSFERÊNCIA EXPRESS', '', '', '']
		]

		for (let row = 0; row < paymentMethods.length; row++) {
			const rowElement = paymentMethods[row]
			for (let col = 0; col < rowElement.length; col++) {
				const colElement = rowElement[col]
				const isHeader = row == 0
				const width = (pageWidth - 100) / 4
				const x = padding + col * width
				const y = pageHeight - (row + 29) * style.cellHeight - 117
				makeRectangle({
					page: page3,
					width,
					x,
					y
				})
				page3.drawText(colElement, {
					font: isHeader ? await pdfDoc.embedFont(style.fontBold) : undefined,
					x: x + 5,
					y: y + 4,
					size: style.fontSizeText
				})
				if (colElement == '') {
					page3.drawCircle({
						x: x + 10,
						y: y + 7,
						size: 4,
						borderWidth: style.borderWidth,
						borderColor: style.borderColorBlack,
						color: style.colorRectangle,
						opacity: 0.5,
						borderOpacity: 0.75
					})
					if (
						insured.paymentMethod?.toLocaleUpperCase() == rowElement[0] &&
						insured.paymentFrequency?.toLocaleUpperCase() == paymentMethods[0][col]
					)
						page3.drawCircle({
							x: x + 10,
							y: y + 7,
							size: 2,
							borderWidth: style.borderWidth,
							borderColor: style.borderColorBlack,
							color: style.borderColorBlack,
							opacity: 0.5,
							borderOpacity: 0.75
						})
				}
			}
		}

		const plans = [
			[
				'PLANO INDIVIDUA OU FAMILIAR',
				['NOTA:', 'O PAGAMENTO PODE SER TRIMESTRAL, SEMESTRAL E ANUAL']
			],
			['PLANO EMPRESARIAL', ['NOTA:', 'O PAGAMENTO PODE SER SOMENTE SEMESTRAL E ANUAL.']]
		]

		for (let i = 0; i < plans.length; i++) {
			const [title, [note, text]] = plans[i] as any
			const y = pageHeight - (i + 34.8) * style.cellHeight - 108

			makeRectangle({
				page: page3,
				width: 125,
				x: padding,
				y
			})
			page3.drawText(title, {
				font: await pdfDoc.embedFont(style.fontBold),
				x: padding + 5,
				y: y + 4,
				size: style.fontSizeText
			})

			makeRectangle({
				page: page3,
				width: 370,
				x: padding + 125,
				y
			})
			page3.drawText(note, {
				font: await pdfDoc.embedFont(style.fontBold),
				x: padding + 130,
				y: y + 4,
				size: style.fontSizeText
			})
			page3.drawText(text, {
				x: padding + 155,
				y: y + 4,
				size: style.fontSizeText
			})
		}
		page3.drawText(
			`LUANDA, ${currentDate.getDate()} DE ${DateUtils.getMonthExt(
				currentDate
			).toLocaleUpperCase()} DE ${currentDate.getUTCFullYear()}`,
			{
				x: padding,
				y: pageHeight - 650,
				size: style.fontSizeText
			}
		)

		const dash = '_______________________________________________'
		page3.drawText(`O MEDIADOR`, {
			x: padding + 65,
			y: pageHeight - 700,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page3.drawText(dash, {
			x: padding,
			y: pageHeight - 720,
			size: style.fontSizeText
		})

		page3.drawText(`O TOMADOR DO SEGURO`, {
			x: padding + 360,
			y: pageHeight - 700,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page3.drawText(dash, {
			x: padding + 310,
			y: pageHeight - 720,
			size: style.fontSizeText
		})

		page3.drawText(`DATA:`, {
			x: padding,
			y: pageHeight - 740,
			size: style.fontSizeText
		})
		page3.drawText(dash, {
			x: padding,
			y: pageHeight - 742,
			size: style.fontSizeText
		})

		page3.drawText(`DATA:`, {
			x: padding + 310,
			y: pageHeight - 740,
			size: style.fontSizeText
		})
		page3.drawText(dash, {
			x: padding + 310,
			y: pageHeight - 742,
			size: style.fontSizeText
		})

		const pdfBytes = await pdfDoc.save()
		const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
		const pdfUrl = URL.createObjectURL(pdfBlob)

		setPdfData(pdfUrl)
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />
				<div className="mt-2">
					<button className="btn-primary inline-flex" onClick={generatePDF}>
						Actualizar
					</button>
				</div>
				{pdfData && (
					<>
						<iframe
							title="PDF Preview"
							width="100%"
							height="700px"
							src={`${pdfData}`}
							className="mt-4"
						/>
					</>
				)}
			</LayoutBody>
		</Layout>
	)
}
