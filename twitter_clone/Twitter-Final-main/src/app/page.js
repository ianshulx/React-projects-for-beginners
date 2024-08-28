import Image from "next/image";
import Sidebar from "@/components/Sidebar.js";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

import SignOutButton from "@/components/SignOutButton";
import CommentModal from "@/components/CommentModal";

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
export default async function Home() {
  const newsResults = await getNewsArticles();
  const users = await getAccounts();
  return (
    <main className="flex min-h-screen max-w-full mx-auto">
      <Sidebar />
      <Feed />
      <Widgets newsResults={newsResults.articles} users={users.results} />
      <SignOutButton />
      <CommentModal />
    </main>
  );
}
