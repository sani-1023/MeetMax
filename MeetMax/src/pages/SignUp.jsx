import SignUpForm from "../components/SignUpForm";
import LogoIcon from "../assets/icons/Logo.svg";

export default function SignUp() {
  return (
    <section className="w-full max-w-sm px-4 py-8">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2">
            <img src={LogoIcon} alt="Logo" className="w-[75px] h-6" />{" "}
            {/* <span className="font-semibold text-gray-900">Meetmax</span> */}
          </div>
          {/* Right: Language Button */}
          <button
            className="text-xs text-gray-500 hover:text-gray-700 rounded-lg border px-2 py-1"
            type="button"
          >
            English (UK) ▾
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Getting Started
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create an account to continue and connect with the people.
          </p>
        </div>

        <SignUpForm />
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a className="font-medium text-blue-600 hover:underline" href="#">
          Sign In
        </a>
      </p>
    </section>
  );
}
