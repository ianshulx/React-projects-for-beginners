"use client";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
import { useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
const Input = () => {
  const { data: session } = useSession();
  // console.log(session);
  const [tweet, setTweet] = useState("");
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [emoji, setEmoji] = useState(false);
  const user = session ? session.user : null;

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: tweet,
      userImg: session.user?.image,
      timestamp: serverTimestamp(),
      name: session.user?.name,
      username: session.user?.username,
      // image: null,
    });
    if (selectedFile) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setTweet("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPosts = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result);
      };
    }
  };

  return (
    <>
      {user && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
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
                placeholder="What's happening?"
                className="w-full focus:ring-0 border-none placeholder-gray-700 text-lg tracking-wide text-gray-700 min-h-[10px]  "
                value={tweet}
                onChange={(e) => {
                  setTweet(e.target.value);
                }}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative py-5">
                <XIcon
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                  className="h-8  border-[3px] m-1 text-black font-bold rounded-full absolute cursor-pointer border-white"
                />
                <img
                  src={selectedFile}
                  alt="post-image"
                  className={`${loading && "animate-pulse"} h-72 `}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => {
                        filePickerRef.current.click();
                      }}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-50" />
                      <input
                        type="file"
                        className="hidden"
                        ref={filePickerRef}
                        onChange={addImageToPosts}
                      />
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
                    onClick={sendPost}
                    className="bg-blue-400 text-white rounded-full px-4 py-1.5  font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* {emoji && (
        <div className="relative">
          <Picker
            data={data}
            emojiSize={20}
            emojiButtonSize={28}
            className="absolute left-[50%]"
          />
        </div>
      )} */}
    </>
  );
};

export default Input;
