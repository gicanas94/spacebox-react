import { SUPPORTED_LOCALES } from '../constants';

export const capitalizeEachStringWord = string => (
  string.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase())
);

export const defineAppLocale = (receivedLocale) => {
  // 1. If this function receives an appLocale, set that one
  if (receivedLocale) {
    localStorage.setItem('appLocale', receivedLocale);
    return receivedLocale;
  }

  // 2. Default language, just in case
  let locale = SUPPORTED_LOCALES.EN;

  // 3. Check if there is an appLocale inside LocalStorage
  const localStorageLocale = localStorage.getItem('appLocale');

  // 4. Is there is an appLocale inside LocalStorage and is valid, return that one
  if (
    localStorageLocale
    && SUPPORTED_LOCALES[localStorageLocale.toUpperCase()]
  ) {
    return localStorageLocale;
  }

  // 5. Get navigator language
  const navigatorLanguage = navigator.language || navigator.userLanguage;

  // 6. If navigator language exists, check if we cover that language
  if (navigatorLanguage) {
    Object.keys(SUPPORTED_LOCALES).forEach((key) => {
      if (navigatorLanguage.toLowerCase().includes(SUPPORTED_LOCALES[key])) {
        locale = SUPPORTED_LOCALES[key];
      }
    });

    localStorage.setItem('appLocale', locale);
    return locale;
  }

  // 7. This means that we don't cover the navigator language so we return EN
  localStorage.setItem('appLocale', locale);
  return locale;
};

export const getCookie = (cName, returnValue) => {
  const name = `${cName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return returnValue ? c.substring(name.length, c.length) : true;
    }
  }

  return false;
};

export const setCookie = (cName, cValue, cExpirationTime) => {
  const expirationTime = `expires=${cExpirationTime}`;
  document.cookie = `${cName}=${cValue};${expirationTime};path=/`;
};

export const shuffleArray = (array) => {
  const shuffledArray = array;

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};
