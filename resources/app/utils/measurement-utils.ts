import { CustomerMeasurementItemProps } from '@/domain/models'

export class MeasurementUtils {
	static initialUpperLimbsData: { [key in number]: CustomerMeasurementItemProps } = {
		0: { description: 'Contorno Acima do Peito (Frente/Costas)', measurement: 10 },
		1: { description: 'Contorno Abaixo do Peito', measurement: 10 },
		2: { description: 'Largura de Frente (Zona do Peito)', measurement: 10 },
		3: { description: 'Largura de Costas (Lateral a Lateral)', measurement: 10 },
		4: { description: 'Largura das Costas', measurement: 10 },
		5: { description: 'Contorno da Cintura', measurement: 10 },
		6: { description: 'Altura de Frente do Ombro à Cintura', measurement: 10 },
		7: { description: 'Altura das Costas', measurement: 10 },
		8: { description: 'Altura da Cava à Cintura', measurement: 10 },
		9: { description: 'Altura do Peito', measurement: 10 },
		10: { description: 'Ombro', measurement: 10 },
		11: { description: 'Distância entre Vértices', measurement: 10 },
		12: { description: 'Contorno do Pescoço', measurement: 10 },
		13: { description: 'Comprimento Total da Manga', measurement: 10 },
		14: { description: 'Comprimento Meia Manga/Cotovelo', measurement: 10 },
		15: { description: 'Contorno do Braço', measurement: 10 },
		16: { description: 'Contorno do Pulso', measurement: 10 },
		17: { description: 'Altura do Vestido', measurement: 10 },
		18: { description: 'Altura da Blusa/Casaco', measurement: 10 }
	}

	static initialLowerLimbsData: { [key in number]: CustomerMeasurementItemProps } = {
		0: { description: 'Contorno da Anca', measurement: 10 },
		1: { description: 'Altura da Anca', measurement: 10 },
		2: { description: 'Altura da Cava à Cintura', measurement: 10 },
		3: { description: 'Altura Total da Cava', measurement: 10 },
		4: { description: 'Altura da Saia até ao Joelho', measurement: 10 },
		5: { description: 'Altura do Vestido', measurement: 10 },
		6: { description: 'Altura Total da Calça até ao Chão', measurement: 10 },
		7: { description: 'Altura entre as Pernas até ao Chão', measurement: 10 },
		8: { description: 'Altura do Gancho', measurement: 10 },
		9: { description: 'Altura Total do Gancho', measurement: 10 },
		10: { description: 'Contorno da Perna em Cima', measurement: 10 },
		11: { description: 'Contorno do Joelho', measurement: 10 },
		12: { description: 'Contorno da Barriga da Perna', measurement: 10 }
	}
}
