"use client";
import Image from "next/image";
import React, { useState } from "react";
import goml from "../assets/goml.png";
import { User, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import loginpAnimation from "../assets/animations/Animation-login.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="h-screen bg-cover overflow-hidden relative m-0 p-0">
      <div className="absolute w-full h-full bg-[#ed7d31]/30">
        <div className="flex justify-around items-center h-full">
          <div className="hidden md:block ml-25 w-1/2 h-full relative -z-10">
            <Lottie
              animationData={loginpAnimation}
              autoplay
              loop
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col justify-center items-center h-full w-full md:w-1/2">
            <div className="flex flex-col items-center rounded-lg shadow-lg bg-white/40 text-center px-5 py-20 w-[90%] max-w-[400px]">
              <Image src={goml} alt="Logo" width={150} height={150} />
              <h2 className="text-[#C4550A] text-3xl font-bold font-inter mt-8 my-5">
                Login
              </h2>

              <div className="flex items-center border-b-2 border-[#c54a00] mb-5 px-1 py-1 w-full">
                <User className="mr-4" size={20} color="#c54a00" />
                <input
                  type="text"
                  placeholder="Username"
                  className="flex-1 bg-transparent text-[#c54a00] text-lg focus:outline-none placeholder-[#c54a00]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="flex items-center border-b-2 border-[#c54a00] mb-5 px-1 py-1 w-full">
                <EyeOff className="mr-4" size={20} color="#c54a00" />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-1 bg-transparent text-[#c54a00] text-lg focus:outline-none placeholder-[#c54a00]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-[#555458] to-[#0E0A1A] text-white cursor-pointer px-5 py-2 rounded-md font-bold mt-8 w-[200px] hover:from-[#0E0A1A] hover:to-[#555458] active:scale-[.99] transition-transform"
              >
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
