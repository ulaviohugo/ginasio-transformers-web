export type CountryProps = {
	id: number
	name: string
	provinces?: ProvinceProps[]
}

export type ProvinceProps = {
	id: number
	name: string
	countryId: number
	municipalities?: MunicipalityProps[]
}

export type MunicipalityProps = {
	id: number
	name: string
	provinceId: number
}

export class LocationUtils {
	static countries(): CountryProps[] {
		return [
			{ id: 1, name: 'Angola', provinces: this.provinces(1) },
			{ id: 2, name: 'Brasil', provinces: this.provinces(2) },
			{ id: 3, name: 'China' },
			{ id: 4, name: 'Turquia' }
		]
	}

	static provinces(countryId?: number): ProvinceProps[] {
		const states = [
			//Angola
			{ id: 1, name: 'Bengo', countryId: 1, municipalities: this.municipalities(1) },
			{ id: 2, name: 'Benguela', countryId: 1, municipalities: this.municipalities(2) },
			{ id: 3, name: 'Bié', countryId: 1, municipalities: this.municipalities(3) },
			{ id: 4, name: 'Cabinda', countryId: 1, municipalities: this.municipalities(4) },
			{
				id: 5,
				name: 'Cuando-Cubango',
				countryId: 1,
				municipalities: this.municipalities(5)
			},
			{
				id: 6,
				name: 'Cuanza Norte',
				countryId: 1,
				municipalities: this.municipalities(6)
			},
			{ id: 7, name: 'Cuanza Sul', countryId: 1, municipalities: this.municipalities(7) },
			{ id: 8, name: 'Cunene', countryId: 1, municipalities: this.municipalities(8) },
			{ id: 9, name: 'Huambo', countryId: 1, municipalities: this.municipalities(9) },
			{ id: 10, name: 'Huíla', countryId: 1, municipalities: this.municipalities(10) },
			{ id: 11, name: 'Luanda', countryId: 1, municipalities: this.municipalities(11) },
			{
				id: 12,
				name: 'Lunda Norte',
				countryId: 1,
				municipalities: this.municipalities(12)
			},
			{
				id: 13,
				name: 'Lunda Sul',
				countryId: 1,
				municipalities: this.municipalities(13)
			},
			{ id: 14, name: 'Malanje', countryId: 1, municipalities: this.municipalities(14) },
			{ id: 15, name: 'Moxico', countryId: 1, municipalities: this.municipalities(15) },
			{ id: 16, name: 'Namibe', countryId: 1, municipalities: this.municipalities(16) },
			{ id: 17, name: 'Uíge', countryId: 1, municipalities: this.municipalities(17) },
			{ id: 18, name: 'Zaire', countryId: 1, municipalities: this.municipalities(18) },
			//Brasil
			{ id: 19, name: 'Acre', countryId: 2, municipalities: this.municipalities(19) },
			{ id: 20, name: 'Alagoas', countryId: 2, municipalities: this.municipalities(20) },
			{ id: 21, name: 'Amapá', countryId: 2, municipalities: this.municipalities(21) },
			{ id: 22, name: 'Amazonas', countryId: 2, municipalities: this.municipalities(22) },
			{ id: 23, name: 'Bahia', countryId: 2, municipalities: this.municipalities(23) },
			{ id: 24, name: 'Ceará', countryId: 2, municipalities: this.municipalities(24) },
			{
				id: 25,
				name: 'Distrito Federal',
				countryId: 2,
				municipalities: this.municipalities(25)
			},
			{
				id: 26,
				name: 'Espírito Santo',
				countryId: 2,
				municipalities: this.municipalities(26)
			},
			{ id: 27, name: 'Goiás', countryId: 2, municipalities: this.municipalities(27) },
			{ id: 28, name: 'Maranhão', countryId: 2, municipalities: this.municipalities(28) },
			{
				id: 29,
				name: 'Mato Grosso',
				countryId: 2,
				municipalities: this.municipalities(29)
			},
			{
				id: 30,
				name: 'Mato Grosso do Sul',
				countryId: 2,
				municipalities: this.municipalities(30)
			},
			{
				id: 31,
				name: 'Minas Gerais',
				countryId: 2,
				municipalities: this.municipalities(31)
			},
			{ id: 32, name: 'Pará', countryId: 2, municipalities: this.municipalities(32) },
			{ id: 33, name: 'Paraíba', countryId: 2, municipalities: this.municipalities(33) },
			{ id: 34, name: 'Paraná', countryId: 2, municipalities: this.municipalities(34) },
			{
				id: 35,
				name: 'Pernambuco',
				countryId: 2,
				municipalities: this.municipalities(35)
			},
			{ id: 36, name: 'Piauí', countryId: 2, municipalities: this.municipalities(36) },
			{
				id: 37,
				name: 'Rio de Janeiro',
				countryId: 2,
				municipalities: this.municipalities(37)
			},
			{
				id: 38,
				name: 'Rio Grande do Norte',
				countryId: 2,
				municipalities: this.municipalities(38)
			},
			{
				id: 39,
				name: 'Rio Grande do Sul',
				countryId: 2,
				municipalities: this.municipalities(39)
			},
			{ id: 40, name: 'Rondônia', countryId: 2, municipalities: this.municipalities(40) },
			{ id: 41, name: 'Roraima', countryId: 2, municipalities: this.municipalities(41) },
			{
				id: 42,
				name: 'Santa Catarina',
				countryId: 2,
				municipalities: this.municipalities(42)
			},
			{
				id: 43,
				name: 'São Paulo',
				countryId: 2,
				municipalities: this.municipalities(43)
			},
			{ id: 44, name: 'Sergipe', countryId: 2, municipalities: this.municipalities(44) },
			{ id: 45, name: 'Tocantins', countryId: 2, municipalities: this.municipalities(45) }
		] as ProvinceProps[]

		return countryId
			? states.filter((province) => province.countryId == countryId)
			: states
	}

