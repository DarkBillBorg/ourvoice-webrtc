import React, { useState } from "react";
import { FaPhone, FaPhoneSlash } from "react-icons/fa";

const CallButton = ({ phoneNumber }) => {
  const [isCalling, setIsCalling] = useState(false);

  // Fonction pour gérer le clic sur le bouton
  const handleCallToggle = () => {
    setIsCalling(!isCalling);

    if (!isCalling) {
      console.log(`Démarrage de l'appel vers ${phoneNumber}`);
    } else {
      console.log(`Fin de l'appel vers ${phoneNumber}`);
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
