import { install } from "husky";

if (process.env.CI !== "true") {
	try {
		install();
	} catch (error) {
		if (error.code !== "MODULE_NOT_FOUND") throw error;
	}
}
