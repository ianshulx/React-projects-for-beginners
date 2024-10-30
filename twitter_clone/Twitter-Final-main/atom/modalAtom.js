import { atom } from "recoil";
export const modalState = atom({
  key: "textstate", //unique Id identifier
  default: false, // initial value
});
export const postIdState = atom({
  key: "postIdState", //unique Id identifier
  default: "ad", // initial value
});
