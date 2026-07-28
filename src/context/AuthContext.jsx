import {createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
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
    <AuthContext.Provider value={{ photoProfile, nameProfile, status, handleLogin }}>
        {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext) 