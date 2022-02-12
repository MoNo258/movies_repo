import { atom, selector } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "initial value", // default value (aka initial value)
});

export const popularListResultState = atom({
  key: "popularListResultState", // unique ID (with respect to other atoms/selectors)
  default: {} as IMoviesList, // default value (aka initial value)
});

export const popularListState = atom({
  key: "popularListState",
  default: [] as IMovieShort[],
});

export const topRatedListState = atom({
  key: "topRatedListState",
  default: [] as IMovieShort[],
});

export const isPopularListState = atom({
  key: "isPopularListState",
  default: true as boolean,
});

export const popularListLoaderState = atom({
  key: "popularListLoaderState",
  default: true as boolean,
});

export const topRatedListLoaderState = atom({
  key: "topRatedListLoaderState",
  default: true as boolean,
});

export const listsPageState = atom({
  key: "listsPageState",
  default: 1 as number,
});

export const popularTotalPagesState = atom({
  key: "popularTotalPagesState",
  default: 0 as number,
});

export const topRatedTotalPagesState = atom({
  key: "topRatedTotalPagesState",
  default: 0 as number,
});

const emptyMovieByIdBasic = {
  id: 0,
  overview: "",
  title: "",
  vote_average: 0,
  vote_count: 0,
};
export const movieByIdBasicState = atom({
  key: "movieByIdBasicState",
  default: emptyMovieByIdBasic as IMovieBasic,
});

export const toWatchListState = atom({
  key: "toWatchListState",
  default: [] as IMovieBasic[],
});

export const favoritesListState = atom({
  key: "favoritesListState",
  default: [] as IMovieBasic[],
});

export const getByIdState = selector({
  key: "getByIdState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const result = get(movieByIdBasicState);

    return result;
  },
});
