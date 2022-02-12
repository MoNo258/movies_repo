/** @jsxImportSource theme-ui */
import React from "react";
import { useRecoilState } from "recoil";
import { Button, Flex, Heading, Paragraph, Text } from "theme-ui";
import MoviesList from "../../Components/MoviesList";
import {
  isPopularListState,
  listsPageState,
  popularTotalPagesState,
  topRatedTotalPagesState,
} from "../../store";

const Home: React.FC = () => {
  const [isPopularList] = useRecoilState(isPopularListState);
  const [listsPage, setListsPage] = useRecoilState(listsPageState);
  const [popularTotalPages] = useRecoilState(popularTotalPagesState);
  const [topRatedTotalPages] = useRecoilState(topRatedTotalPagesState);
  const isLastPage =
    (isPopularList && listsPage === popularTotalPages) ||
    (!isPopularList && listsPage === topRatedTotalPages);

  const handleNextPage = () => {
    if (isPopularList && listsPage === popularTotalPages) {
      return;
    } else if (!isPopularList && listsPage === topRatedTotalPages) {
      return;
    } else {
      setListsPage(listsPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (listsPage === 1) {
      return;
    } else {
      setListsPage(listsPage - 1);
    }
  };

  return (
    <React.Fragment>
      <Heading as="h1">
        {isPopularList ? "Popular movies" : "Top rated movies"}
      </Heading>
      {isPopularList && (
        <Paragraph as="p">
          List of the current popular movies on TMDB (The Movie Database). This
          list updates daily.
        </Paragraph>
      )}
      {!isPopularList && (
        <Paragraph as="p">
          List of the top rated movies on (The Movie Database).
        </Paragraph>
      )}
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
      <Flex>
        <Button
          onClick={handlePrevPage}
          variant={listsPage === 1 ? "disabled" : "secondary"}
          m={2}
        >
          Previous page
        </Button>
        <Text m={2} p={2}>{`Page: ${listsPage}`}</Text>
        <Button
          onClick={handleNextPage}
          variant={isLastPage ? "disabled" : "secondary"}
          m={2}
        >
          Next page
        </Button>
      </Flex>
    </React.Fragment>
  );
};

export default Home;
