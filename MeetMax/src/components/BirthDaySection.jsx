import { Cake, Send } from "lucide-react";
import DummyImage from "../assets/Dummy_Profile.svg";


export default function BirthDaySection() {
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Birthdays</h3>
        <button className="text-blue-500 text-sm">See All</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-3 mb-4">
          <img src={DummyImage} className="w-12 h-12 rounded-xl bg-gray-300 flex items-center justify-center"/>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Edilson De Carvalho</h4>
            <p className="text-xs text-gray-500">Birthday today</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="Write on his Inbox"
            className="flex-1 text-sm bg-gray-100 px-3 py-2 rounded-2xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
          />
          <button className="p-2">
            <Send className="w-4 h-4 text-blue-500" />
          </button>
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-200 flex items-center justify-center">
            <Cake className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h5 className="font-medium text-sm text-yellow-800">
              Upcoming birthdays
            </h5>
            <p className="text-xs text-yellow-600">
              See 72 others have upcoming birthdays
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
