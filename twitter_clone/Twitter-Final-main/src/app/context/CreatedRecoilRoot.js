"use client";
import { RecoilRoot } from "recoil";
export default function CreatedRecoilRoot({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
