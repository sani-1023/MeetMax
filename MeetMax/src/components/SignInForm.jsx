import { useState } from "react";
import EmailIcon from "../assets/icons/Mail-@.svg";
import LockIcon from "../assets/icons/Lock.svg";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className="space-y-3" noValidate>
      {/* Email */}
      <div className="relative">
        <img
          src={EmailIcon}
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        />
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
      <div className="relative">
        <img
          src={LockIcon}
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
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

      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Sign In
      </button>
    </form>
  );
}
