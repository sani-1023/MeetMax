import React from "react";
import { Link } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import Header from "../components/Header";
import { PageTitleAndDescription } from "../components/PageTitleAndDescription";
import SocialLogin from "../components/SocialLogin";

export default function SignInPage() {
  return (
    <section className="w-full max-w-sm px-4 py-8">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
        <Header />

        <PageTitleAndDescription
          title={"Sign In"}
          description="Welcome back, you’ve been missed!"
        />

        <SocialLogin />

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <SignInForm />

        <p className="text-center text-sm text-gray-600 mt-4">
          You haven’t any account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
