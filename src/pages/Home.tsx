import React, { useCallback, useEffect, useRef } from "react";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaSkeleton from "../components/pizzaItem/PizzaSkeleton";
import PizzaBlock from "../components/pizzaItem/pizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { setCategoryId, setFilters, setPage } from "../store/slice/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../store/slice/pizzaSlice";
import { RootState, useAppDispatch } from "../store/store";

export interface TParams {
  categoryId: string;
  page: number;
  name: string;
  sort: string;
  order: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { sortType, categoryId, page } = useSelector((state: RootState) => state.filter);
  const { items, isLoading, error } = useSelector((state: RootState) => state.pizza);

  const selectedCategoryTypeHandler = useCallback(
    (id: number) => () => {
      dispatch(setPage(1));
      dispatch(setCategoryId(id));
    },
    [],
  );

  const pageChangeHandler = (page: number) => {
    dispatch(setPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `categoryId=${categoryId}` : "";
    dispatch(
      fetchPizzas({
        category,
        ...sortType,
        page,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryStrings = qs.stringify({
        order: sortType.order,
        sort: sortType.sort,
        categoryId,
        page,
      });
      navigate(`?${queryStrings}`);
    }
    isMounted.current = true;
  }, [sortType, categoryId, page, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as TParams;
      console.log("params", params);
      const sortType = sortList.find((list) => list.sort === params.sort);
      dispatch(
        setFilters({
          page: Number(params.page),
          categoryId: Number(params.categoryId),
          sortType: sortType ? sortType : sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [sortType, categoryId, page]);

  const skeleton = [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />);
  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories category={categoryId} onClickCategory={selectedCategoryTypeHandler} />
        <Sort sort={sortType}/>
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {error ? (
          <div className="content__error-info">
            <h2>Сталася помилка </h2>
            <p>Не вдалось получити піцу.Спробуйте пізніше </p>
          </div>
        ) : isLoading ? (
          skeleton
        ) : (
          pizzas
        )}
      </div>
      <Pagination page={page} onChangePage={pageChangeHandler} />
    </div>
  );
};

export default Home;
