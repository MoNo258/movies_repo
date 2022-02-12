import * as React from "react";
import { Box, Button, Flex, Heading, Text } from "theme-ui";

export type ListItemProps = {
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  id: string;
  showMovie: (id: string) => void;
  addToWatch?: (id: string) => void;
  addToFavorites?: (id: string) => void;
};

const ListItem: React.FC<ListItemProps> = ({
  title,
  vote_average,
  vote_count,
  overview,
  id,
  showMovie,
  addToWatch,
  addToFavorites,
}) => {
  return (
    <Flex marginY={10} bg="tertiary">
      <Box p={2} sx={{ flex: "1 1 auto" }}>
        <Heading as="h4">{title}</Heading>
        <Heading as="h5">{`Score: ${vote_average} (${vote_count})`}</Heading>
        <Text>{`${overview.substring(0, 80)}...`}</Text>
      </Box>
      <Box
        p={2}
        m="auto 0"
        // bg="muted"
      >
        <Flex marginY={10} bg="tertiary">
          <Button
            mr={1}
            p={1}
            onClick={() => showMovie(id)}
            variant="secondary"
          >
            see details
          </Button>
          {addToWatch && (
            <Button mr={1} p={1} onClick={() => addToWatch(id)}>
              to watch
            </Button>
          )}
          {addToFavorites && (
            <Button mr={1} p={1} onClick={() => addToFavorites(id)}>
              favorites
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ListItem;
