import React, { MouseEventHandler } from "react";

interface CategoriesProps {
  category: number;
  onClickCategory: (id: number) => MouseEventHandler<HTMLLIElement>;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ category, onClickCategory }) => {
  const dummyCategories = [
    {
      title: "всі",
      id: 0,
    },
    {
      title: "мясна",
      id: 1,
    },
    {
      title: "вегетеріанська",
      id: 2,
    },
    {
      title: "гриль",
      id: 3,
    },
    {
      title: "гостра",
      id: 4,
    },
    {
      title: "гриль",
      id: 5,
    },
  ];
  return (
    <div className="categories">
      <ul>
        {dummyCategories.map((categories) => (
          <li
            key={categories.id}
            onClick={onClickCategory(categories.id)}
            className={category === categories.id ? "active" : ""}
          >
            {categories.title}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
