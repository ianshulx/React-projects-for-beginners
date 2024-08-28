"use client";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn } from "next-auth/react";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import SidebarMenuItem from "./SidebarMenuItem";
const Sidebar = () => {
  const { data: session } = useSession();

  const user = session ? session.user : null;
  return (
    <div className="hidden sm:flex ml-10 flex-col p-2 xl:items-start fixed h-full ">
      {/* LOGO*/}
      <div className="">
        <Image
          width="50"
          height="50"
          className={"hoverEffect p-0 hover:bg-blue-100 xl:px-1"}
          src={
            "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          }
          alt="twitter logo"
          priority
        ></Image>
      </div>
      {/* {Menu} */}
      <div className="mt-4 mb-2.5 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {user && (
          <>
            <SidebarMenuItem text="Notification" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {/* Button */}
      {user ? (
        <>
          <div>
            <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
              Tweet
            </button>

            {/* Mini-Profile */}
            <div className="my-[3em]">
              <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start">
                <img
                  width={"50"}
                  height={"50"}
                  src={
                    user?.image ||
                    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  alt="user-image"
                  className="h-10 w-10 rounded-full xl:mr-2"
                />
                <div className="leading-5 hidden xl:inline">
                  <h4 className="font-bold">{user.name}</h4>
                  <p className="text-gray-500">@{session.user.username}</p>
                </div>

                <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Sidebar;
