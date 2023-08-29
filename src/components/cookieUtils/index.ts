export function setCookie(name: string, value: string, expirationDays: number) {
  let expires = "";
  if (expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + 24 * expirationDays * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  const cookieValue = name + "=";
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    let cookieString = cookie;
    while (cookieString.charAt(0) === " ") {
      cookieString = cookieString.substring(1);
    }
    if (cookieString.indexOf(cookieValue) === 0) {
      return cookieString.substring(cookieValue.length, cookieString.length);
    }
  }
}
