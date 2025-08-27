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
import SmileIcon from "../assets/icons/Smile.svg";
import ImageIcon from "../assets/icons/Picture.svg";
import DummyImage from "../assets/Dummy_Profile.svg";



export default function PostSection({posts}) {
  return (
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

            {/* {post.images && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {post.images.map((image, index) => (
                    <img key={index} src={DummyImage} alt="Post content" className="w-full h-32 object-cover rounded-lg" />
                  ))}
                </div>
              )} */}

            {/* <div className="grid grid-cols-2 gap-2 mb-3"> */}
            <div className="aspect-video bg-gradient-to-b from-blue-100 to-blue-200 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-300 via-blue-200 to-transparent"></div>
            </div>
            {/* </div> */}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 text-sm ${
                  likedPosts.has(post.id) ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    likedPosts.has(post.id) ? "fill-blue-600 text-blue-600" : ""
                  }`}
                />
                <span>Like</span>
                {post.likes > 0 && (
                  <span className="text-xs">({post.likes})</span>
                )}
              </button>
              <button className="flex items-center gap-2 text-gray-600 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>Comments</span>
                {post.comments.length > 0 && (
                  <span className="text-xs">({post.comments.length})</span>
                )}
              </button>
              <button className="flex items-center gap-2 text-gray-600 text-sm">
                <Share className="w-4 h-4" />
                <span>Share</span>
                {post.shares > 0 && (
                  <span className="text-xs">({post.shares})</span>
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
  )
}