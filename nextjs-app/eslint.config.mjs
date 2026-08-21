import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const nextConfig = [
	...nextCoreWebVitals,
	{
		ignores: ["sanity.types.ts"],
	},
	{
		rules: {
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/incompatible-library": "off",
		},
	},
];

export default nextConfig;
