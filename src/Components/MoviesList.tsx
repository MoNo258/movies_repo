import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "theme-ui";
import { getPopularList, getTopRated } from "../Api";
import {
  isPopularListState,
  listsPageState,
  popularListLoaderState,
  popularListState,
  popularTotalPagesState,
  topRatedListLoaderState,
  topRatedListState,
  topRatedTotalPagesState,
} from "../store";
import ListItem from "./ListItem";
import NoMoreItems from "./NoMoreItems";

const MoviesList: React.FC = () => {
  const navigate = useNavigate();
  const [isAll, setIsAll] = React.useState(false);
  const [noMovies, setNoMovies] = React.useState(false);
  const [popularList, setPopularList] = useRecoilState(popularListState);
  const [topRatedList, setTopRatedList] = useRecoilState(topRatedListState);
  const [isPopularList, setIsPopularList] = useRecoilState(isPopularListState);
  const [popularListLoader, setPopularListLoader] = useRecoilState(
    popularListLoaderState
  );
  const [topRatedListLoader, setTopRatedListLoader] = useRecoilState(
    topRatedListLoaderState
  );
  const [listsPage, setListsPage] = useRecoilState(listsPageState);
  const [popularTotalPages, setPopularTotalPages] = useRecoilState(
    popularTotalPagesState
  );
  const [topRatedTotalPages, setTopRatedTotalPages] = useRecoilState(
    topRatedTotalPagesState
  );

  React.useEffect(() => {
    getPopularList(listsPage)
      .then((data) => {
        setPopularList(data.results);
        setPopularTotalPages(data.total_pages);
        setPopularListLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setPopularListLoader(false);
      });
    getTopRated(listsPage)
      .then((data) => {
        setTopRatedList(data.results);
        setTopRatedTotalPages(data.total_pages);
        setTopRatedListLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setTopRatedListLoader(false);
      });
  }, [listsPage]);

  React.useEffect(() => {
    popularList?.length === 0 || !popularList[0]
      ? setNoMovies(true)
      : setNoMovies(false);
  }, [popularList]);

  const showMovie = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    navigate(`/${id}`);
  };

  const handleListChange = () => {
    setListsPage(1);
    setIsPopularList(!isPopularList);
  };

  return (
    <div>
      {noMovies ? (
        <NoMoreItems information="There are no movies! Let's add something..." />
      ) : (
        <React.Fragment>
          <Button onClick={handleListChange}>change the list</Button>

          {isPopularList &&
            popularList &&
            popularList.map((movie: IMovieShort) => {
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
            })}
          {!isPopularList &&
            topRatedList &&
            topRatedList.map((movie: IMovieShort) => {
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
            })}
        </React.Fragment>
      )}
      {isAll && <NoMoreItems information="Yay! You have seen it all!" />}
    </div>
  );
};

export default MoviesList;
