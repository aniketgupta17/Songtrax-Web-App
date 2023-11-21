import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Template({ children, notHome }) {
  return (
    <div className="w-screen min-h-screen flex flex-col relative items-center overflow-x-hidden">
      <Navbar notHome={notHome} />
      <main
        id="content"
        className="w-full max-w-[1500px] px-6 pb-10 pt-32 flex flex-1 flex-col gap-6"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
