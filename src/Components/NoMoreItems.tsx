import * as React from "react";
import { Paragraph } from "theme-ui";

export type NoMoreItemsProps = {
  information: string;
};

const NoMoreItems: React.FC<NoMoreItemsProps> = ({ information }) => (
  <Paragraph className="item-information">{information}</Paragraph>
);

export default NoMoreItems;
