import { useState } from "react";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import EmailIcon from "../assets/icons/Mail-@.svg";
import MaleIcon from "../assets/icons/male.svg";
import FemaleIcon from "../assets/icons/Female.svg";
import UserIcon from "../assets/icons/Smile.svg";
import LockIcon from "../assets/icons/Lock.svg";
import CalendarIcon from "../assets/icons/Calendar.svg";
import { useAuth } from "../utils/AuthContext";

import { useNavigate } from "react-router-dom";

// ✅ Yup schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().min(2, "Name too short").required("Name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Gender is required")
    .required(),
});

export default function SignUpForm() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    dateOfBirth: "",
    gender: "male",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const onChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Validate with Yup
      await schema.validate(form, { abortEarly: false });

      setErrors({});
      const response = await signUp(form);
      navigate("/signin");
    } catch (err) {
      if (err.inner) {
        // Yup validation errors
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else if (err.message) {
        // API error (e.g., email already exists)
        setErrors({ email: err.message });
      } else {
        // Fallback for unexpected errors
        setErrors({ error: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        {/* Email */}
        <div>
          <div className="relative">
            <img
              src={EmailIcon}
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg border px-9 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <div className="relative">
            <img
              src={UserIcon}
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10"
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg border px-9 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <img
              src={LockIcon}
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={onChange}
              className="w-full rounded-lg border px-9 py-2 pr-10 text-sm outline-none focus:border-blue-500"
            />
            <button
              type="button"
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
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <div className="relative">
            <img
              src={CalendarIcon}
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 z-10"
            />
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={onChange}
              className="w-full rounded-lg border px-9 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
          {errors.dateOfBirth && (
            <p className="text-xs text-red-600 mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Gender */}
        <fieldset className="flex items-center gap-6">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={form.gender === "male"}
              onChange={onChange}
            />
            <img src={MaleIcon} className="h-4 w-4" /> Male
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={form.gender === "female"}
              onChange={onChange}
            />
            <img src={FemaleIcon} className="h-4 w-4" /> Female
          </label>
        </fieldset>
        {errors.gender && (
          <p className="text-xs text-red-600 mt-1">{errors.gender}</p>
        )}

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

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
