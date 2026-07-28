import { useAuth } from "../context/AuthContext";

function Header() {
  const {photoProfile, nameProfile} = useAuth();

  return (
    <div className="w-full h-16 bg-surface bg-white/5 backdrop-blur-md sticky top-0 text-on-surface flex items-center px-5 shadow-[0_20px_20px_-5px_rgba(74,101,78,0.08)] z-50">
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