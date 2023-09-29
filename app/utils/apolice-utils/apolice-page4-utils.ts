import { LogoBase64 } from '@/(presentation)/components'
import { ApoliceProps, ApoliceStyle, makeRectangle } from '.'
import { DateUtils } from '..'

export class ApolicePage4Utils {
	static async build({ page, pdfDoc }: Omit<ApoliceProps, 'insured'>) {
		const currentDate = new Date()
		const style = ApoliceStyle
		const padding = style.defaultPadding
		const pageHeight = 842
		const pageWidth = 595

		const imageLogo = await pdfDoc.embedPng(LogoBase64)
		page.drawImage(imageLogo, { x: padding, y: pageHeight - 80, width: 70, height: 48 })

		makeRectangle({
			page: page,
			height: 16,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 115
		})
		page.drawText('DECLARAÇÕES SOBRE A PROTEÇÃO DOS DADOS PESSOAIS', {
			font: await pdfDoc.embedFont(style.fontBold),
			x: padding + 70,
			y: pageHeight - 112,
			size: style.fontSizeTitle
		})

		makeRectangle({
			page: page,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 132
		})
		page.drawText(
			'PARA EFEITO DE CELEBRAÇÃO DO PRESENTE ACORDO DE ADESÃO A APÓLICE DE CO-SEGURO SOCIAL, DECLARO QUE:',
			{
				x: padding + 5,
				y: pageHeight - 128,
				size: style.fontSizeText
			}
		)

		// 1
		makeRectangle({
			page: page,
			width: pageWidth - 100,
			height: 32,
			x: padding,
			y: pageHeight - 164
		})
		page.drawText('1.', {
			x: padding + 5,
			y: pageHeight - 140,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			'DECLARO TER PRESTADO TODAS AS INFORMAÇÕES DE CARÁCTER OBRIGATÓRIO, BEM COMO CIÊNCIA DAS INFORMAÇÕES NECESSÁRIAS',
			{
				x: padding + 12,
				y: pageHeight - 140,
				size: style.fontSizeText
			}
		)
		page.drawText(
			'À CELEBRAÇÃO DESTE ACORDO. TENDO SIDO ENTREGUE AS CONDIÇÕES GERAIS E PRESTADO TODOS OS ESCLARECIMENTOS SOBRE AS',
			{
				x: padding + 5,
				y: pageHeight - 150,
				size: style.fontSizeText
			}
		)
		page.drawText('MESMAS CONDIÇÕES E SOBRE OS BENEFÍCIOS E SUAS COBERTURAS.', {
			x: padding + 5,
			y: pageHeight - 160,
			size: style.fontSizeText
		})

		// 2
		makeRectangle({
			page: page,
			width: pageWidth - 100,
			height: 22,
			x: padding,
			y: pageHeight - 189
		})
		page.drawText('2.', {
			x: padding + 5,
			y: pageHeight - 176,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			'AUTORIZO A CONSULTA DOS DADOS PESSOAIS DISPONIBILIZADOS, SOB REGIME DE ABSOLUTA CONFIDENCIALIDADE, ÀS EMPRESAS QUE',
			{
				x: padding + 12,
				y: pageHeight - 176,
				size: style.fontSizeText
			}
		)
		page.drawText(
			'INTEGRAM O GRUPO, DESDE QUE COMPATÍVEL COM A FINALIDADE DA RECOLHA DOS MESMOS.',
			{
				x: padding + 5,
				y: pageHeight - 186,
				size: style.fontSizeText
			}
		)

		// 3
		makeRectangle({
			page: page,
			width: pageWidth - 100,
			height: 32,
			x: padding,
			y: pageHeight - 224
		})
		page.drawText('3.', {
			x: padding + 5,
			y: pageHeight - 200,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText('AUTORIZO O', {
			x: padding + 12,
			y: pageHeight - 200,
			size: style.fontSizeText
		})
		page.drawText('CONSULTÓRIO MEDLOPES', {
			x: padding + 58,
			y: pageHeight - 200,
			font: await pdfDoc.embedFont(style.fontBold),
			size: style.fontSizeText
		})
		page.drawText(
			'EFECTUAR SE ASSIM ENTENDER O REGISTRO DAS CHAMADAS TELEFÓNICAS QUE FOREM,',
			{
				x: padding + 153,
				y: pageHeight - 200,
				size: style.fontSizeText
			}
		)
		page.drawText(
			'REALIZADAS, NO ÂMBITO DA RELAÇÃO DO ACORDO DE ADESÃO ORA PROPOSTA, E QUE DURANTE A SUA VIGÊNCIA UTILIZAR OS DADOS',
			{
				x: padding + 5,
				y: pageHeight - 210,
				size: style.fontSizeText
			}
		)
		page.drawText(
			'SOMENTE PARA FINS LÍCITOS PARA A EXECUÇÃO DOS SERVIÇOS CONTRATADOS POR MEIO DE PROVA.',
			{
				x: padding + 5,
				y: pageHeight - 220,
				size: style.fontSizeText
			}
		)

		// 3.1
		makeRectangle({
			page: page,
			width: pageWidth - 100,
			height: 32,
			x: padding,
			y: pageHeight - 259
		})
		page.drawText('3.1.', {
			x: padding + 5,
			y: pageHeight - 235,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			'OS DADOS RECOLHIDOS SÃO PROCESSADOS E ARMAZENADOS INFORMATICAMENTE E DESTINAM-SE A UTILIZAÇÃO DAS RELAÇÕES',
			{
				x: padding + 18,
				y: pageHeight - 235,
				size: style.fontSizeText
			}
		)
		page.drawText('DE PARCERIA COM O', {
			x: padding + 5,
			y: pageHeight - 245,
			size: style.fontSizeText
		})
		page.drawText('CONSULTÓRIO MEDLOPES', {
			x: padding + 81,
			y: pageHeight - 245,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			'. AS OMISSÕES, INEXACTIDÕES E FALSIDADES, NO QUE RESPEITA A DADOS DE',
			{
				x: padding + 175,
				y: pageHeight - 245,
				size: style.fontSizeText
			}
		)
		page.drawText(
			'FORNECIMENTO OBRIGATÓRIO QUER FACULTATIVO , SÃO INTEIRAMENTE DA RESPONSABILIDADE DO UTENTE.',
			{
				x: padding + 5,
				y: pageHeight - 255,
				size: style.fontSizeText
			}
		)

		// 3.2
		makeRectangle({
			page: page,
			width: pageWidth - 100,
			height: 22,
			x: padding,
			y: pageHeight - 284
		})
		page.drawText('3.2.', {
			x: padding + 5,
			y: pageHeight - 270,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText('OS DADOS AGORA RECOLHIDOS PODERÃO SER ENTREGUES A EMPRESA', {
			x: padding + 18,
			y: pageHeight - 270,
			size: style.fontSizeText
		})
		page.drawText('COBRA FÁCIL', {
			x: padding + 273,
			y: pageHeight - 270,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(', SEMPRE QUE SEM FUNDADA JUSTIFICAÇÃO OS', {
			x: padding + 322,
			y: pageHeight - 270,
			size: style.fontSizeText
		})
		page.drawText(
			'TOMADORES DO CO-SEGURO SOCIAL NÃO SATISFAZEREM AS SUAS OBRIGAÇÕES DE PAGAMENTO RELATIVAMENTE A AQUISIÇÃO DO MESMO',
			{
				x: padding + 4,
				y: pageHeight - 280,
				size: style.fontSizeText
			}
		)

		// 3.3
		makeRectangle({
			page: page,
			width: pageWidth - 100,
			height: 22,
			x: padding,
			y: pageHeight - 309
		})
		page.drawText('3.3', {
			x: padding + 5,
			y: pageHeight - 295,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			'OS INTERESSADOS PODEM TER ACESSO AS INFORMAÇÕES QUE LHES DIGA DIRECTAMENTE RESPEITO, SOLICITANDO A SUA CORREÇÃO,',
			{
				x: padding + 18,
				y: pageHeight - 295,
				size: style.fontSizeText
			}
		)
		page.drawText(
			'ADITAMENTO OU ELIMINAÇÃO MEDIANTE AO CONTACTO DIRECTO OU POR ESCRITO NAS NOSSAS INSTALAÇÕES.',
			{
				x: padding + 5,
				y: pageHeight - 305,
				size: style.fontSizeText
			}
		)

		makeRectangle({
			page: page,
			width: pageWidth - 100,
			x: padding,
			y: pageHeight - 326
		})
		page.drawText('OBS: ', {
			x: padding + 5,
			y: pageHeight - 322,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(
			'ESTA INFORMAÇÃO NÃO DISPENSA A LEITURA ATENTA DAS CONDIÇÕES GERAIS E PARTICULARES DESTE CONTRATO.',
			{
				x: padding + 25,
				y: pageHeight - 322,
				size: style.fontSizeText,
				font: await pdfDoc.embedFont(style.fontBold),
				color: style.colorRed
			}
		)

		page.drawText(
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
		page.drawText(`O MEDIADOR`, {
			x: padding + 65,
			y: pageHeight - 700,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dash, {
			x: padding,
			y: pageHeight - 720,
			size: style.fontSizeText,
			color: style.borderColor
		})

		page.drawText(`O TOMADOR DO SEGURO`, {
			x: padding + 360,
			y: pageHeight - 700,
			size: style.fontSizeText,
			font: await pdfDoc.embedFont(style.fontBold)
		})
		page.drawText(dash, {
			x: padding + 310,
			y: pageHeight - 720,
			size: style.fontSizeText,
			color: style.borderColor
		})

		page.drawText(`DATA:`, {
			x: padding,
			y: pageHeight - 740,
			size: style.fontSizeText
		})
		page.drawText(dash, {
			x: padding,
			y: pageHeight - 742,
			size: style.fontSizeText,
			color: style.borderColor
		})

		page.drawText(`DATA:`, {
			x: padding + 310,
			y: pageHeight - 740,
			size: style.fontSizeText
		})
		page.drawText(dash, {
			x: padding + 310,
			y: pageHeight - 742,
			size: style.fontSizeText,
			color: style.borderColor
		})
	}
}
