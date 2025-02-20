import React, { useState, useEffect } from "react";
import { Web } from "sip.js";
import { FaPhone, FaPhoneSlash } from "react-icons/fa";

const CallButton = ({ phoneNumber }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [simpleUser, setSimpleUser] = useState(null);

  const sipConfig = {
    server: "wss://pbx.zadarma.com:4443/", // WebSocket SIP server
    aor: "sip:88198-103@pbx.zadarma.com", // URI SIP
    username: "88198-103",
    password: "fAg9DRtcL7",
  };

  useEffect(() => {
    const createUserAgent = async () => {
      const user = new Web.SimpleUser(sipConfig.server, {
        aor: sipConfig.aor,
        userAgentOptions: {
          authorizationUsername: sipConfig.username,
          authorizationPassword: sipConfig.password,
        },
      });

      await user.connect(); // Connexion au serveur SIP
      await user.register(); // Enregistrement de l'utilisateur
      setSimpleUser(user);
      console.log("SIP Client connecté !");
    };

    createUserAgent();

    return () => {
      if (simpleUser) {
        simpleUser.disconnect();
      }
    };
  }, []);

  const handleCallToggle = async () => {
    if (!simpleUser) return;

    if (!isCalling) {
      try {
        await simpleUser.call(`sip:${phoneNumber}@pbx.zadarma.com`);
        setIsCalling(true);
      } catch (error) {
        console.error("Échec de l'appel :", error);
      }
    } else {
      await simpleUser.hangup();
      setIsCalling(false);
      console.log(`Appel terminé vers ${phoneNumber}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleCallToggle}
        className={`px-6 py-3 rounded-full text-white text-lg flex items-center gap-3 ${
          isCalling ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isCalling ? (
          <>
            <FaPhoneSlash size={20} />
            Raccrocher
          </>
        ) : (
          <>
            <FaPhone size={20} />
            Appeler
          </>
        )}
      </button>
    </div>
  );
};

export default CallButton;


