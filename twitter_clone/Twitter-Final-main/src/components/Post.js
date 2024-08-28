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
const Post = ({ post, id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
      setAllComments(snapshot.docs);
    });
  }, [db]);
  const likePosts = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session?.user.username,
        });
      }
    } else {
      signIn();
    }
  };
  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete the post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post?.data()?.image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  };
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  return (
    <div className="flex cursor-pointer p-3 border-b border-gray-200 pr-6">
      {/*Image*/}
      <img
        width={"50"}
        height={"50"}
        className="h-11 w-11 rounded-full mr-4 hover:brightness-95"
        src={post?.data()?.userImg}
        alt="user-image"
      />
      {/* Right side */}
      <div className="flex-1">
        {/* Header */}
        <div className=" flex items-center justify-between ">
          {/*  user info*/}
          <div className="flex items-center space-x-3 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm text-[14px] sm:text-[15px] text-gray-700">
              @{post?.data()?.username}
            </span>
            <span className="text-sm text-[14px] sm:text-[15px] hover:underline text-gray-400">
              <Moment format="Do MMMM h:mma">
                {new Date(post?.data().timestamp?.seconds * 1000)}
              </Moment>
            </span>
          </div>
          {/* Icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* Post text */}
        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="text-gray-800 text-[15px] sm:text-[16px] mb-2"
        >
          {post?.data()?.text}
        </p>
        {/* Post Image */}
        <div
          onClick={() => router.push(`/posts/${id}`)}
          className="flex w-full justify-center items-center"
        >
          {post?.data()?.image && (
            <img
              onClick={() => router.push(`/posts/${id}`)}
              className="h-[100 em] w-full mx-auto rounded-2xl hover:brightness-105"
              width="10000"
              height="1000"
              src={post?.data()?.image}
            />
          )}
        </div>
        {/* icons */}
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center">
            <ChatIcon
              onClick={() => {
                if (!session) signIn();
                else {
                  setOpen(!open);
                  setPostId(id);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-sky-500 hover:bg-sky-100"
            />
            {allComments.length > 0 && (
              <span className="select-none text-sm">{allComments.length}</span>
            )}
          </div>
          {session?.user?.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePosts}
                className="h-9 w-9 hoverEffect p-2 xl:h-10 xl:w-10 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePosts}
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
