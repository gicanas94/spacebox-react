export const capitalizeEachStringWord = string => (
  string.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase())
);

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
