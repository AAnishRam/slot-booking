"use client";
import Image from "next/image";
import React, { useState } from "react";
import lampimg from "../assets/images/lamp.png";
import goml from "../assets/goml.png";
import "./login.css";
import { User, EyeOff } from "lucide-react";
import Lottie from "lottie-react";
import loginpAnimation from "../assets/animations/Animation-login.json";

const Login = () => {
  // State variables
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handler function
  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="main">
      <div className="overlay">
        <div className="content">
          <div className="animation-container w-[50%] h-full">
            <Lottie
              animationData={loginpAnimation}
              autoplay
              loop
              className="w-full h-full"
            />
          </div>
          <div className="login-container ">
            <div className="login-card  ">
              <Image src={goml} alt="Logo" width={150} height={150} />
              <h2 className="login-title">Login</h2>
              <div className="input-group">
                <User className="icon" size={20} color="#c54a00" />
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group">
                <EyeOff className="icon" size={20} color="#c54a00" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button className="login-button" onClick={handleLogin}>
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
