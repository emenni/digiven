import "../consent/index.css";
import digiVenLogo from "/digiven-logo-400x80.png?url";
import i18n from "../i18n/index.json";
import "./App.css";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "../cookieUtils";
import ReactDOM from "react-dom";

function App() {
  const language = i18n.offer as Language;
  //const consentCheckRef = useRef<HTMLDivElement>()

    const msg = window.consentCheck();
    
  if (!getCookie("optLanguage")) {
    setCookie(
      "optLanguage",
      navigator.language in language ? navigator.language : "pt-BR",
      7
    );
  }
  const optLanguage = getCookie("optLanguage") || "pt-BR";

  const [offer, setOffer] = useState<OfferItem[]>(
    language[optLanguage] as OfferItem[]
  );

  // JSON-LD data for structured data
  const jsonLdData = {
    "@context": "http://schema.org",
    "@type": "ItemList",
    itemListElement: offer.map((item, index) => ({
      "@type": item.type === "service" ? "Service" : "Product",
      position: index + 1,
      name: item.name,
      description: item.description,
    })),
  };

  const handleButtonClick = (buttonKey: string) => {
    setOffer(language[buttonKey] as OfferItem[]);
    setCookie("optLanguage", buttonKey, 7);
  };

  return (
    createPortal(msg,document.body)
    <div className="mainContainer">
      <nav className="navbar">
        {Object.keys(language).map((item, index) => (
          <button
            key={index}
            className="i18n-button"
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <img src={digiVenLogo} className="logo" alt="DigiVen Logo" />

      <div className="offerContainer">
        {offer.map((item, index) => (
          <div key={index} className="item">
            <p>
              <b>{item.name}</b> {item.description}
            </p>
          </div>
        ))}
      </div>
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData, null, 2)}
      </script>
    </div>
  );
}

export default App;
