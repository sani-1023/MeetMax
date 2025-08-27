import { Link } from "react-router-dom";
import Header from "../components/Header";
import { PageTitleAndDescription } from "../components/PageTitleAndDescription";
import EmailIcon from "../assets/icons/Mail-@.svg";

export default function ForgotPassword() {
  return (
    <section className="w-full max-w-sm px-4 py-8">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
        <Header />

        {/* Title */}
        <PageTitleAndDescription
          title="Forgot Password"
          description="Enter your details to receive a reset link"
        />

        <form className="space-y-4 mt-6">
          {/* Email */}
          <div className="relative">
            <img
              src={EmailIcon}
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-lg border bg-white px-9 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Send
          </button>
        </form>

        {/* Back to Sign In */}
        <div className="mt-6 text-center">
          <Link
            to="/signin"
            className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1"
          >
            <span className="mr-2">&lt;</span> Back to Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
