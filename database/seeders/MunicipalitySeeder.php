<?php

namespace Database\Seeders;

use App\Models\Municipality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MunicipalitySeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run()
	{
		//Bengo
		$array = $this->handleArray(1, 'Ambriz, Bula Atumba, Dande, Dembos, Nambuangongo, Pango Aluquém');

		//Benguela
		$array = array_merge(
			$array,
			$this->handleArray(
				2,
				'Balombo, Baía Farta, Benguela, Bocoio, Caimbambo, Catumbela, Chongorói, Cubal, Ganda, Lobito'
			)
		);

		//Bié
		$array = array_merge(
			$array,
			$this->handleArray(
				3,
				'Andulo, Camacupa, Catabola, Chinguar, Chitembo, Cuemba, Cunhinga, Cuíto, Nharea'
			)
		);

		//Cabinda
		$array = array_merge(
			$array,
			$this->handleArray(
				4,
				'Belize, Buco-Zau, Cabinda, Cacongo'
			)
		);

		//Cuando-Cubango
		$array = array_merge(
			$array,
			$this->handleArray(
				5,
				'Calai, Cuangar, Cuchi, Cuito Cuanavale, Dirico, Mavinga, Menongue, Nancova, Rivungo'
			)
		);

		//Cuanza Norte
		$array = array_merge(
			$array,
			$this->handleArray(
				6,
				'Ambaca, Banga, Bolongongo, Cambambe, Cazengo, Golungo Alto, Gonguembo, Lucala, Quiculungo, Samba Caju'
			)
		);

		//Cuanza Sul
		$array = array_merge(
			$array,
			$this->handleArray(
				7,
				'Amboim, Cassongue, Cela, Conda, Ebo, Libolo, Mussende, Porto Amboim, Quibala, Quilenda, Seles, Sumbe'
			)
		);

		//Cunene
		$array = array_merge(
			$array,
			$this->handleArray(
				8,
				'Cahama, Cuanhama, Curoca, Cuvelai, Namacunde, Ombadja'
			)
		);

		//Huambo
		$array = array_merge(
			$array,
			$this->handleArray(
				9,
				'Bailundo, Cachiungo, Caála, Ecunha, Huambo, Londuimbali, Longonjo, Mungo, Chicala-Choloanga, Chinjenje, Ucuma'
			)
		);

		//Huíla
		$array = array_merge(
			$array,
			$this->handleArray(
				10,
				'Caconda, Cacula, Caluquembe, Gambos, Chibia, Chicomba, Chipindo, Cuvango, Humpata, Jamba, Lubango, Matala, Quipungo, Quilengues'
			)
		);

		//Luanda
		$array = array_merge(
			$array,
			$this->handleArray(
				11,
				'Belas, Cacuaco, Cazenga, Ícolo e Bengo, Kilamba Kiaxi, Luanda, Quiçama, Talatona, Viana'
			)
		);

		//Lunda Norte
		$array = array_merge(
			$array,
			$this->handleArray(
				12,
				'Cambulo, Capenda-Camulemba, Caungula, Chitato, Cuango, Cuílo, Lóvua, Lubalo, Lucapa, Xá-Muteba'
			)
		);

		//Lunda Sul
		$array = array_merge(
			$array,
			$this->handleArray(
				13,
				'Cacolo, Dala, Muconda, Saurimo'
			)
		);

		//Malanje
		$array = array_merge(
			$array,
			$this->handleArray(
				14,
				'Cacuso, Calandula, Cambundi-Catembo, Cangandala, Caombo, Cuaba Nzoji, Cunda-Dia-Baze, Luquembo, Malanje, Marimba, Massango, Mucari, Quela, Quirima'
			)
		);

		//Moxico
		$array = array_merge(
			$array,
			$this->handleArray(
				15,
				'Alto Zambeze, Bundas, Camanongue, Léua, Luau, Luacano, Luchazes, Cameia, Moxico'
			)
		);

		//Namibe
		$array = array_merge(
			$array,
			$this->handleArray(
				16,
				'Bibala, Camucuio, Moçâmedes, Tômbua, Virei'
			)
		);

		//Uíge
		$array = array_merge(
			$array,
			$this->handleArray(
				17,
				'Alto Cauale, Ambuíla, Bembe, Buengas, Bungo, Damba, Milunga, Mucaba, Negage, Puri, Quimbele, Quitexe, Sanza Pombo, Songo, Uíge, Zombo'
			)
		);

		//Zaire
		$array = array_merge(
			$array,
			$this->handleArray(
				18,
				'Cuimba, Mabanza Congo, Nóqui, Nezeto, Soyo, Tomboco'
			)
		);

		try {
			Municipality::insert($array);
		} catch (\Throwable $th) {
			var_dump($array);
			die($th->getMessage());
		}
	}

	function handleArray(int $province_id, String $names)
	{
		$stringToArray = explode(',', $names);
		$array = [];
		foreach ($stringToArray as $value) {
			array_push(
				$array,
				[
					'province_id' => $province_id,
					'name' => trim($value),
				]
			);
		}
		return $array;
	}
}
