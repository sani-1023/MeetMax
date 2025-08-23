import GoogleIcon from "../assets/icons/Google.svg";
import AppleIcon from "../assets/icons/Apple.svg";

export default function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
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
  );
}
