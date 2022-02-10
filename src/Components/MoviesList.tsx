import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { popularListState } from "../store";
import ListItem from "./ListItem";
import NoMoreItems from "./NoMoreItems";

const MoviesList: React.FC = () => {
  const navigate = useNavigate();
  const [isAll, setIsAll] = React.useState(false);
  const [noMovies, setNoMovies] = React.useState(false);
  const popularList = useRecoilState(popularListState);

  React.useEffect(() => {
    popularList[0]?.length === 0 || !popularList[0]
      ? setNoMovies(true)
      : setNoMovies(false);
  }, [popularList]);

  const showMovie = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    navigate(`/${id}`);
  };

  return (
    <div>
      {noMovies ? (
        <NoMoreItems information="There are no movies! Let's add something..." />
      ) : (
        popularList &&
        popularList[0].map((movie: IMoviePopular) => {
          return (
            <ListItem
              key={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              overview={movie.overview}
              id={movie.id.toString()}
              showMovie={(e) => showMovie(e, movie.id.toString())}
            />
          );
        })
      )}
      {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
    </div>
  );
};

export default MoviesList;
