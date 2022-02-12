import React from "react";
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { Button } from "theme-ui";
import { getMovieById, getPopularList, getTopRated } from "../Api";
import {
  favoritesListState,
  isPopularListState,
  listsPageState,
  movieByIdBasicState,
  popularListLoaderState,
  popularListState,
  popularTotalPagesState,
  topRatedListLoaderState,
  topRatedListState,
  topRatedTotalPagesState,
  toWatchListState,
} from "../store";
import ListItem from "./ListItem";
import NoMoreItems from "./NoMoreItems";

const MoviesList: React.FC = () => {
  const navigate = useNavigate();
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
  const [movieByIdBasic, setMovieByIdBasic] =
    useRecoilState(movieByIdBasicState);
  const [toWatchList, setToWatchList] = useRecoilState(toWatchListState);
  const [favoritesList, setFavoritesList] = useRecoilState(favoritesListState);

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

  // React.useEffect(() => {
  //   movieId &&
  //     getMovieById(movieId.toString())
  //       .then((result) => {
  //         setMovieByIdBasic(result);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // }, [movieId]);
  const showMovie = (id: string) => {
    navigate(`/${id}`);
  };
  const checkIfAddMovie = (
    listToAdd: IMovieBasic[],
    setter: SetterOrUpdater<IMovieBasic[]>
  ) => {
    console.log("listToAdd", listToAdd);
    console.log("setter", setter);
    console.log("movieByIdBasic", movieByIdBasic);

    if (JSON.stringify(listToAdd).includes(JSON.stringify(movieByIdBasic.id))) {
      return;
    } else {
      setter(() => [...listToAdd, movieByIdBasic]);
    }
  };
  const addToWatch = async (id: string) => {
    await getMovieById(id)
      .then((result) => {
        setMovieByIdBasic(() => ({
          ...result,
        }));
      })
      .then(() => {
        setToWatchList(() => [...toWatchList, movieByIdBasic]);
      })
      .catch((error) => {
        console.log(error);
      });
    // const result = await getMovieById(id);
    // setMovieByIdBasic(() => ({
    //   ...result,
    // }));
    // await checkIfAddMovie(toWatchList, setToWatchList);
  };
  const addToFavorites = async (id: string) => {
    const result = await getMovieById(id);
    setMovieByIdBasic(() => ({
      ...result,
    }));
    checkIfAddMovie(favoritesList, setFavoritesList);
  };

  const handleListChange = () => {
    setListsPage(1);
    setIsPopularList(!isPopularList);
  };
  const handleCheckFavorites = () => {
    navigate(`/list?name=favorites`);
  };
  const handleCheckToWatch = () => {
    navigate(`/list?name=towatch`);
  };

  return (
    <div>
      <Button onClick={handleListChange} mr={1}>
        change the list
      </Button>
      <Button onClick={handleCheckFavorites} mr={1}>
        check favorites
      </Button>
      <Button onClick={handleCheckToWatch}>check movies to watch</Button>
      {noMovies ? (
        <NoMoreItems information="There are no movies on this list, try another option..." />
      ) : (
        <React.Fragment>
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
                  showMovie={() => showMovie(movie.id.toString())}
                  addToWatch={() => addToWatch(movie.id.toString())}
                  addToFavorites={() => addToFavorites(movie.id.toString())}
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
                  showMovie={() => showMovie(movie.id.toString())}
                  addToWatch={() => addToWatch(movie.id.toString())}
                  addToFavorites={() => addToFavorites(movie.id.toString())}
                />
              );
            })}
        </React.Fragment>
      )}
    </div>
  );
};

export default MoviesList;
