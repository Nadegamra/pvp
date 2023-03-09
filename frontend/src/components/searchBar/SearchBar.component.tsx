import React, { useRef, useState } from "react";
import SearchIcon from "./SearchIcon.component";
import Cross from "./Cross.component";

import "./SearchBar.styles.scss";

type PropsType = {
  placeholder?: string;
};

const SearchBar = ({ placeholder = "Search…" }: PropsType) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const CONSOLES_NAME = [
    "PS5",
    "PS4",
    "XBOX S",
    "Nintendo Switch",
  ];

  const filteredConsoles = CONSOLES_NAME.filter((names) =>
    names.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="search-bar">
        <label htmlFor="search-input">
          <SearchIcon />
          <input
            id="search-input"
            ref={searchInputRef}
            name="search-input"
            className="text-t-primary"
            type="text"
            placeholder={placeholder}
            onChange={() => setSearchValue(searchInputRef.current?.value ?? "")}
          />
          <Cross
            onClick={() => {
              if (searchInputRef?.current) {
                searchInputRef.current.value = "";
                setSearchValue("");
              }
            }}
          />
        </label>
      </div>
      <div className="consoles-list">
        {filteredConsoles.map((console) => (
          <p>{console}</p>
        ))}
      </div>
    </>
  );
};

export default SearchBar;
