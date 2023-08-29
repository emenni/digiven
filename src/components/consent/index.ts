import i18n from "../i18n/index.json";
import { setCookie, getCookie } from "../cookieUtils";
import { pureFadeIn, pureFadeOut } from "../animations";

const language = i18n.consent as Language;

const { purecookieDesc, purecookieTitle, purecookieButton, purecookieLink } =
  language[
    navigator.language in language ? navigator.language : "pt-BR"
  ] as ConsentMessage;

export function consentCheck() {
  if (!getCookie("purecookieDismiss")) {
    (() => {
      document.getElementById("consentContainer")?.remove();
    })();

    const element = `<div class="consentContainer" id="consentContainer">
      <div class="cookieTitle"><a>${purecookieTitle}</a></div>
      <div class="cookieDesc"><p>${purecookieDesc} ${purecookieLink}</p></div>
      <div class="cookieButton"><a id="purecookieButton">${purecookieButton}</a></div>
      </div>`;

    document.body.innerHTML += element;

    pureFadeIn("consentContainer");

    const button = document.getElementById("purecookieButton");
    if (button) {
      button.addEventListener("click", purecookieDismiss);
    }
  }
  return consentContainer;
}

export function purecookieDismiss() {
  setCookie("purecookieDismiss", "1", 7);
  pureFadeOut("consentContainer");
}
