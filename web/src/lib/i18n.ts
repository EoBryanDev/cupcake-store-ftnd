import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/src/locales/en.json";
import pt from "@/src/locales/pt.json";

export const defaultNS = "common";
export const resources = {
	en: {
		common: en.common,
		home: en.home,
		auth: en.auth,
		products: en.products,
		orders: en.orders,
	},
	"pt-BR": {
		common: pt.common,
		home: pt.home,
		auth: pt.auth,
		products: pt.products,
		orders: pt.orders,
	},
} as const;

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultNS,
		resources,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["navigator", "htmlTag", "path", "subdomain"],
			caches: ["localStorage"],
		},
	});

export default i18n;
