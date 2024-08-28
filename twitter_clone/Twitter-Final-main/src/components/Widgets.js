"use client";
import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
//https://saurav.tech/NewsAPI/top-headlines/category/bussiness/in.json
const Widgets = ({ newsResults, users }) => {
  const [articleNumber, setArticleNumber] = useState(3);
  const [usersNumber, setUsersNumber] = useState(3);
  return (
    <div className="xl:w-full hidden lg:inline ml-12 xl:ml-20 xl:pl-2 space-y-5">
      <div className="w-[100%] xl:w-[80%] sticky top-0 bg-white py-1.5 z-50 ">
        <div className="flex items-center p-3 rounded-full relative">
          <SearchIcon className="h-5 z-50 text-gray-500 " />
          <input
            className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100"
            type="text"
            placeholder="Search Twitter...."
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-2xl pt-2 w-[90%] xl:w-[80%]">
        <h4 className="font-bold text-lg px-4 pt-2">{`What's Happening...`}</h4>
        <div className=" border-b-2"></div>
        <AnimatePresence>
          {newsResults?.slice(0, articleNumber).map((article) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <News key={article.title} article={article} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => {
            setArticleNumber(articleNumber + 3);
          }}
          className="text-blue-600 pl-4 pb-3 hover:text-blue-400"
        >
          Show More
        </button>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">You can Follow...</h4>
        <AnimatePresence>
          {users?.slice(0, usersNumber).map((user) => (
            <motion.div
              key={user.login.uid + user.name.first}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div
                key={user.login.uid + user.name.first}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 "
              >
                <img
                  className="rounded-full "
                  src={user.picture.thumbnail}
                  alt={user.name.first}
                  width="40"
                />
                <div className="truncate ml-4 leading-5">
                  <h4 className="text-[14px] font-bold hover:underline truncate">
                    @{user.login.username}
                  </h4>
                  <h5 className="text-[13px] truncate text-gray-500">
                    {user.name.first + " " + user.name.last}
                  </h5>
                </div>
                <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
                  Follow
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => {
            setUsersNumber(usersNumber + 3);
          }}
          className="text-blue-600 pl-4 pb-3 hover:text-blue-400"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Widgets;
