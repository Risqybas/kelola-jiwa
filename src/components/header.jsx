import { createContext, useContext, useState } from "react";

function Header() {
  return (
    <div className="w-full h-16 bg-surface sticky top-0 text-on-surface flex items-center px-5 shadow-[0_20px_20px_-5px_rgba(74,101,78,0.08)] z-50">
      <h1 className="font-medium text-gray-700">Nama user</h1>
    </div>
  );
}

export default Header;