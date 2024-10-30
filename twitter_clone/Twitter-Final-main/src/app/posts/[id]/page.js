"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar.js";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";
import SignOutButton from "@/components/SignOutButton";
import CommentModal from "@/components/CommentModal";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { db } from "../../../../firebase";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import Post from "@/components/Post";
import Comment from "@/components/Comment";
async function getNewsArticles() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
  );
  return res.json();
}
async function getAccounts() {
  const res = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,picture,login"
  );
  return res.json();
}
export default function PostPage() {
  const [newsResults, setNewsResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const router = useRouter();
  const { id } = useParams();
  const fetchData = async () => {
    const newsData = await getNewsArticles();
    const usersData = await getAccounts();
    setNewsResults(newsData);
    setUsers(usersData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //Get the post data
  useEffect(() => {
    onSnapshot(doc(db, "posts", id), (snapshot) => {
      setPost(snapshot);
    });
  }, [db, id]);
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);
  return (
    <main className="flex min-h-screen max-w-full mx-auto">
      <Sidebar />
      <div className="xl:ml-[360px] border-l border-gray-200 border-r xl:min-w-[676px] sm:ml-[70px] flex-grow max-w-[676px] ">
        <div className=" items-center flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <div
            onClick={() => router.push("/")}
            className="hoverEffect flex items-center justify-start px-0 ml-2 w-9 h-9"
          >
            <ArrowLeftIcon className="h-5" />
          </div>
          <h2 className="xl:text-lg sm:text-xl font-bold cursor-pointer ">
            Tweet
          </h2>
        </div>
        <Post id={id} post={post} />
        {comments?.length > 0 && (
          <div className="">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Comment
                    key={comment.id}
                    commentId={comment.id}
                    originalPostId={id}
                    comment={comment.data()}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Widgets newsResults={newsResults.articles} users={users.results} />
      <SignOutButton />
      <CommentModal />
    </main>
  );
}
