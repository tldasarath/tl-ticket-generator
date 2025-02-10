"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../../public/logo.avif'
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navbar */}
     

     

      {/* Main Content */}
      <div className="h-full w-full relative flex overflow-y-auto bg-stone-950 bg-opacity-70">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full md:w-fit">
          {/* Content Boxes */}

          <Image src={logo} alt="logo" className="mt-10 h-10 w-auto rounded-lg"/>
          <div className="flex flex-col lg:flex-row justify-center items-center p-2 gap-3 w-full md:w-fit bg-white/30 text-white mt-10 shadow-lg shadow-black">
            {/* Left Box */}
            <div className="bg-white md:w-[570px] w-full md:h-[600px] h-[420px] min-w-[300px] max-w-[570px] shadow-md shadow-black  bg-cover" style={{ backgroundImage: "url('https://i.pinimg.com/originals/35/7c/00/357c00b9fee23d265b85473f7ff4edf6.jpg')" }} ></div>

            {/* Right Box */}
            <div className="md:w-[570px] w-full md:h-[600px] h-fit min-w-[300px] max-w-[570px] bg-cover bg-center rounded-lg"></div>
          </div>

          {/* Footer */}
          <p className="md:mt-4 py-2 text-center w-full bg-black md:bg-transparent md:text-md text-xs text-black font-bold">
            &#169; 2024 -{" "}
            <Link href="https://www.tltechnologies.net/" target="_blank">
              TL TECHNOLOGIES
            </Link>
            . ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
