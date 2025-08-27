import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Camera,
  Calendar,
  MapPin,
  MessageCircle,
  Share,
  MoreHorizontal,
  Users,
  FileImage,
  Home,
  Globe,
  Bell,
  Settings,
  Send,
  Cake,
  Heart,
  CalendarIcon,
} from "lucide-react";
import VideoIcon from "../assets/icons/Video-camera.svg";
import CameraIcon from "../assets/icons/Picture.svg";
import SmileIcon from "../assets/icons/Smile.svg";
import MessageIcon from "../assets/icons/Message.svg";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import ImageIcon from "../assets/icons/Picture.svg";
import DummyImage from "../assets/Dummy_Profile.svg";
import BirthDaySection from "../components/BirthDaySection";
import SearchBar from "../components/SearchBar";
import CommentIcon from "../assets/icons/Comment.svg";
import LikeIcon from "../assets/icons/Heart.svg";
import LikedIcon from "../assets/icons/Heart_Filled.svg";
import ShareIcon from "../assets/icons/Share.svg";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [likedComments, setLikedComments] = useState(new Set());
  const [commentTexts, setCommentTexts] = useState({});
  const [showAllComments, setShowAllComments] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);
  const [showPostMenu, setShowPostMenu] = useState(null);
  const [showCommentMenu, setShowCommentMenu] = useState(null);
  const navigate = useNavigate();
  const replyRefs = useRef({});

  const defaultPosts = [
    {
      id: 1,
      author: "Sajjad Hossain",
      time: "5h",
      content: "What's happening?",
      type: "status",
      likes: 0,
      comments: [
        {
          id: 1,
          author: "John Doe",
          content: "Great post!",
          time: "2h",
          likes: 2,
          replies: [],
        },
      ],
      shares: 0,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      author: "Sajjad Gallery",
      time: "5h",
      content: "",
      type: "photo",
      image: "/api/placeholder/300/200",
      likes: 0,
      comments: [
        {
          id: 2,
          author: "Alice Smith",
          content: "Nice photo!",
          time: "1h",
          likes: 1,
          replies: [],
        },
      ],
      shares: 0,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      author: "Graduation Ceremony",
      time: "8 years",
      content: "Graduation ceremony was held yesterday at the university.",
      type: "event",
      attendees: ["user1", "user2", "user3"],
      likes: 0,
      comments: [
        {
          id: 3,
          author: "Mike Johnson",
          content: "Congratulations to all graduates!",
          time: "3h",
          likes: 5,
          replies: [],
        },
      ],
      shares: 0,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      author: "Photography Ideas",
      time: "11 years",
      content: "Reflections. Reflections work because they are unexpected.",
      type: "article",
      likes: 0,
      comments: [
        {
          id: 4,
          author: "Sarah Wilson",
          content: "Love this perspective!",
          time: "30m",
          likes: 3,
          replies: [
            {
              id: 41,
              author: "Tom Brown",
              content: "Agreed! Great insight.",
              time: "15m",
              likes: 1,
            },
          ],
        },
      ],
      shares: 0,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 5,
      author: "ProShoot Themes",
      time: "11 years",
      content:
        "If you think adventure is dangerous, try routine, it's lethal. Paulo Coelho Good Good Good Good Good",
      type: "quote",
      images: ["/api/placeholder/150/150", "/api/placeholder/150/150"],
      likes: 0,
      comments: [
        {
          id: 5,
          author: "Emma Davis",
          content: "Beautiful shots! Where was this taken?",
          time: "45m",
          likes: 2,
          replies: [],
        },
      ],
      shares: 0,
      avatar: "/api/placeholder/40/40",
    },
  ];

  const stories = [
    { id: 1, name: "Saleh", avatar: "👤", isAddStory: true, hasStory: true },
    { id: 2, name: "Edilson", avatar: "🌍", hasStory: true },
    { id: 3, name: "Afrim", avatar: "👨", hasStory: true },
    { id: 4, name: "Eduardo", avatar: "🎯", hasStory: true },
    { id: 5, name: "Eduardo", avatar: "👤", hasStory: true },
  ];

  const recentEvents = [
    {
      id: 1,
      title: "Graduation Ceremony",
      description:
        "The graduation ceremony is also sometimes called commencement, convocation or invocation.",
      time: "5 days",
      attendees: ["👤", "👤", "👤"],
      totalAttendees: 5,
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Photography ideas",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
      time: "13 days",
      attendees: ["👤", "👤", "👤"],
      totalAttendees: 6,
      color: "bg-red-500",
    },
  ];

  const savedPosts = localStorage.getItem("meetmax_posts");

  console.log("Saved posts from localStorage:", savedPosts);

  useEffect(() => {
    // Load posts from localStorage or use default posts
    // localStorage.removeItem("meetmax_posts");
    const savedPosts = localStorage.getItem("meetmax_posts") || "[]";
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(defaultPosts);
    }
  }, []);

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);

    // Update post likes count
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            likes: newLikedPosts.has(postId) ? post.likes + 1 : post.likes - 1,
          }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("meetmax_posts", JSON.stringify(updatedPosts));
  };

  const handleCreatePost = () => {
    navigate("/createPost");
  };

  const handleCommentLike = (postId, commentId) => {
    const commentKey = `${postId}-${commentId}`;
    const newLikedComments = new Set(likedComments);
    if (newLikedComments.has(commentKey)) {
      newLikedComments.delete(commentKey);
    } else {
      newLikedComments.add(commentKey);
    }
    setLikedComments(newLikedComments);
  };

  const handleAddComment = (postId) => {
    const commentText = commentTexts[postId];
    if (!commentText?.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      content: commentText,
      time: "now",
      likes: 0,
      replies: [],
    };

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    );

    setPosts(updatedPosts);
    localStorage.setItem("meetmax_posts", JSON.stringify(updatedPosts));
    setCommentTexts({ ...commentTexts, [postId]: "" });
  };

  const handleAddReply = (postId, commentId, replyText) => {
    console.log("Adding reply to comment:", postId, commentId, replyText);
    if (!replyText?.trim()) return;

    const newReply = {
      id: Date.now(),
      author: "You",
      content: replyText,
      time: "now",
      likes: 0,
    };

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, replies: [...comment.replies, newReply] }
                : comment
            ),
          }
        : post
    );

    setPosts(updatedPosts);
    localStorage.setItem("meetmax_posts", JSON.stringify(updatedPosts));
    setReplyingTo(null);
  };

  const toggleAllComments = (postId) => {
    const newShowAllComments = new Set(showAllComments);
    if (newShowAllComments.has(postId)) {
      newShowAllComments.delete(postId);
    } else {
      newShowAllComments.add(postId);
    }
    setShowAllComments(newShowAllComments);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      {/* Header */}
      <SearchBar />

      {/* Stories Section */}
      <div className="pl-4 pt-1">
        <div className="flex space-x-4 pb-2">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center min-w-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-2xl mb-2 relative mt-1 ${
                  story.hasStory
                    ? "ring-2 ring-blue-500 bg-gray-100"
                    : "bg-gray-100"
                }`}
              >
                <img src={DummyImage} />
                {story.isAddStory && (
                  <div className="absolute -bottom-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-normal">+</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-600 text-center">
                {story.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Post Creation */}
      <div className="px-4 pb-2">
        <div className="rounded-lg p-2">
          <div className="flex items-start space-x-2 mb-2">
            <img
              src={DummyImage}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="What's happening?"
                className="w-full text-sm bg-gray-100 px-3 py-2 rounded"
                onClick={handleCreatePost}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 text-gray-600">
            <img src={VideoIcon} className="w-4 h-4" />
            <span className="text-sm">Live</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600">
            <img src={CameraIcon} className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Photo</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600">
            <img src={SmileIcon} className="w-4 h-4" />
            <span className="text-sm">Feeling</span>
          </button>
        </div>
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium"
        >
          Post
        </button>
      </div>

      {/* Gallery Post */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span>👤</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Beyond Gallery</p>
                  <p className="text-xs text-gray-500">15 • Public</p>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="aspect-video bg-gradient-to-b from-blue-100 to-blue-200 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-300"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-300 via-blue-200 to-transparent"></div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span>❤️</span>
                  <span>Like</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Comments</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xs">👤</span>
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 text-sm bg-gray-100 rounded-full px-3 py-1 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
              <FileImage className="w-4 h-4 text-gray-500" />
              <span className="text-blue-500 text-sm">📷</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events Section */}

      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Recent Event</h3>
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </div>

        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border"
            >
              <div
                className={`w-10 h-10 rounded-lg ${event.color} flex items-center justify-center flex-shrink-0`}
              >
                <Users className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{event.time}</span>
                  <div className="flex -space-x-1">
                    {event.attendees.map((attendee, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-xs">{attendee}</span>
                      </div>
                    ))}
                    {event.totalAttendees > event.attendees.length && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold">
                        +{event.totalAttendees - event.attendees.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Post */}

      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full">
                  <img
                    src={DummyImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    {post.author}
                  </h3>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() =>
                    setShowPostMenu(showPostMenu === post.id ? null : post.id)
                  }
                  className="p-1"
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
                {showPostMenu === post.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-10">
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                      Edit post
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                      Delete post
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                      Hide post
                    </button>
                    <button className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                      Report post
                    </button>
                  </div>
                )}
              </div>
            </div>

            {post.content && (
              <p className="text-gray-800 text-sm mb-3 leading-relaxed">
                {post.content}
              </p>
            )}

            {post.type === "photo" && (
              <div className="mb-3">
                <img
                  src={SmileIcon}
                  alt="Post content"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {post.type === "event" && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <img src={CalendarIcon} className="w-4 h-4" alt="Calendar" />
                  <span className="text-sm font-medium">Recent Event</span>
                </div>
                <div className="flex -space-x-2">
                  {post.attendees?.map((attendee, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"
                    >
                      <img
                        src={DummyImage}
                        alt="Attendee"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="aspect-video bg-gradient-to-b from-blue-100 to-blue-200 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-300 via-blue-200 to-transparent"></div>
            </div>

            <div className="flex items-center justify-between mt-4 border-t border-b border-gray-200 py-2">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 text-sm ${
                  likedPosts.has(post.id) ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <img
                  src={likedPosts.has(post.id) ? LikedIcon : LikeIcon}
                  className={`w-5 h-5 align-middle ${
                    likedPosts.has(post.id) ? "fill-blue-600 text-blue-600" : ""
                  }`}
                  alt="Like"
                />
                <span className="leading-none">Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 text-sm">
                <img
                  src={CommentIcon}
                  className="w-5 h-5 align-middle"
                  alt="Comment"
                />
                <span className="leading-none">Comments</span>
                {post.comments.length > 0 && (
                  <span className="text-xs leading-none">
                    ({post.comments.length})
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 text-gray-600 text-sm">
                <img
                  src={ShareIcon}
                  className="w-5 h-5 align-middle"
                  alt="Share"
                />
                <span className="leading-none">Share</span>
                {post.shares > 0 && (
                  <span className="text-xs leading-none">({post.shares})</span>
                )}
              </button>
            </div>

            {/* Comments Section - Always Visible */}
            <div className="mt-4 space-y-3">
              {/* Show first comment and its replies */}
              {post.comments.length > 0 && (
                <div className="space-y-2">
                  {post.comments.slice(0, 1).map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
                          <img
                            src={DummyImage}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                              <h4 className="font-medium text-sm text-gray-900">
                                {comment.author}
                              </h4>
                              <p className="text-sm text-gray-800">
                                {comment.content}
                              </p>
                            </div>
                            <div className="relative ml-2">
                              <button
                                onClick={() =>
                                  setShowCommentMenu(
                                    showCommentMenu ===
                                      `${post.id}-${comment.id}`
                                      ? null
                                      : `${post.id}-${comment.id}`
                                  )
                                }
                                className="p-1"
                              >
                                <MoreHorizontal className="w-3 h-3 text-gray-400" />
                              </button>
                              {showCommentMenu ===
                                `${post.id}-${comment.id}` && (
                                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-10">
                                  <button className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                                    Edit
                                  </button>
                                  <button className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                                    Delete
                                  </button>
                                  <button className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                                    Report
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>{comment.time}</span>
                            <button
                              onClick={() =>
                                handleCommentLike(post.id, comment.id)
                              }
                              className={`${
                                likedComments.has(`${post.id}-${comment.id}`)
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                            >
                              Like {comment.likes > 0 && `(${comment.likes})`}
                            </button>
                            <button
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === `${post.id}-${comment.id}`
                                    ? null
                                    : `${post.id}-${comment.id}`
                                )
                              }
                              className="text-gray-500"
                            >
                              Reply
                            </button>
                          </div>

                          {/* Show first reply if exists */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-6 mt-2 space-y-2">
                              {comment.replies.slice(0, 1).map((reply) => (
                                <div key={reply.id} className="flex gap-2">
                                  <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0">
                                    <img
                                      src={DummyImage}
                                      alt="Profile"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-gray-100 rounded-lg px-2 py-1">
                                      <h5 className="font-medium text-xs text-gray-900">
                                        {reply.author}
                                      </h5>
                                      <p className="text-xs text-gray-800">
                                        {reply.content}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                      <span>{reply.time}</span>
                                      <button className="text-gray-500">
                                        Like{" "}
                                        {reply.likes > 0 && `(${reply.likes})`}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Input */}
                          {replyingTo === `${post.id}-${comment.id}` && (
                            <div className="ml-6 mt-2 flex gap-2">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0">
                                <img
                                  src={DummyImage}
                                  alt="Profile"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Write a reply..."
                                  className="flex-1 px-3 py-1 bg-gray-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddReply(
                                        post.id,
                                        comment.id,
                                        e.target.value
                                      );
                                      e.target.value = "";
                                    }
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    // console.log(e.target.parentElement.querySelector(".input"));
                                    const input =
                                      e.target.parentElement.querySelector(
                                        "input"
                                      );
                                    handleAddReply(
                                      post.id,
                                      comment.id,
                                      input.value
                                    );
                                    input.value = "";
                                  }}
                                  className="text-blue-600"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Show more comments link */}
              {post.comments.length > 1 && !showAllComments.has(post.id) && (
                <button
                  onClick={() => toggleAllComments(post.id)}
                  className="text-gray-500 text-sm hover:text-gray-700"
                >
                  See {post.comments.length - 1} more comment
                  {post.comments.length - 1 > 1 ? "s" : ""}
                </button>
              )}

              {/* Show all comments when expanded */}
              {showAllComments.has(post.id) && post.comments.length > 1 && (
                <div className="space-y-2">
                  {post.comments.slice(1).map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
                          <img
                            src={DummyImage}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                              <h4 className="font-medium text-sm text-gray-900">
                                {comment.author}
                              </h4>
                              <p className="text-sm text-gray-800">
                                {comment.content}
                              </p>
                            </div>
                            <div className="relative ml-2">
                              <button
                                onClick={() =>
                                  setShowCommentMenu(
                                    showCommentMenu ===
                                      `${post.id}-${comment.id}`
                                      ? null
                                      : `${post.id}-${comment.id}`
                                  )
                                }
                                className="p-1"
                              >
                                <MoreHorizontal className="w-3 h-3 text-gray-400" />
                              </button>
                              {showCommentMenu ===
                                `${post.id}-${comment.id}` && (
                                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-10">
                                  <button className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                                    Edit
                                  </button>
                                  <button className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                                    Delete
                                  </button>
                                  <button className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50">
                                    Report
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span>{comment.time}</span>
                            <button
                              onClick={() =>
                                handleCommentLike(post.id, comment.id)
                              }
                              className={`${
                                likedComments.has(`${post.id}-${comment.id}`)
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                            >
                              Like {comment.likes > 0 && `(${comment.likes})`}
                            </button>
                            <button
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === `${post.id}-${comment.id}`
                                    ? null
                                    : `${post.id}-${comment.id}`
                                )
                              }
                              className="text-gray-500"
                            >
                              Reply
                            </button>
                          </div>

                          {/* All replies for expanded comments */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-6 mt-2 space-y-2">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-2">
                                  <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0">
                                    <img
                                      src={DummyImage}
                                      alt="Profile"
                                      className="w-full h-full rounded-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-gray-100 rounded-lg px-2 py-1">
                                      <h5 className="font-medium text-xs text-gray-900">
                                        {reply.author}
                                      </h5>
                                      <p className="text-xs text-gray-800">
                                        {reply.content}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                      <span>{reply.time}</span>
                                      <button className="text-gray-500">
                                        Like{" "}
                                        {reply.likes > 0 && `(${reply.likes})`}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Input */}
                          {replyingTo === `${post.id}-${comment.id}` && (
                            <div className="ml-6 mt-2 flex gap-2">
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0">
                                <img
                                  src={DummyImage}
                                  alt="Profile"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              </div>
                              <div className="flex-1 flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Write a reply..."
                                  ref={(el) =>
                                    (replyRefs.current[
                                      `${post.id}-${comment.id}`
                                    ] = el)
                                  }
                                  className="flex-1 px-3 py-1 bg-gray-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddReply(
                                        post.id,
                                        comment.id,
                                        e.target.value
                                      );
                                      e.target.value = "";
                                    }
                                  }}
                                />
                                <button
                                  onClick={(e) => {
                                    const input =
                                      replyRefs.current[
                                        `${post.id}-${comment.id}`
                                      ];
                                    if (input) {
                                      handleAddReply(
                                        post.id,
                                        comment.id,
                                        input.value
                                      );
                                      input.value = "";
                                    }
                                  }}
                                  className="text-blue-600"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => toggleAllComments(post.id)}
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    Show less
                  </button>
                </div>
              )}

              {/* Add Comment - Always Visible */}
              <div className="flex gap-3 pt-3 border-t border-gray-100">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
                  <img
                    src={DummyImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentTexts[post.id] || ""}
                    onChange={(e) =>
                      setCommentTexts({
                        ...commentTexts,
                        [post.id]: e.target.value,
                      })
                    }
                    className="flex-1 bg-transparent text-sm outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment(post.id);
                      }
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500">
                      <span className="text-sm">GIF</span>
                    </button>
                    <button className="text-gray-500">
                      <img src={ImageIcon} className="w-4 h-4" />
                    </button>
                    <button className="text-gray-500">
                      <img src={SmileIcon} className="w-4 h-4" alt="Emoji" />
                    </button>
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="text-blue-600"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BirthDaySection />

      <NavigationBar />
    </div>
  );
};

export default HomePage;
