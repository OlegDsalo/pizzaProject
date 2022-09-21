import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/img/grey-arrow-left.svg";
import trash from "../assets/img/trash.svg";
import CartItem from "../components/Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCart } from "../store/slice/cartSlice";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce((sum:number, item:any) => sum + item.count, 0);

  const clearCartHandler = () => {
    if (window.confirm("Ти впевнений що хочеш очистити корзину ?")) {
      dispatch(clearCart());
    }
  };
  if (items.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">Корзина</h2>
          <div className="cart__clear" onClick={clearCartHandler}>
            <img src={trash} alt="" />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((pizza:any) => (
            <CartItem key={pizza.id} {...pizza} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount}</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice}</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <img src={arrow} alt="arrow" />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
