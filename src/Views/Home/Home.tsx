/** @jsxImportSource theme-ui */

import React from "react";
import { Button } from "theme-ui";
import { getMovieById } from "../../Api";
import UsersList from "../../Components/UsersList";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState<IMovie | null>(null);

  React.useEffect(() => {
    getMovieById("123").then(
      (result) => {
        setMovieDetails(result);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
  }, []);

  return (
    <div>
      <div>
        <p>what we have</p>
        <p>{movieDetails && movieDetails.original_title}</p>
        <p>{movieDetails && movieDetails.homepage}</p>
      </div>
      <div
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
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <UsersList />
    </div>
  );
};

export default Home;
