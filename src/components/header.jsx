import { createContext, useContext, useState } from "react";

function Header() {
  const [photoProfile, setPhotoProfile] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [nameProfile, setNameProfile] = useState("Guest");

  async function handleLogin() {
  setStatus ("submitting");
  try {
    const response = await fetch('api-nanti');
    if(response.ok) {
      const data = await response.json();
      setPhotoProfile(data.photoUrl);
      setNameProfile(data.name);
      setStatus("success");
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (err) {
    setStatus("typing");
    setError(err);
  }
}

  return (
    <div className="w-full h-16 bg-surface sticky top-0 text-on-surface flex items-center px-5 shadow-[0_20px_20px_-5px_rgba(74,101,78,0.08)] z-50">
      <div className="border-box size-8 rounded-full bg-white m-2 flex items-center justify-center overflow-hidden"> 
        {photoProfile ? (
        <img src={photoProfile} alt="Profile" className="w-full h-full object-cover"/>
        ) : (
          "U"
        )}
      </div>
      <h1 className="font-medium text-gray-700 ml-2">{nameProfile}</h1>
    </div>
  );
}

export default Header;