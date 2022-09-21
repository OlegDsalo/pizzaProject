import React from "react";
import plus from "../../assets/img/plus.svg";
import minus from "../../assets/img/minus-sign.png";
import remove from "../../assets/img/close.png";
import { useDispatch } from "react-redux";
import { addProduct, minusPizza, removeProduct, TCartItem } from "../../store/slice/cartSlice";

interface CartItemProps {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, title, type, size, price, count, imageUrl }) => {
  const dispatch = useDispatch();

  const plusClickHandler = () => {
    dispatch(addProduct({ id } as TCartItem));
  };

  const minusClickHandler = () => {
    dispatch(minusPizza(id));
  };

  const removeClickHandler = () => {
    if (window.confirm("Ти впевнений що хочеш видалити цю піцу?")) dispatch(removeProduct(id));
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тісто, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          className="button button--outline button--circle cart__item-count-minus"
          onClick={minusClickHandler}
        >
          <img src={minus} alt="" />
        </button>
        <b>{count}</b>
        <button
          className="button button--outline button--circle cart__item-count-plus"
          onClick={plusClickHandler}
        >
          <img src={plus} alt="" />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} грн</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle" onClick={removeClickHandler}>
          <img src={remove} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
