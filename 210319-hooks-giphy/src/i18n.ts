import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to GIF Search!",
          inputPlaceholder: "Type your keyword here...",
          search: "Search",
        },
      },
      vi: {
        translation: {
          welcome: "Chào mừng tới GIF Search!",
          inputPlaceholder: "Nhập từ khoá...",
          search: "Tìm kiếm",
        },
      },
    },
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
