import React, { useState } from "react";
import { ArrowLeft, ChevronDown, X } from "lucide-react";
import NavigationBar from "../components/NavigationBar";
import SmileIcon from "../assets/icons/Smile.svg";
import VideoIcon from "../assets/icons/Video-camera.svg";
import ImageIcon from "../assets/icons/Picture.svg";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import DummyImage from "../assets/Dummy_Profile.svg";

const CreatePostPage = () => {
  const [postText, setPostText] = useState("");
  const [visibility, setVisibility] = useState("Friends");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [showFeelingModal, setShowFeelingModal] = useState(false);

  const navigate = useNavigate();

  const feelings = [
    { emoji: "😊", name: "happy" },
    { emoji: "😢", name: "sad" },
    { emoji: "😍", name: "excited" },
    { emoji: "😴", name: "tired" },
    { emoji: "🤔", name: "thoughtful" },
    { emoji: "😎", name: "cool" },
    { emoji: "🥳", name: "celebrating" },
    { emoji: "😤", name: "frustrated" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!postText.trim() && !selectedImage && !selectedFeeling) {
      alert("Please add text, image, or feeling to create a post");
      return;
    }

    const newPost = {
      id: Date.now(),
      author: "You",
      time: "now",
      content: postText,
      type: selectedImage !== null ? "photo" : "status",
      imageUrl: selectedImage !== null ? selectedImage : null,
      likes: 0,
      comments: [],
      shares: 0,
      visibility: "public",
    };

    const existingPosts = JSON.parse(
      localStorage.getItem("meetmax_posts") || "[]"
    );
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem("meetmax_posts", JSON.stringify(updatedPosts));

    // Reset form
    setPostText("");
    setSelectedImage(null);
    setSelectedFeeling("");

    alert("Post created successfully!");

    navigate("/home");
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const removeFeeling = () => {
    setSelectedFeeling("");
  };

  const selectFeeling = (feeling) => {
    setSelectedFeeling(feeling);
    setShowFeelingModal(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Top Header with Profile and Search - Fixed */}
      <div className="flex-shrink-0">
        <SearchBar />
      </div>

      {/* Create Post Header - Fixed */}
      <div className="bg-white border-b px-3 py-2.5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <button onClick={()=> navigate("/home")} className="p-0">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-base font-medium text-gray-800">
              Create a post
            </h1>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-gray-500">Visible for</span>
            <button className="flex items-center space-x-0.5 text-blue-500 font-medium">
              <span className="text-sm">{visibility}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Post Content Area */}
        <div className="bg-white px-3 py-3">
          <div className="flex items-start space-x-2.5">
            <img
              src={DummyImage}
              className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"
            />

            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl p-3 min-h-[100px]">
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="What's happening?"
                  className="w-full text-gray-500 text-base placeholder-gray-400 resize-none border-none outline-none bg-transparent"
                  rows={postText ? "auto" : "4"}
                  style={{ minHeight: postText ? "auto" : "80px" }}
                />

                {/* Selected Feeling Display */}
                {selectedFeeling && (
                  <div
                    className={`${
                      postText.trim() ? "mt-2" : "mt-0"
                    } inline-flex items-center bg-blue-50 rounded-full px-3 py-1 border border-blue-200`}
                  >
                    <span className="text-sm">
                      feeling {selectedFeeling.emoji} {selectedFeeling.name}
                    </span>
                    <button
                      onClick={removeFeeling}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Selected Image Display */}
                {selectedImage && (
                  <div
                    className={`${
                      postText.trim() || selectedFeeling ? "mt-2" : "mt-0"
                    } relative`}
                  >
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full max-h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Media Options */}
        <div className="bg-white px-3 py-0 space-y-0">
          <button className="w-full flex items-center space-x-3 py-2.5 text-left hover:bg-gray-50 transition-colors">
            <img src={VideoIcon} className="w-4 h-4" />
            <span className="text-gray-700 font-medium text-sm">
              Live Video
            </span>
          </button>

          <label className="w-full flex items-center space-x-3 py-2.5 text-left hover:bg-gray-50 transition-colors cursor-pointer">
            <img src={ImageIcon} className="w-4 h-4 text-green-500" />
            <span className="text-gray-700 font-medium text-sm">
              Photo/Video
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowFeelingModal(true)}
            className="w-full flex items-center space-x-3 py-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            <img src={SmileIcon} className="w-4 h-4 " />
            <span className="text-gray-700 font-medium text-sm">Feeling</span>
          </button>
        </div>

        {/* Post Button - Inside scrollable area with bottom margin */}
        <div className="bg-white px-3 py-3 pb-24">
          <button
            onClick={handleCreatePost}
            className={`w-full py-2.5 rounded-lg text-white font-medium text-sm ${
              postText.trim() || selectedImage || selectedFeeling
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!postText.trim() && !selectedImage && !selectedFeeling}
          >
            Post
          </button>
        </div>
      </div>

      {/* Feeling Selection Modal */}
      {showFeelingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 m-4 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">How are you feeling?</h3>
              <button
                onClick={() => setShowFeelingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {feelings.map((feeling) => (
                <button
                  key={feeling.name}
                  onClick={() => selectFeeling(feeling)}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">{feeling.emoji}</span>
                  <span className="text-sm capitalize">{feeling.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Fixed */}
      <div className="flex-shrink-0">
        <NavigationBar />
      </div>
    </div>
  );
};

export default CreatePostPage;
