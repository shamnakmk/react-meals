import Header from "./components/Layout/Header";
import React, { useState } from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Carts/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShown, setCartIsSHown] = useState(false);

  const showCartHandler = () => {
    setCartIsSHown(true);
  };
  const hideCartHandler = () => {
    setCartIsSHown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