	static municipalities(provinceId?: number): MunicipalityProps[] {
		const municipalities = [
			//Província do Bengo
			{ id: 1, name: 'Ambriz', provinceId: 1 },
			{ id: 2, name: 'Dande', provinceId: 1 },
			{ id: 3, name: 'Icolo e Bengo', provinceId: 1 },
			{ id: 4, name: 'Muxima', provinceId: 1 },
			{ id: 5, name: 'Nambuangongo', provinceId: 1 },
			//Provincia de Benguela
			{ id: 6, name: 'Bocoio', provinceId: 2 },
			{ id: 7, name: 'Lobito', provinceId: 2 },
			{ id: 8, name: 'Bolongo', provinceId: 2 },
			{ id: 9, name: 'Ganda', provinceId: 2 },
			{ id: 10, name: 'Cubal', provinceId: 2 },
			{ id: 11, name: 'Caiambambo', provinceId: 2 },
			{ id: 12, name: 'Benguela', provinceId: 2 },
			{ id: 13, name: 'Baía farta', provinceId: 2 },
			{ id: 14, name: 'Chongoroi', provinceId: 2 },
			{ id: 15, name: 'Porto de Benguela', provinceId: 2 },
			//Provincia do Bié
			{ id: 16, name: 'Kuito', provinceId: 3 },
			{ id: 17, name: 'Andulo', provinceId: 3 },
			{ id: 18, name: 'Nharea', provinceId: 3 },
			{ id: 19, name: 'Cuemba', provinceId: 3 },
			{ id: 20, name: 'Cunhinga', provinceId: 3 },
			{ id: 21, name: 'Catabola', provinceId: 3 },
			{ id: 22, name: 'Camacupa', provinceId: 3 },
			{ id: 23, name: 'Chinguar', provinceId: 3 },
			{ id: 24, name: 'Chitembo', provinceId: 3 },
			//Provincia de Cabinda
			{ id: 25, name: 'Cabinda', provinceId: 4 },
			{ id: 26, name: 'Cacongo', provinceId: 4 },
			{ id: 27, name: 'Buco-zau', provinceId: 4 },
			{ id: 28, name: 'Belize', provinceId: 4 },
			{ id: 29, name: '4 de Fevereiro', provinceId: 4 },
			{ id: 30, name: 'Porto de Cabinda', provinceId: 4 },
			{ id: 31, name: 'Fútila', provinceId: 4 },
			{ id: 32, name: 'Deolinda Rodrigues', provinceId: 4 },
			{ id: 33, name: 'Simulambuco', provinceId: 4 },
			//Provincia do Cunene
			{ id: 34, name: 'Ondjiva', provinceId: 5 },
			{ id: 35, name: 'Cuanhama', provinceId: 5 },
			{ id: 36, name: 'Ombanja', provinceId: 5 },
			{ id: 37, name: 'Cuvelai', provinceId: 5 },
			{ id: 38, name: 'Curoca', provinceId: 5 },
			{ id: 39, name: 'Cahama', provinceId: 5 },
			{ id: 40, name: 'Namacunde', provinceId: 5 },
			{ id: 41, name: 'Santa Clara', provinceId: 5 },
			//Provincia da Huambo
			{ id: 42, name: 'Huambo', provinceId: 6 },
			{ id: 43, name: 'Londuimbale', provinceId: 6 },
			{ id: 44, name: 'Bailundo', provinceId: 6 },
			{ id: 45, name: 'Mungo', provinceId: 6 },
			{ id: 46, name: 'Tchindjenje', provinceId: 6 },
			{ id: 47, name: 'Ucuma', provinceId: 6 },
			{ id: 48, name: 'Ekuma', provinceId: 6 },
			{ id: 49, name: 'Tichicala-Tcholoanga', provinceId: 6 },
			{ id: 50, name: 'Catchiungo', provinceId: 6 },
			{ id: 51, name: 'Longongo', provinceId: 6 },
			{ id: 52, name: 'Caála', provinceId: 6 },
			{ id: 53, name: 'Av. da República', provinceId: 6 },
			//Provincia da Huambo
			{ id: 54, name: 'Quilengues', provinceId: 7 },
			{ id: 55, name: 'Lubango', provinceId: 7 },
			{ id: 56, name: 'Humpata', provinceId: 7 },
			{ id: 57, name: 'Chibia', provinceId: 7 },
			{ id: 58, name: 'Chiange', provinceId: 7 },
			{ id: 59, name: 'Quipungo', provinceId: 7 },
			{ id: 60, name: 'Caluquembe', provinceId: 7 },
			{ id: 61, name: 'Cacomba', provinceId: 7 },
			{ id: 62, name: 'Chicomba', provinceId: 7 },
			{ id: 63, name: 'Matala', provinceId: 7 },
			{ id: 64, name: 'Jamba Mineira', provinceId: 7 },
			{ id: 65, name: 'Chipindo', provinceId: 7 },
			{ id: 66, name: 'Kuvango', provinceId: 7 },
			//Provincia do Cuando-Cubango
			{ id: 67, name: 'Menongue', provinceId: 8 },
			{ id: 68, name: 'Chuito Cuanavale', provinceId: 8 },
			{ id: 69, name: 'Cuchi', provinceId: 8 },
			{ id: 70, name: 'Cuangar', provinceId: 8 },
			{ id: 71, name: 'Longa', provinceId: 8 },
			{ id: 72, name: 'Mavinga', provinceId: 8 },
			{ id: 73, name: 'Calai', provinceId: 8 },
			{ id: 74, name: 'Dirico', provinceId: 8 },
			{ id: 75, name: 'Rivungo', provinceId: 8 },
			//Provincia do Cuando-Cubango
			{ id: 76, name: 'Cazengo', provinceId: 9 },
			{ id: 77, name: 'Lucala', provinceId: 9 },
			{ id: 78, name: 'Ambaca', provinceId: 9 },
			{ id: 79, name: 'Golungo Alto', provinceId: 9 },
			{ id: 80, name: 'Dembos', provinceId: 9 },
			{ id: 81, name: 'Bula Atumba', provinceId: 9 },
			{ id: 82, name: 'Cambambe', provinceId: 9 },
			{ id: 83, name: 'Quiculungo', provinceId: 9 },
			{ id: 84, name: 'Bolongongo', provinceId: 9 },
			{ id: 85, name: 'Banga', provinceId: 9 },
			{ id: 86, name: 'Samba Cajú', provinceId: 9 },
			{ id: 87, name: 'Gonguembo', provinceId: 9 },
			{ id: 88, name: 'Pango Alúque', provinceId: 9 },
			{ id: 89, name: "N'Dalatando", provinceId: 9 },
			//Provincia do Cuando-Sul
			{ id: 90, name: 'Sumbe', provinceId: 10 },
			{ id: 91, name: 'Porto Amboim', provinceId: 10 },
			{ id: 92, name: 'Quibala', provinceId: 10 },
			{ id: 93, name: 'Libolo', provinceId: 10 },
			{ id: 94, name: 'Mussende', provinceId: 10 },
			{ id: 95, name: 'Amboim', provinceId: 10 },
			{ id: 96, name: 'Conda', provinceId: 10 },
			{ id: 97, name: 'Ebo', provinceId: 10 },
			{ id: 98, name: 'Quilenda', provinceId: 10 },
			{ id: 99, name: 'Waku Kungo', provinceId: 10 },
			{ id: 100, name: 'Seles', provinceId: 10 },
			{ id: 101, name: 'Cassongue', provinceId: 10 },
			//Provincia de Luanda
			{ id: 102, name: 'Sambinzanga', provinceId: 11 },
			{ id: 103, name: 'São Paulo', provinceId: 11 },
			{ id: 104, name: 'Comandante Valódia', provinceId: 11 },
			{ id: 105, name: 'Combatentes', provinceId: 11 },
			{ id: 106, name: 'São Pedro da Barra', provinceId: 11 },
			{ id: 107, name: 'Porto Pesqueiro', provinceId: 11 },
			{ id: 108, name: 'Boa Vista', provinceId: 11 },
			{ id: 109, name: 'Petrangol', provinceId: 11 },
			{ id: 110, name: 'Uíge', provinceId: 11 },
			{ id: 111, name: 'Kwanzas', provinceId: 11 },
			{ id: 112, name: 'Ngola Kiluange', provinceId: 11 },
			{ id: 113, name: 'Miramar', provinceId: 11 },
			{ id: 114, name: 'Marçal', provinceId: 11 },
			{ id: 115, name: 'Bairro dos Ossos', provinceId: 11 },
			{ id: 116, name: 'Bairro Operário', provinceId: 11 },
			{ id: 117, name: 'Rangel', provinceId: 11 },
			{ id: 118, name: 'Nelito Soares', provinceId: 11 },
			{ id: 119, name: 'Vila Alice', provinceId: 11 },
			{ id: 120, name: 'Maculusso', provinceId: 11 },
			{ id: 121, name: 'Precol', provinceId: 11 },
			{ id: 122, name: 'Tunga Ngó', provinceId: 11 },
			{ id: 123, name: 'Bairro Popular', provinceId: 11 },
			{ id: 124, name: 'Cidadela', provinceId: 11 },
			{ id: 125, name: 'BS', provinceId: 11 },
			{ id: 126, name: 'CS', provinceId: 11 },
			{ id: 127, name: 'Cruzeiro', provinceId: 11 },
			{ id: 128, name: 'Kinaxixi', provinceId: 11 },
			{ id: 129, name: 'Chicala I', provinceId: 11 },
			{ id: 130, name: 'Chicala II', provinceId: 11 },
			{ id: 131, name: 'Mutamba', provinceId: 11 },
			{ id: 132, name: 'Balizão', provinceId: 11 },
			{ id: 133, name: 'Margial', provinceId: 11 },
			{ id: 134, name: 'Coqueiros', provinceId: 11 },
			{ id: 135, name: 'Ilha de Luanda', provinceId: 11 },
			{ id: 136, name: 'Baía de Luanda', provinceId: 11 },
			{ id: 137, name: 'Mussulo', provinceId: 11 },
			{ id: 138, name: 'Benfica', provinceId: 11 },
			{ id: 139, name: 'Cacuaco', provinceId: 11 },
			{ id: 140, name: 'Cimangola', provinceId: 11 },
			{ id: 141, name: 'Kikolo', provinceId: 11 },
			{ id: 142, name: 'Kifangondo', provinceId: 11 },
			{ id: 143, name: 'Panguila', provinceId: 11 },
			{ id: 144, name: 'Maluéka', provinceId: 11 },
			{ id: 145, name: 'Mulenvos', provinceId: 11 },
			{ id: 146, name: 'Sequele', provinceId: 11 },
			{ id: 147, name: 'Vidrul', provinceId: 11 },
			{ id: 148, name: 'Bairro da Funda', provinceId: 11 },
			{ id: 149, name: 'Viana', provinceId: 11 },
			{ id: 150, name: 'Vila de Viana', provinceId: 11 },
			{ id: 151, name: 'BCA', provinceId: 11 },
			{ id: 152, name: 'Robaldina', provinceId: 11 },
			{ id: 153, name: 'Km 30', provinceId: 11 },
			{ id: 154, name: 'Luanda Sul', provinceId: 11 },
			{ id: 155, name: 'Estalagem', provinceId: 11 },
			{ id: 156, name: 'Bairro Huambo', provinceId: 11 },
			{ id: 157, name: 'Grafanil', provinceId: 11 },
			{ id: 158, name: 'Zango I', provinceId: 11 },
			{ id: 159, name: 'Zango II', provinceId: 11 },
			{ id: 160, name: 'Zango III', provinceId: 11 },
			{ id: 161, name: 'Zango IV', provinceId: 11 },
			{ id: 162, name: 'Zango 5000', provinceId: 11 },
			{ id: 163, name: 'Zango 8000', provinceId: 11 },
			{ id: 164, name: 'Vila Pacífica', provinceId: 11 },
			{ id: 165, name: 'Calumbo', provinceId: 11 },
			{ id: 166, name: 'Vila Flor', provinceId: 11 },
			{ id: 167, name: 'Mabor', provinceId: 11 },
			{ id: 168, name: 'Catambor', provinceId: 11 },
			{ id: 169, name: 'Sapú', provinceId: 11 },
			{ id: 170, name: 'Kicuxi', provinceId: 11 },
			{ id: 171, name: 'Gamek', provinceId: 11 },
			{ id: 172, name: 'Gamek a Direita', provinceId: 11 },
			{ id: 173, name: 'Cazenga', provinceId: 11 },
			{ id: 174, name: 'Hoji Ya Henda', provinceId: 11 },
			{ id: 175, name: 'Cuca', provinceId: 11 },
			{ id: 176, name: 'Nocal', provinceId: 11 },
			{ id: 177, name: 'Sonefe', provinceId: 11 },
			{ id: 178, name: 'Asa Branca', provinceId: 11 },
			{ id: 179, name: 'Tala Hadi', provinceId: 11 },
			{ id: 180, name: 'Socola', provinceId: 11 },
			{ id: 181, name: '11 de Novembro', provinceId: 11 },
			{ id: 182, name: 'Filda', provinceId: 11 },
			{ id: 183, name: 'Samba', provinceId: 11 },
			{ id: 184, name: 'Catintón', provinceId: 11 },
			{ id: 185, name: 'Corimba', provinceId: 11 },
			{ id: 186, name: 'Talatona', provinceId: 11 },
			{ id: 187, name: 'Nova Vida', provinceId: 11 },
			{ id: 188, name: 'Futungo do Belas', provinceId: 11 },
			{ id: 189, name: 'Morro Bento', provinceId: 11 },
			{ id: 190, name: 'Ramiros', provinceId: 11 },
			{ id: 191, name: 'Morro da Luz', provinceId: 11 },
			{ id: 192, name: 'Rocha Pinto', provinceId: 11 },
			{ id: 193, name: 'Antigo Controle', provinceId: 11 },
			{ id: 194, name: 'Multiperfil', provinceId: 11 },
			{ id: 195, name: 'Cassenda', provinceId: 11 },
			{ id: 196, name: 'Martíres do Kifangondo', provinceId: 11 },
			{ id: 197, name: 'Pretrofe', provinceId: 11 },
			{ id: 198, name: 'Codeme', provinceId: 11 },
			{ id: 199, name: 'Prenda', provinceId: 11 },
			{ id: 200, name: 'Alvalade', provinceId: 11 },
			{ id: 201, name: 'Zamba 2', provinceId: 11 },
			{ id: 202, name: 'Coreia', provinceId: 11 },
			{ id: 203, name: 'Bairro Azul', provinceId: 11 },
			{ id: 204, name: 'Nova Marginal', provinceId: 11 },
			{ id: 205, name: '1º de Maio', provinceId: 11 },
			{ id: 206, name: 'Sagrada Família', provinceId: 11 },
			{ id: 207, name: 'Chabá', provinceId: 11 },
			{ id: 208, name: 'Kilamba Kiaxi', provinceId: 11 },
			{ id: 209, name: 'Centralidade do Kilamba', provinceId: 11 },
			{ id: 210, name: 'Centralidade KK 5000', provinceId: 11 },
			{ id: 211, name: 'Centralidade do Sequele', provinceId: 11 },
			{ id: 212, name: 'Palanca', provinceId: 11 },
			{ id: 213, name: 'Golf 1', provinceId: 11 },
			{ id: 214, name: 'Golf ii', provinceId: 11 },
			{ id: 215, name: 'Calemba', provinceId: 11 },
			{ id: 216, name: 'Calemba II', provinceId: 11 },
			{ id: 217, name: 'Camama', provinceId: 11 },
			{ id: 218, name: 'Catete', provinceId: 11 },
			{ id: 219, name: 'Bom Jesus', provinceId: 11 },
			{ id: 220, name: 'Maianga', provinceId: 11 },
			{ id: 221, name: 'Ingombota', provinceId: 11 },
			//Província de Lunda Norte
			{ id: 222, name: 'Lucapa', provinceId: 12 },
			{ id: 223, name: 'Tchitato', provinceId: 12 },
			{ id: 224, name: 'Cambulo', provinceId: 12 },
			{ id: 225, name: 'Chitato', provinceId: 12 },
			{ id: 226, name: 'Cuilo', provinceId: 12 },
			{ id: 227, name: 'Cangula', provinceId: 12 },
			{ id: 228, name: 'Cuango', provinceId: 12 },
			{ id: 229, name: 'Capenda Camulemba', provinceId: 12 },
			{ id: 230, name: 'Xá Muteba', provinceId: 12 },
			//Província de Lunda Sul
			{ id: 231, name: 'Saurimo', provinceId: 13 },
			{ id: 232, name: 'Dala', provinceId: 13 },
			{ id: 233, name: 'Muconda', provinceId: 13 },
			{ id: 234, name: 'Cacolo', provinceId: 13 },
			//Província de Malange
			{ id: 235, name: 'Malange', provinceId: 14 },
			{ id: 236, name: 'Massango', provinceId: 14 },
			{ id: 237, name: 'Marimba', provinceId: 14 },
			{ id: 238, name: 'Calandula', provinceId: 14 },
			{ id: 239, name: 'Caombo', provinceId: 14 },
			{ id: 240, name: 'Cuanda-Dia-Baza', provinceId: 14 },
			{ id: 241, name: 'Cacuzo', provinceId: 14 },
			{ id: 242, name: 'Cuaba Nzoge', provinceId: 14 },
			{ id: 243, name: 'Quela', provinceId: 14 },
			{ id: 244, name: 'Mucari', provinceId: 14 },
			{ id: 245, name: 'Cangandala', provinceId: 14 },
			{ id: 246, name: 'Cambundi-Catembo', provinceId: 14 },
			{ id: 247, name: 'Luquembo', provinceId: 14 },
			{ id: 248, name: 'Quirima', provinceId: 14 },
			{ id: 249, name: 'Quale', provinceId: 14 },
			//Província de Moxico
			{ id: 250, name: 'Luena', provinceId: 15 },
			{ id: 251, name: 'Moxico', provinceId: 15 },
			{ id: 252, name: 'Camanongue', provinceId: 15 },
			{ id: 253, name: 'Léua', provinceId: 15 },
			{ id: 254, name: 'Luau', provinceId: 15 },
			{ id: 255, name: 'Cameia', provinceId: 15 },
			{ id: 256, name: 'Lucano', provinceId: 15 },
			{ id: 257, name: 'Alto Zambeze', provinceId: 15 },
			{ id: 258, name: 'Luchazes', provinceId: 15 },
			{ id: 259, name: 'Bundas', provinceId: 15 },
			//Província de Namibe
			{ id: 260, name: 'Namibe', provinceId: 16 },
			{ id: 261, name: 'Camacuio', provinceId: 16 },
			{ id: 262, name: 'Bibala', provinceId: 16 },
			{ id: 263, name: 'Virei', provinceId: 16 },
			{ id: 264, name: 'Tombwa', provinceId: 16 },
			//Província de Uíge
			{ id: 265, name: 'Zombo', provinceId: 17 },
			{ id: 266, name: 'Quimbele', provinceId: 17 },
			{ id: 267, name: 'Damba', provinceId: 17 },
			{ id: 268, name: 'Mucaba', provinceId: 17 },
			{ id: 269, name: 'Macocola', provinceId: 17 },
			{ id: 270, name: 'Bembe', provinceId: 17 },
			{ id: 271, name: 'Songo', provinceId: 17 },
			{ id: 272, name: 'Buengas', provinceId: 17 },
			{ id: 273, name: 'Sanza Pombo', provinceId: 17 },
			{ id: 274, name: 'Ambuíla', provinceId: 17 },
			{ id: 275, name: 'Uíge', provinceId: 17 },
			{ id: 276, name: 'Negage', provinceId: 17 },
			{ id: 277, name: 'Puri', provinceId: 17 },
			{ id: 278, name: 'Alto Cauale', provinceId: 17 },
			{ id: 279, name: 'Quitexe', provinceId: 17 },
			//Província do Zaire
			{ id: 280, name: "M'Banza Congo", provinceId: 18 },
			{ id: 281, name: 'Soyo', provinceId: 18 },
			{ id: 282, name: 'Nzeto', provinceId: 18 },
			{ id: 283, name: 'Cuimba', provinceId: 18 },
			{ id: 284, name: 'Noqui', provinceId: 18 },
			{ id: 285, name: 'Tomboco', provinceId: 18 },
			//Bahia
			{ id: 286, name: 'Salvador', provinceId: 23 },
			{ id: 287, name: 'Curitiba', provinceId: 34 },

			{ id: 288, name: 'São Paulo', provinceId: 43 },
			{ id: 289, name: 'Diadema', provinceId: 43 },
			{ id: 290, name: 'Campinas', provinceId: 43 },
			{ id: 291, name: 'Pinheiros', provinceId: 43 },
			{ id: 292, name: 'Cambuci', provinceId: 43 },
			{ id: 293, name: 'São José dos Campos', provinceId: 43 },
			{ id: 294, name: 'São Gonçalo', provinceId: 43 },
			{ id: 295, name: 'São Bernado', provinceId: 43 },
			{ id: 296, name: 'São Caetano', provinceId: 43 }
		] as MunicipalityProps[]

		return provinceId
			? municipalities.filter((municipality) => municipality.provinceId == provinceId)
			: municipalities
	}
}
