import DummyImage from "../assets/Dummy_Profile.svg";
import MessageIcon from "../assets/icons/Message.svg";
import SearchIcon from "../assets/icons/Search.svg";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        <img src={DummyImage} className="text-lg" />
      </div>

      <div className="flex-1 mx-4 relative">
        <img src={SearchIcon} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
        <input
          type="text"
          placeholder="Search for something here..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 border-2 border-gray-400"
        />
      </div>

      <button className="p-4">
        <img src={MessageIcon} className="w-5 h-5" />
      </button>
    </div>
  );
}
