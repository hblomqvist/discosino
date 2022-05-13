export default {
	"**/*.ts": () => ["yarn typecheck", "eslint --fix --no-error-on-unmatched-pattern"]
};
