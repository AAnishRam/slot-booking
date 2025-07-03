"use client";
import Image from "next/image";
import React, { useState } from "react";
import lampimg from "../assets/images/lamp.png";
import potimg from "../assets/images/pot.png";
import "./login.css";
import { User, EyeOff } from "lucide-react";

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
          <div className="lampcontent">
            <div className="lamp lamp1">
              <Image src={lampimg} alt="Lamp 1" width={200} height={200} />
            </div>
            <div className="lamp lamp2">
              <Image src={lampimg} alt="Lamp 2" width={200} height={200} />
            </div>
            <div className="lamp lamp3">
              <Image src={lampimg} alt="Lamp 3" width={200} height={200} />
            </div>
            <div className="lamp lamp4">
              <Image src={lampimg} alt="Lamp 4" width={200} height={200} />
            </div>
          </div>

          <div className="login-container">
            <div className="pot pot1">
              <Image src={potimg} alt="pot 1" width={120} height={120} />
            </div>

            <div className="login-card">
              <h2 className="login-title">WELCOME BACK!</h2>

              <div className="input-group">
                <User className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  className="input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group">
                <EyeOff className="icon" />
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

            <div className="pot pot2">
              <Image src={potimg} alt="pot 2" width={120} height={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
