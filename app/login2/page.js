"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/images/circular_logo.png";
import "./lp2.css";
import Lottie from "lottie-react";
import animationData from "../assets/animation/animation.json";

export default function LoginPage() {
  return (
    <div className="container">
      <div className="left-panel">
        {/* ✅ Animation */}
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="lottie-animation"
        />

        <div className="left-text">
          <h1>Welcome back <span className="brand">goMilers</span>...</h1>
          <p>Book your seats right now...</p>
        </div>
      </div>

      <div className="right-panel">
        <Image src={logo} alt="Logo" width={60} height={60} className="logo" />
        <h2 className="login-title">Login</h2>

        <label>Username</label>
        <input type="text" className="input" />

        <label>Password</label>
        <input type="password" className="input" />

        <button className="login-btn">Login</button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="signup-link">sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
