import React from "react";
import { Link } from "react-router-dom";

const cart = require("../assets/img/empty-cart.png") as string;

const EmptyCart = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пуста</h2>
      <p>
        Мабуть ви не заказали піцу.
        <br />
        Для замовлення піци, перейдіть на головну сторніку
      </p>
      <img src={cart} alt="пуста корзина " />
      <Link to="/" className="button button--black">
        <span>Повернутись назад </span>
      </Link>
    </div>
  );
};

export default EmptyCart;
