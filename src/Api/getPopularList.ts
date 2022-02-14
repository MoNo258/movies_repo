// import { api_key } from "../configValues";

export async function getPopularList(page: number) {
  const key = process.env.api_key;
  // const key = process.env.api_key || api_key;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: `application/json;odata=nometadata;`,
        },
      }
    );
    if (response.status === 200) {
      return (await response.json()) as IMoviesList;
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
