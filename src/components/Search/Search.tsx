import React, { useCallback, useContext, useRef, useState } from "react";
import "./Search.scss";
import { InputContext } from "../../context /context";
import debounce from "lodash.debounce";

const Search = () => {
  const { valueChangeHandler } = useContext(InputContext);
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setInput(event.target.value);
    debounceInput(event.target.value);
  };

  const debounceInput = useCallback(
    debounce((str: string) => {
      valueChangeHandler(str);
      console.log(str);
    }, 1000),
    [],
  );

  const onClearClick = () => {
    setInput("");
    valueChangeHandler("");
    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <img
        className="search-img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
        alt=""
      />
      <input
        className="search-input"
        ref={inputRef}
        value={input}
        onChange={inputChangeHandler}
        placeholder="пошук піци"
      />
      {input && (
        <img
          onClick={onClearClick}
          className="clear-icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYtGN44i9EWzpahew_M98L5eYWsiAAEXTqWw&usqp=CAU"
          alt="clear"
        />
      )}
    </div>
  );
};

export default Search;
