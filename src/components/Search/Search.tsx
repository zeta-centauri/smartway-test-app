import { observer } from "mobx-react-lite";
import searchStore from "../../stores/search-store";
import "./Search.css";
import { useCallback, useState, useRef } from "react";
import repositoriesStore from "../../stores/repositories-store";

const useDebounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);
  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

const Search = observer(() => {
  const { setSearchValue, searchValue } = searchStore;
  const [localSearchValue, setLocalSearchValue] = useState<string>(searchValue);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = repositoriesStore.getSuggestions;

  const updateSearchValue = useDebounce(setSearchValue, 600);

  const onChangeInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalSearchValue(value);
      updateSearchValue(value);
    },
    [updateSearchValue]
  );

  const onClickSuggestion = useCallback(
    (suggestion: string) => {
      setLocalSearchValue(suggestion);
      updateSearchValue(suggestion);
    },
    [updateSearchValue]
  );

  return (
    <div className="search-wrapper">
      <input
        type="text"
        value={localSearchValue}
        onChange={(e) => onChangeInput(e)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
        placeholder="Search"
        className="search-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onMouseDown={() => onClickSuggestion(suggestion)} className="suggestion">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Search;
