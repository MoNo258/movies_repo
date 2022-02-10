import * as React from "react";
import { Box, Button, Flex, Heading, Text } from "theme-ui";

export type ListItemProps = {
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  id: string;
  showMovie: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
};

const ListItem: React.FC<ListItemProps> = ({
  title,
  vote_average,
  vote_count,
  overview,
  id,
  showMovie,
}) => {
  return (
    <Flex marginY={10} bg="tertiary">
      <Box p={2} sx={{ flex: "1 1 auto" }}>
        <Heading as="h4">{title}</Heading>
        <Heading as="h5">{`Score: ${vote_average} (${vote_count})`}</Heading>
        <Text>{`${overview.substring(0, 100)}...`}</Text>
      </Box>
      <Box
        p={2}
        m="auto 0"
        // bg="muted"
      >
        <Button
          mr={2}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            showMovie(e, id)
          }
        >
          see details
        </Button>
      </Box>
    </Flex>
  );
};

export default ListItem;
