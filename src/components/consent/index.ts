import i18n from "../i18n/index.json";
import { setCookie, getCookie } from "../cookieUtils";
import { pureFadeIn, pureFadeOut } from "../animations";

const language = i18n.consent as Language;

function consentMessage() {
  const { purecookieDesc, purecookieTitle, purecookieButton, purecookieLink } =
    language[
      getCookie("optLanguage") ||
        (navigator.language in language ? navigator.language : "pt-BR")
    ] as ConsentMessage;

  if (!getCookie("purecookieDismiss")) {
    const element = `
       <div class="cookieTitle"><a>${purecookieTitle}</a></div>
       <div class="cookieDesc"><p>${purecookieDesc} ${purecookieLink}</p></div>
       <div class="cookieButton"><a id="purecookieButton">${purecookieButton}</a></div>
       `;
    return element;
  }
}

function purecookieDismiss() {
  setCookie("purecookieDismiss", "1", 7);
  pureFadeOut("consentContainer");
}

window.loadConsent = () => {
  if (!getCookie("purecookieDismiss")) {
    document.getElementById("consentContainer")?.remove();

    const consentElement = document.createElement("div");
    consentElement.classList.add("consentContainer");
    consentElement.id = "consentContainer";
    consentElement.innerHTML = consentMessage();
    document.body.appendChild(consentElement);

    pureFadeIn("consentContainer");
    const button = document.getElementById("purecookieButton");
    if (button) {
      button.addEventListener("click", purecookieDismiss);
    }
  }
};

window.loadConsent();
