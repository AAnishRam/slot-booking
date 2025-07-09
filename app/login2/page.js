"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/circular_logo.png";
import Lottie from "lottie-react";
import animationData from "../assets/animation/animation.json";

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-[#eae8e8] flex flex-wrap justify-center items-center px-8 py-6 gap-50 overflow-hidden">
      {/* Left Panel */}
      <div className="hidden lg:block w-full md:w-1/2 max-w-[600px] bg-[#f2e8e7] p-8 rounded-2xl flex flex-col items-center justify-center relative h-auto md:h-[500px]">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-full h-[250px] sm:h-[300px] md:h-[420px] object-contain -mt-2 mb-4"
        />

        <div className="text-center mt-2">
          <h1 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[#333] mb-2">
            Welcome back <span className="italic text-[#ee8543]">goMilers</span>
            ...
          </h1>
          <p className="italic text-[1rem] sm:text-[1.2rem] text-[#555]">
            Book your seats right now...
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-2/5 max-w-[450px] bg-gradient-to-br from-[#f3d1c6] to-[#f5f0f0] p-10 rounded-2xl shadow-md flex flex-col items-start md:items-start gap-4">
        <Image
          src={logo}
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full"
        />

        <h2 className="text-[1.6rem] font-bold italic text-[#f47e34] text-center w-full mb-1">
          Login
        </h2>

        <label className="font-medium italic">Username</label>
        <input
          type="text"
          className="w-full bg-[#f2e8e7] rounded-full px-4 py-2 shadow-sm focus:outline-none"
        />

        <label className="font-medium italic">Password</label>
        <input
          type="password"
          className="w-full bg-[#f2e8e7] rounded-full px-4 py-2 shadow-sm focus:outline-none"
        />

        <button className="w-full bg-gradient-to-br from-[#f57b51] to-[#f24444] text-white cursor-pointer py-3 px-6 rounded-full font-bold text-[1rem] transition-transform shadow-md hover:scale-[1.03] hover:shadow-xl hover:from-[#e55b30] hover:to-[#d93535]">
          Login
        </button>

        <p className="text-sm italic text-center w-full">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-red-600 font-bold italic underline cursor-pointer">
              sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
