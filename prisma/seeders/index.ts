import { LocationSeeder } from './location-seeder'

export class DBSeeder {
	static async run() {
		await LocationSeeder.run()
	}
}

DBSeeder.run()
