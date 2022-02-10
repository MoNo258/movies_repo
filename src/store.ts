import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "initial value", // default value (aka initial value)
});

export const popularListResultState = atom({
  key: "popularListResultState", // unique ID (with respect to other atoms/selectors)
  default: {} as IPopularList, // default value (aka initial value)
});

export const popularListState = atom({
  key: "popularListState",
  default: [] as IMoviePopular[],
});
