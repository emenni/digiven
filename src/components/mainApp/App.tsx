import "../consent/index.css";
import digiVenLogo from "../../assets/digiven-logo-400x80.png";
import "./App.css";
import { setCookie, getCookie } from "../cookieUtils";
import i18n from "../i18n/index.json";
import { useEffect, useState } from "react";

function App() {

  const language = i18n.offer as Language;
  //const [isClient, setIsClient] = useState(false);

  const isClient = !import.meta.env.SSR

  let jsonLdData

  useEffect(() => {

    if (!getCookie("optLanguage")) {
      setCookie(
        "optLanguage",
        navigator.language in language ? navigator.language : "pt-BR",
        7
      );
    }

    // JSON-LD data for structured data
    jsonLdData = isClient ? {
      "@context": "http://schema.org",
      "@type": "ItemList",
      itemListElement: offer?.map((item, index) => ({
        "@type": item.type === "service" ? "Service" : "Product",
        position: index + 1,
        name: item.name,
        description: item.description,
        offers: item.type !== "service"
          ? { "@type": "Offer", "price": 0, "priceCurrency": "BRL" }
          : null
      })),
    } : null;
  }, [])

  const optLanguage = isClient ? getCookie("optLanguage") || "pt-BR" : "pt-BR";
  const [offer, setOffer] = useState<OfferItem[] | []>(language[optLanguage] as OfferItem[]);



  const handleButtonClick = (buttonKey: string) => {
    setOffer(language[buttonKey] as OfferItem[]);
    setCookie("optLanguage", buttonKey, 7);
    window.loadConsent();

  };

  return (
    <>
      <div className="mainContainer">
        <nav className="navbar">
          {language ? Object.keys(language).map((item, index) => (
            <button
              key={index}
              className="i18n-button"
              onClick={() => isClient ? handleButtonClick(item) : {}}
            >
              {item}
            </button>
          )) : null}
        </nav>
        <img src={digiVenLogo} className="logo" alt="DigiVen Logo" />


        < div className="offerContainer" >

          {isClient && offer?.map((item, index) => (
            <div key={index} className="item">
              <p>
                <b>{item.name}</b> {item.description}
              </p>
            </div>
          ))}
        </div>


        {jsonLdData &&
          <script type="application/ld+json">
            {JSON.stringify(jsonLdData, null, 2)}
          </script>
        }
      </div >
    </>
  );

}

export default App;
