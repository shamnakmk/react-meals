import CartContext from "./cart-context";
import React, { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (currentCartContent, action) => {
  if (action.type == "ADD") {
    const updatedTotalAmount =
      currentCartContent.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = currentCartContent.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = currentCartContent.items[existingCartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...currentCartContent.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = currentCartContent.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount:
        currentCartContent.totalAmount + action.item.amount * action.item.price,
    };
  } else if ((action.type = "REMOVE")) {
    const existingCartItemIndex = currentCartContent.items.findIndex(
      (item) => item.id === action.id
    );
    if (existingCartItemIndex === -1) {
      return currentCartContent;
    }

    const existingItem = currentCartContent.items[existingCartItemIndex];
    const updatedTotalAmount =
      currentCartContent.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = currentCartContent.items.filter(
        (item) => item.id !== action.id
      );
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...currentCartContent.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return currentCartContent;
};

const CartProvider = (props) => {
  const [cartContent, dispatchCartContent] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartContent({
      type: "ADD",
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartContent({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartContent({ type: "CLEAR" });
  };
  return (
    <CartContext.Provider
      value={{
        items: cartContent.items,
        totalAmount: cartContent.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
