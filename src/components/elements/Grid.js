import React from "react";
import PropTypes from 'prop-types';
import { StyledGrid, StyledGridContent } from "../styles/StyledGrid";

const Grid = ({ header, children }) => (
  // children is already a list of moviethumb after mapping
  <StyledGrid>
    <h1>{header}</h1>
    <StyledGridContent>{children}</StyledGridContent>
  </StyledGrid>
);

Grid.PropType = {
  header: PropTypes.string,
}

export default Grid;
