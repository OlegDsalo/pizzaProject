import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSortType } from "../store/slice/filterSlice";

interface sortItem {
  name: string;
  sort: string;
  order: string;
}

export const sortList: sortItem[] = [
  { name: "популярність(asc)", sort: "rating", order: "asc" },
  { name: "популярність(desc)", sort: "rating", order: "desc" },
  { name: "ціні(asc)", sort: "price", order: "asc" },
  { name: "ціні(desc)", sort: "price", order: "desc" },
  { name: "алфавіту(asc)", sort: "title", order: "asc" },
  { name: "алфавіту(desc)", sort: "title", order: "desc" },
];

const Sort = React.memo(({sort}:any) => {
  const dispatch = useDispatch();
  // const sort = useSelector((state: any) => state.filter.sortType);

  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const closeSortHandler = (obj: sortItem) => () => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  const sortPopupHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={sortPopupHandler}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                key={obj.name}
                onClick={closeSortHandler(obj)}
                className={sort.name === obj.name ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
