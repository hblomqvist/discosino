import { cleanEnv, EnvMissingError, makeValidator, str, url } from 'envalid';

const strArray = makeValidator((value) => value.split(',').map((value) => value.trim()));

const strNotEmpty = makeValidator((value) => {
	if (!value) throw new EnvMissingError();

	return value;
});

export const ENV = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ['development', 'production'],
		default: 'development'
	}),
	ACTIVITY_NAME: str({ default: '' }),
	ACTIVITY_TYPE: str({
		choices: ['PLAYING', 'STREAMING', 'LISTENING', 'WATCHING', 'COMPETING'],
		default: ''
	}),
	DEVELOPER_IDS: strArray({ default: [] }),
	DATABASE_URL: url(),
	DISCORD_TOKEN: strNotEmpty(),
	PASTE_GG_TOKEN: str({ default: '' })
});
