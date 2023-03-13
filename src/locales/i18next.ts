import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_US from "public/locales/en-US/common.json";
import ko_KR from "public/locales/ko-KR/common.json";
import { lngs, ns } from "./i18next.config";

function loadResource(lng: string) {
  let lan_module = null;

  switch (lng) {
    case "ko-KR": {
      lan_module = ko_KR;
      break;
    }
    case "en-US": {
      lan_module = en_US;
      break;
    }
    default:
      lan_module = en_US;

      break;
  }

  return lan_module;
}

function getResources(lngs: string[]) {
  const resources: any = {};

  lngs.forEach((lng) => {
    resources[lng] = {
      common: loadResource(lng),
    };
  });

  return resources;
}

export function i18nInit() {
  i18n.use(initReactI18next).init({
    resources: getResources(lngs),
    ns: [ns],
    debug: false,
    fallbackLng: "en-US",
    returnEmptyString: false,
    keySeparator: false,
    nsSeparator: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      prefix: "%{",
      suffix: "}",
    },
    parseMissingKeyHandler(key) {
      /* eslint-disable-next-line no-console */
      console.warn("parseMissingKeyHandler", `'key': '${key}'`);
      const keySeparator = "~~";
      const value = key.includes(keySeparator)
        ? key.split(keySeparator)[1]
        : key;

      return value;
    },
  });
}

export function changeLanguage(lng: string) {
  return i18n.changeLanguage(lng);
}

export default i18n;
