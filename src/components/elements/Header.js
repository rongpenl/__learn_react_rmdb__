import React from "react";
import RMDBLogo from "../images/reactMovie_logo.png";
import TMDBLogo from "../images/tmdb_logo.svg";
import { Link } from "@reach/router";
import {
  StyledHeader,
  StyledRMDBLogo,
  StyledTMDBLogo
} from "../styles/StyledHeader";
//

// 1. created basic styled components
// 2. handle props with styled components
// 3. create global style with styled components
//  use only functional component and use redux to keep track of status

const Header = () => (
  <StyledHeader>
    <div className="header-content">
      <Link to="/">
        <StyledRMDBLogo src={RMDBLogo} alt="rmdb-logo" />
        <StyledTMDBLogo src={TMDBLogo} alt="tmdb-logo" />
      </Link>
    </div>
  </StyledHeader>
);

export default Header;
