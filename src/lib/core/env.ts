import { EnvError, makeValidator } from 'envalid';

export const strArray = makeValidator((value) => value.split(',').map((value) => value.trim()));

export const strNotEmpty = makeValidator((value) => {
	if (!value) throw new EnvError('Cannot be empty');
	return value;
});
