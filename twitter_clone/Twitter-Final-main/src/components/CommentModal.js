"use client";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atom/modalAtom";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import Moment from "react-moment";
import { useRouter } from "next/navigation";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPosts] = useState({});
  const { data: session } = useSession();
  const user = session?.user;
  const [tweet, setTweet] = useState("");
  const router = useRouter();
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPosts(snapshot);
    });
  }, [postId, db]);
  async function sendComment() {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: tweet,
      name: session?.user?.name,
      username: session?.user?.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
      userId: session?.user?.uid,
    });
    setOpen(false);
    setTweet("");
    router.push(`/posts/${postId}`);
  }
  return (
    <>
      {open && (
        <Modal
          onRequestClose={() => setOpen(false)}
          isOpen={open}
          className="max-w-xl  w-[90%] absolute top-24 left-[48%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-9 flex items-center justify-center"
              >
                <XIcon className="h-[28px] text-gray-700" />
              </div>
            </div>
            <div className="p-2 flex space-x-2 items-center relative">
              <span className="w-0.5 h-full z-[-1] absolute left-9  top-11 bg-gray-300"></span>
              <img
                width={"50"}
                height={"50"}
                className="h-11 w-11 rounded-full mr-4 hover:brightness-95"
                src={post?.data()?.userImg}
                alt="user-image"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.data()?.name}
              </h4>
              <span className="text-sm text-[14px] sm:text-[15px] text-gray-700">
                @{post?.data()?.username}
              </span>
              <span className="text-sm text-[14px] sm:text-[15px] hover:underline text-gray-400">
                <Moment format="Do MMMM h:mma">
                  {new Date(post?.data()?.timestamp?.seconds * 1000)}
                </Moment>
              </span>
            </div>
            <p className="text-[15px] text-gray-800 sm:text-[16px] ml-[4.5rem] mb-2">
              {post?.data()?.text}
            </p>
            <div className="flex  border-b border-gray-200 p-3 space-x-3">
              <img
                src={
                  user?.image ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Profile-ICon"
                width="50"
                height="50"
                className="h-12 w-12 rounded-full cursor-pointer hover:brightness-90"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    rows="2"
                    placeholder="Tweet Your Reply..."
                    className="w-full focus:ring-0 border-none placeholder-gray-700 text-lg tracking-wide text-gray-700 min-h-[10px]  "
                    value={tweet}
                    onChange={(e) => {
                      setTweet(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <>
                    <div className="flex">
                      <div
                        className=""
                        onClick={() => {
                          filePickerRef.current.click();
                        }}
                      >
                        <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-50" />
                        {/* <input
                          type="file"
                          className="hidden"
                          ref={filePickerRef}
                          onChange={addImageToPosts}
                        /> */}
                      </div>
                      <div className="relative">
                        <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-50" />
                        {/* <Picker
                        data={data}
                        emojiSize={20}
                        emojiButtonSize={28}
                        className="absolute top-[50%]"
                      /> */}
                      </div>
                    </div>
                    <button
                      disabled={!tweet.trim()}
                      onClick={sendComment}
                      className="bg-blue-400 text-white rounded-full px-4 py-1.5  font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    >
                      Tweet
                    </button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CommentModal;
