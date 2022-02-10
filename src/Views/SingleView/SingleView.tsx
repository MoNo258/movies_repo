/** @jsxImportSource theme-ui */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Paragraph,
  Spinner,
  Text,
} from "theme-ui";
import { getMovieById } from "../../Api";

const SingleView: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [movieDetails, setMovieDetails] = React.useState<IMovie | null>(null);
  const id = window.location.pathname.slice(1);

  React.useEffect(() => {
    getMovieById(id)
      .then((result) => {
        setMovieDetails(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  const LoadingCard: React.FC = () => (
    <Box margin={"0 auto"}>
      <Spinner />
      <Divider />
      <Heading as="h5">Original title</Heading>
      <Spinner />
      <Divider />
      <Heading as="h5">Overview</Heading>
      <Spinner />
      <Divider />
      <Heading as="h5">Tagline</Heading>
      <Spinner />
      <Divider />
      <Heading as="h5">Popularity</Heading>
      <Spinner />
    </Box>
  );

  return (
    <Flex style={{ flexDirection: "column", width: "80vw", margin: "auto" }}>
      <Button onClick={() => navigate(-1)} style={{ width: "110px" }} my={2}>
        Back to list
      </Button>
      <Card>
        {isLoading ? (
          <LoadingCard />
        ) : (
          <React.Fragment>
            {/* <Image src={movieDetails?.poster_path} /> */}
            <Heading as="h2">{movieDetails?.title}</Heading>
            <Heading as="h4">{`Score: ${movieDetails?.vote_average} (votes: ${movieDetails?.vote_count})`}</Heading>
            <Divider />
            <Text>Status: {movieDetails?.status}</Text>
            <br />
            <Text>Homepage: {movieDetails?.homepage}</Text>
            <Divider />
            <Heading as="h5">Original title</Heading>
            <Text>{movieDetails?.original_title}</Text>
            <Divider />
            <Heading as="h5">Overview</Heading>
            <Paragraph>{movieDetails?.overview}</Paragraph>
            <Divider />
            <Heading as="h5">Tagline</Heading>
            <Text>{movieDetails?.tagline}</Text>
            <Divider />
            <Heading as="h5">Popularity</Heading>
            <Text>{movieDetails?.popularity}</Text>
          </React.Fragment>
        )}
      </Card>
    </Flex>
  );
};

export default SingleView;
