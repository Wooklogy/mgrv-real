import { atom } from "recoil";

// 화면 리사이즈 (반응형)
export const resizeState = atom<number>({
  key: `resize/${Math.random()}`,
  default: 0,
});

// 스크롤 Y (반응형)
export const scrollState = atom<number>({
  key: `scroll/${Math.random()}`,
  default: 0,
});
