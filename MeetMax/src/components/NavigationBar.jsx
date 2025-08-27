import {
  Users,
  Home,
  Globe,
  Bell,
  Settings,
} from "lucide-react";
import HomeIcon from "../assets/icons/Home.svg";
import CommunityIcon from "../assets/icons/Community.svg";
import ExploreIcon from "../assets/icons/Explore.svg";
import NotificationIcon from "../assets/icons/Notification.svg";
import SettingsIcon from "../assets/icons/Setting.svg";

export default function NavigationBar() {
  return (
     <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white border-t">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4">
            <img src={HomeIcon} className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-blue-500 mt-1">Home</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4">
            <img src={CommunityIcon} className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">My community</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4">
            <img src={ExploreIcon} className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Explore</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4 relative">
            <img src={NotificationIcon} className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Notification</span>
            <div className="absolute -top-1 right-[1.5rem] w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">1</span>
            </div>
          </button>

          <button className="flex flex-col items-center py-2 px-4">
            <img src={SettingsIcon} className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Settings</span>
          </button>
        </div>
      </div>
  );
}