import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { SortProperty } from "../../types";
import "./Sort.css";
import sortStore from "../../stores/sort-store";

const sortTypes: SortProperty[] = ["stars", "updated", "forks"];

const Sort = observer(() => {
  const [showPopup, setShowPopup] = useState(false);
  const currentSortProperty = sortStore.sortProperty;

  const sortRef = useRef<HTMLDivElement>(null);

  const handleClickProperty = (property: SortProperty) => {
    sortStore.setSortProperty(property);
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.composedPath().includes(sortRef.current!)) {
        setShowPopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div
        onClick={() => {
          setShowPopup((showPopup) => !showPopup);
        }}
        className="sort__label"
      >
        <span>By {currentSortProperty}</span>
        <img className={`arrow${showPopup ? " arrow-open" : ""}`} src="svg/down.svg" alt="" />
      </div>
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((sort, index) => (
              <li key={index} onClick={() => handleClickProperty(sort)}>
                By {sort}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
export default Sort;
