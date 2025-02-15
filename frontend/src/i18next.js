import i18next from "i18next";
import resources from "./locales/languages.js";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18next;
