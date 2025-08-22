import { useState } from "react";
import {
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Mars,
  Venus,
} from "lucide-react";

import GoogleIcon from "../assets/icons/Google.svg";
import AppleIcon from "../assets/icons/Apple.svg";
import EmailIcon from "../assets/icons/Mail-@.svg";
import MaleIcon from "../assets/icons/male.svg"
import FemaleIcon from "../assets/icons/Female.svg";
import UserIcon from "../assets/icons/Smile.svg";
import LockIcon from "../assets/icons/Lock.svg";
import CalendarIcon from "../assets/icons/Calendar.svg";

export default function SignUpForm() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    dateOfBirth: "",
    gender: "male",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // mock register -> localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === form.email)) {
      setStatus("error");
      setMessage("Email already registered");
      return;
    }
    users.push({ ...form, id: Date.now() });
    localStorage.setItem("users", JSON.stringify(users));
    setStatus("ok");
    setMessage("Account created! You can sign in now.");
  };

  return (
    <div className="mt-6">
      {/* Social login */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
          title="Continue with Google"
        >
          <img src={GoogleIcon} alt="Google" className="h-4 w-4" />
          <span className="text-xs text-gray-600">Log in with Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-50"
          title="Continue with Apple"
        >
          <img src={AppleIcon} alt="Google" className="h-4 w-4" />
          <span className="text-xs text-gray-600 ">Log in with Apple</span>
        </button>
      </div>

      {/* Divider */}
      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">OR</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        {/* Email */}
        <div className="relative">
          <img src={EmailIcon} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={onChange}
            className="w-full rounded-lg border bg-white px-9 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500"
            required
          />
        </div>

        {/* Name */}
        <div className="relative">
          <img src={UserIcon} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={onChange}
            className="w-full rounded-lg border bg-white px-9 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <img src={LockIcon} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={onChange}
            className="w-full rounded-lg border bg-white px-9 py-2 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500"
            required
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Date of birth */}
        <div className="relative">
          <img src={CalendarIcon} className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={onChange}
            className="w-full rounded-lg border bg-white px-9 py-2 text-sm outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Gender */}
        <fieldset className="flex items-center gap-6">
          <legend className="sr-only">Gender</legend>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={onChange}
              className="h-4 w-4"
            />
            <img src={MaleIcon} className="h-4 w-4 text-gray-500" /> Male
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={onChange}
              className="h-4 w-4"
            />
            <img src={FemaleIcon} className="h-4 w-4 text-gray-500" /> Female
          </label>
        </fieldset>

        {/* Submit */}
        <button
          type="submit"
          className="mt-1 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Sign Up
        </button>

        {status !== "idle" && (
          <p
            className={`mt-2 text-center text-sm ${
              status === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
