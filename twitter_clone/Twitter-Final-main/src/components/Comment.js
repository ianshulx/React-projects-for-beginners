"use client";
import {
  ChartBarIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { ChatIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import Image from "next/image";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
import { postIdState } from "../../atom/modalAtom";
import { useRouter } from "next/navigation";
const Post = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const router = useRouter;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId, commentId]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  const likeComment = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          ),
          {
            username: session?.user.username,
          }
        );
      }
    } else {
      signIn();
    }
  };
  const deleteComment = async () => {
    if (window.confirm("Are you sure you want to delete the comment?")) {
      deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  };
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  return (
    <div className="flex cursor-pointer p-3 border-b border-gray-200 pr-6 pl-20">
      {/*Image*/}
      <img
        width={"50"}
        height={"50"}
        className="h-11 w-11 rounded-full mr-4 hover:brightness-95"
        src={comment?.userImg}
        alt="user-image"
      />
      {/* Right side */}
      <div className="flex-1">
        {/* Header */}
        <div className=" flex items-center justify-between ">
          {/*  user info*/}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment?.name}
            </h4>
            <span className="text-sm text-[14px] sm:text-[15px] text-gray-700">
              @{comment?.username}
            </span>
            <span className="text-sm text-[14px] sm:text-[15px] hover:underline text-gray-400">
              <Moment format="Do MMMM h:mma">
                {new Date(comment?.timestamp?.seconds * 1000)}
              </Moment>
            </span>
          </div>
          {/* Icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* Post text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {comment?.comment}
        </p>
        {/* icons */}
        <div className="flex justify-between text-gray-500 p-2">
          {/* <div className="flex items-center">
            <ChatIcon
              onClick={() => {
                if (!session) signIn();
                else {
                  setOpen(!open);
                  setPostId(originalPostId);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-sky-500 hover:bg-sky-100"
            />
            {/* {allComments.length > 0 && (
              <span className="select-none text-sm">{allComments.length}</span>
            )} */}
          {/* </div>  */}
          {session?.user?.uid === comment?.userId && (
            <TrashIcon
              onClick={deleteComment}
              className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likeComment}
                className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likeComment}
                className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-500"} select-none text-sm`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};
export default Post;
