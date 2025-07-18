// This file holds the details for the search bar used in the website

import React from "react";

const SearchBar = ({ query, setQuery }) => (
  <input
    type="text"
    placeholder="Search"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={{ margin: "10px", padding: "12px", width: "300px", fontSize: "1em", borderRadius: "6px", paddingLeft: "10px" }}
  />
);

export default SearchBar;
