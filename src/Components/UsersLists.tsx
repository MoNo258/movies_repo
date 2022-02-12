import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button, Heading } from "theme-ui";
import { getMovieById } from "../Api";
import {
  favoritesListState,
  movieByIdBasicState,
  toWatchListState,
} from "../store";
import ListItem from "./ListItem";
import NoMoreItems from "./NoMoreItems";

const UsersLists: React.FC = () => {
  const navigate = useNavigate();
  const [movieByIdBasic, setMovieByIdBasic] =
    useRecoilState(movieByIdBasicState);
  const [toWatchList, setToWatchList] = useRecoilState(toWatchListState);
  const [favoritesList, setFavoritesList] = useRecoilState(favoritesListState);
  const [movieId, setMovieId] = React.useState<number | null>(null);
  const searchParam = window.location.search.slice(6);
  const noMovies =
    searchParam === "favorites"
      ? favoritesList.length === 0
      : toWatchList.length === 0;
  // const [noMovies, setNoMovies] = React.useState(false);

  console.log("movieByIdBasic", movieByIdBasic);
  console.log("toWatchList", toWatchList);
  console.log("favoritesList", favoritesList);
  console.log("movieId", movieId);

  React.useEffect(() => {
    movieId &&
      getMovieById(movieId.toString())
        .then((result) => {
          setMovieByIdBasic(result);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [movieId]);

  const showMovie = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      <Heading as="h1">
        {searchParam === "favorites"
          ? "Your favorites movies"
          : "Movies you want to watch"}
      </Heading>
      <Button onClick={() => navigate("/")}>back to homepage</Button>
      {noMovies ? (
        <NoMoreItems information="There are no movies! you need to first add something..." />
      ) : (
        <React.Fragment>
          {searchParam === "towatch" &&
            toWatchList &&
            toWatchList.map((movie: IMovieBasic) => {
              return (
                <ListItem
                  key={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                  overview={movie.overview}
                  id={movie.id.toString()}
                  showMovie={() => showMovie(movie.id.toString())}
                />
              );
            })}
          {searchParam === "favorites" &&
            favoritesList &&
            favoritesList.map((movie: IMovieBasic) => {
              return (
                <ListItem
                  key={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  vote_count={movie.vote_count}
                  overview={movie.overview}
                  id={movie.id.toString()}
                  showMovie={() => showMovie(movie.id.toString())}
                />
              );
            })}
        </React.Fragment>
      )}
    </div>
  );
};

export default UsersLists;
