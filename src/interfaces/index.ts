interface OfferItem {
  id: string;
  type: "service" | "product";
  name: string;
  description: string;
}

interface ConsentMessage {
  purecookieDesc: string;
  purecookieTitle: string;
  purecookieButton: string;
  purecookieLink: string;
}

interface Language {
  [key: string]: ConsentMessage | OfferItem[];
}

interface I18n {
  consent?: Language;
  offer?: Language;
}

interface Window {
  loadConsent: () => void;
}

interface AppProps {
  language?: Language | "",
  onClickFunction?: (buttonKey: string) => void | {},
  offer?: OfferItem[] | []
};
