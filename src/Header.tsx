import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "./filterSlice";

export const Header = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const dispatch = useDispatch();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { 
      dispatch(setFilter(inputVal.toLowerCase()));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <div className="HeaderContainer">
      <img src="./sw_logo.svg" alt="logo" className="HeaderContainer__Logo" />
      <div className="HeaderContainer__SearchBar">
        <input
          type="text"
          placeholder="Buscar"
          id="searchBar"
          autoComplete="off"
          value={inputVal}
          onChange={handleChange}  
          onKeyDown={handleKeyDown}
        />
        <img src="./searchIcon.png" alt="search icon" />
      </div>
    </div>
  );
};
