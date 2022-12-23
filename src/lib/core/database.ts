import { ENV } from '#config';
import { container } from '@sapphire/framework';

export async function initDatabase() {
	try {
		await container.database.$connect();
		container.logger.info('Database: Connection successfully established');
	} catch (error) {
		if (ENV.isProd) throw error;
		container.logger.warn('Database: Not connected');
	}
}
