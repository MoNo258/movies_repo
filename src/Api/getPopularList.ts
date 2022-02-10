import { api_key } from "../configValues";

export async function getPopularList(page?: string) {
  const pageNumber = 12;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${pageNumber}`,
      {
        method: "GET",
        headers: {
          Accept: `application/json;odata=nometadata;`,
        },
      }
    );
    if (response.status === 200) {
      return (await response.json()) as IPopularList;
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
