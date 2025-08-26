import { useState } from "react";
import * as Yup from "yup";
import EmailIcon from "../assets/icons/Mail-@.svg";
import LockIcon from "../assets/icons/Lock.svg";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

// Yup schema for SignIn
const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const onChange = (e) =>
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInSchema.validate(form, { abortEarly: false });
      setErrors({});

      // Simulate successful login
      const response = await signIn(form);
      alert("✅ Login successful!");
      console.log("User logged in:", response.user);
      navigate("/home");
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      } else {
        alert(`❌ ${err.message || "Login failed"}`);
      }
    }
  };

  return (
    <form className="space-y-3" noValidate onSubmit={onSubmit}>
      {/* Email */}
      <div>
        <div className="relative">
          <img
            src={EmailIcon}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            alt="email"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={onChange}
            className={`w-full rounded-lg border bg-white px-9 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="relative">
          <img
            src={LockIcon}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            alt="password"
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            className={`w-full rounded-lg border bg-white px-9 py-2 pr-10 text-sm outline-none placeholder:text-gray-400 focus:border-blue-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
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
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex justify-between items-center text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="/forgotPassword" className="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}
