/** @jsxImportSource theme-ui */

import React from "react";
import { useRecoilState } from "recoil";
import { Heading, Paragraph } from "theme-ui";
import { getPopularList } from "../../Api";
import MoviesList from "../../Components/MoviesList";
import {
  popularListResultState,
  popularListState,
  textState,
} from "../../store";

const Home: React.FC = () => {
  const [text, setText] = useRecoilState(textState);
  const [popularListResult, setPopularListResult] = useRecoilState(
    popularListResultState
  );
  const [popularList, setPopularList] = useRecoilState(popularListState);
  const changeText = () => {
    console.log(text);
    setText("123");
    console.log(text);
  };
  console.log(text);

  React.useEffect(() => {
    getPopularList()
      .then((result) => {
        setPopularListResult(result);
        setPopularList(result.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("popularListResult", popularListResult);
  console.log("popularList", popularList);

  return (
    <React.Fragment>
      <Heading as="h1">Popular movies</Heading>
      <Paragraph as="body">
        List of the current popular movies on TMDB (The Movie Database). This
        list updates daily.
      </Paragraph>

      {/* <div
        sx={{
          fontWeight: "bold",
          fontSize: 4, // picks up value from `theme.fontSizes[4]`
          color: "primary", // picks up value from `theme.colors.primary`
          // applies width 100% to all viewport widths,
          // width 50% above the first breakpoint,
          // and 25% above the next breakpoint
          width: ["100%", "50%", "25%"],
          // width: [null, null, "25%"],
          // boxShadow: (theme) => `0 0 4px ${theme.colors.primary}`,
        }}
      >
        Hello Hello Hello Hello Hello Hello Hello Hello Hello
      </div>
      <Button onClick={changeText}>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button> */}
      <MoviesList />
    </React.Fragment>
  );
};

export default Home;
