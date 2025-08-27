import React, { useState } from "react";
import HomeIcon from "../assets/icons/Home.svg";
import CommunityIcon from "../assets/icons/Community.svg";
import ExploreIcon from "../assets/icons/Explore.svg";
import NotificationIcon from "../assets/icons/Notification.svg";
import SettingsIcon from "../assets/icons/Setting.svg";

export default function NavigationBar() {
  const [activeTab, setActiveTab] = useState("home");
  
  return (
<div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t z-50">
  <div className="flex items-center justify-start py-2 overflow-x-auto whitespace-nowrap">
        <button 
           className="flex flex-col items-center py-2 px-4 relative min-w-max"
          onClick={() => setActiveTab("home")}
        >
          <img 
            src={HomeIcon} 
            className={`w-4 h-4 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <span className={`text-xs mt-1 ${activeTab === 'home' ? 'text-blue-500' : 'text-gray-400'}`}>
            Home
          </span>
          {/* Active indicator bar */}
          {activeTab === 'home' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"></div>
          )}
        </button>
        
        <button 
       className="flex flex-col items-center py-2 px-4 relative min-w-max"
          onClick={() => setActiveTab("community")}
        >
          <img 
            src={CommunityIcon} 
            className={`w-4 h-4 ${activeTab === 'community' ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <span className={`text-xs mt-1 ${activeTab === 'community' ? 'text-blue-500' : 'text-gray-400'}`}>
            My community
          </span>
          {/* Active indicator bar */}
          {activeTab === 'community' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"></div>
          )}
        </button>
        
        <button 
            className="flex flex-col items-center py-2 px-4 relative min-w-max"
          onClick={() => setActiveTab("explore")}
        >
          <img 
            src={ExploreIcon} 
            className={`w-4 h-4 ${activeTab === 'explore' ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <span className={`text-xs mt-1 ${activeTab === 'explore' ? 'text-blue-500' : 'text-gray-400'}`}>
            Explore
          </span>
          {/* Active indicator bar */}
          {activeTab === 'explore' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"></div>
          )}
        </button>
        
        <button 
      className="flex flex-col items-center py-2 px-4 relative min-w-max"
          onClick={() => setActiveTab("notifications")}
        >
          <img 
            src={NotificationIcon} 
            className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <span className={`text-xs mt-1 ${activeTab === 'notifications' ? 'text-blue-500' : 'text-gray-400'}`}>
            Notification
          </span>
          {/* Notification badge */}
          <div className="absolute -top-1 right-[1.5rem] w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">1</span>
          </div>
          {/* Active indicator bar */}
          {activeTab === 'notifications' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"></div>
          )}
        </button>
        
        <button 
      className="flex flex-col items-center py-2 px-4 relative min-w-max"
          onClick={() => setActiveTab("settings")}
        >
          <img 
            src={SettingsIcon} 
            className={`w-4 h-4 ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <span className={`text-xs mt-1 ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-400'}`}>
            Settings
          </span>
          {/* Active indicator bar */}
          {activeTab === 'settings' && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"></div>
          )}
        </button>
      </div>
    </div>
  );
}