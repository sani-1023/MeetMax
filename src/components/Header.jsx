import LogoIcon from "../assets/icons/Logo.svg";

export default function Header() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={LogoIcon} alt="Logo" className="w-[75px] h-6" />{" "}
      </div>
      <select className="text-xs text-gray-500 hover:text-gray-700 rounded-lg border px-2 py-1">
        <option>English (UK)</option>
        <option>English (US)</option>
      </select>
    </div>
  );
}
