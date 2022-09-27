import { EnvMissingError, makeValidator } from "envalid";

export const strArray = makeValidator((value) => value.split(",").map((value) => value.trim()));

export const strNotEmpty = makeValidator((value) => {
	if (!value) throw new EnvMissingError();

	return value;
});
