import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import login from "@/public/images/login2.jpg";
import LoginForm from "./components/LoginForm";

const Page: React.FC = (props: {
  searchParams?: Record<"callbackUrl" | "error", string>;
}) => {
  return (
    <section className="login-section rounded-5 d-flex flex-column flex-md-row gap-1 bg-white p-5">
      <div className="d-flex flex-column justify-content-between align-items-center gap-2">
        <Image
          src={logo}
          width={180}
          alt="Panda"
          className=" align-self-start"
        />
        <Image src={login} width={385} alt="Login" />
      </div>
      <div className="login-section-form-container d-flex flex-column gap-1">
        <div className="fs-1 fs-bold">Welcome Back!</div>
        <div className="fs-4 text-light mb-3">Login to continue</div>
        <LoginForm
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </section>
  );
};

export default Page;
