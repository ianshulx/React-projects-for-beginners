// SignOutButton.js
"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
const SignOutButton = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      {user && (
        <button
          onClick={signOut}
          className="bg-blue-400 text-white rounded-full ml- w-24 h-12 px-5  font-bold shadow-md hover:brightness-95 text-sm hidden xl:inline"
        >
          Sign Out
        </button>
      )}
    </>
  );
};
export default SignOutButton;
