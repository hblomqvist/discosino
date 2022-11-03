import type { UserError } from '@sapphire/framework';

const errorMessages: Record<ErrorIdentifier, string> = {
	developerOnly: 'This command can only be used by developers.',
	modalSessionExpired: 'The session has expired, please try again.',
	noDatabaseConnection: 'The database could not be reached, please try again later.',
	unexpected: 'An unexpected error occured.'
};

export function getErrorMessage({ message, identifier }: UserError): string {
	if (message) return message;
	if (Object.keys(errorMessages).includes(identifier)) return errorMessages[identifier as ErrorIdentifier];
	return errorMessages.unexpected;
}

export enum ErrorIdentifier {
	DeveloperOnly = 'developerOnly',
	ModalSesssionExpired = 'modalSessionExpired',
	NoDatabaseConnection = 'noDatabaseConnection',
	Unexpected = 'unexpected'
}
