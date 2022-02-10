import { api_key } from "../configValues";

export async function getMovieById(id: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`,
      {
        method: "GET",
        headers: {
          Accept: `application/json;odata=nometadata;`,
        },
      }
    );
    if (response.status === 200) {
      return (await response.json()) as IMovie;
    } else {
      throw Error(`${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
