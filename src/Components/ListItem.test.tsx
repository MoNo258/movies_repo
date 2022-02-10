import { render, screen } from "@testing-library/react";
import React from "react";
import ListItem from "./ListItem";

describe("ListItem", () => {
  const TestedComponent = () => (
    <ListItem
      title="Batman"
      vote_average={8.88}
      vote_count={888}
      overview="Sed nec venenatis felis. Aenean efficitur et massa auctor auctor."
      id="ckq4zb7p600c50984ew55i0jg"
      showMovie={jest.fn()}
    />
  );

  test("renders with user data", () => {
    render(<TestedComponent />);
    screen.debug();
    expect(screen.getByText(/User Batman/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Sed nec venenatis felis. Aenean efficitur et massa auctor auctor./i
      )
    ).toBeInTheDocument();
  });
  test("match snapshot", () => {
    render(<TestedComponent />);
    expect(screen).toMatchSnapshot();
  });
});
