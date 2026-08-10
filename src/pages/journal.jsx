import { useState } from "react";

export function Journal() {
  return (
    <div className="page-transition relative bg-[#F5F5F5] min-h-screen pb-16">
      <div>
        <h1 
          className="text-center text-4xl sm:text-5xl font-semibold text-[#3A5340] mx-6 pt-8 tracking-wide"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          How are you feeling?
        </h1>

        <h3 className="text-center text-base mt-4 mb-2 text-[#30312E] mx-6">
          Take a moment to ground yourself. There is no right or wrong way to feel.
        </h3>
      </div>
    </div>
  );
}

export default Journal;