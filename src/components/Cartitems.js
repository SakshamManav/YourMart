import React, { useContext, useState, useEffect } from "react";
import Cartcontext from "./Context/Cartcontext";
import "./Cartitem.css"; // Import custom CSS file for styling
import Popup from "./Popup";

export default function Cartitems() {
  const {
    cartProducts,
    checkedItems,
    setCheckedItems,
    deleteProducts,
    fetchCartProducts,
  } = useContext(Cartcontext);
  const [finalPrice, setFinalPrice] = useState([]);
  const [sumFinal, setSumFinal] = useState(0);



  // Putting selected items in an array
  function handleChange(e, product) {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, product]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((key) => key.id !== product.id)
      );
    }
  }



  // Handling quantity of a item
  function handleQty(e, product) {
    setCheckedItems((prevItems) =>
      prevItems.map((key) =>
        key.id === product.id ? { ...key, qty: e.target.value } : key
      )
    );
  }


  // TO delete items from cart
  function handleDelete(id) {
    deleteProducts(id);
    fetchCartProducts();
    fetchCartProducts();
    setCheckedItems((prevItems) => prevItems.filter((key) => key.martId !== id));
  }



  // Calculating price of selected items
  function result() {
    const sum = finalPrice.reduce((acc, price) => acc + price, 0);
    setSumFinal(sum);
  }

  useEffect(() => {
    setFinalPrice(
      checkedItems.map((key) => Number(key.qty) * Number(key.price))
    );
    fetchCartProducts();
  }, [fetchCartProducts, checkedItems]);

  useEffect(() => {
    result();
  });

  return (
    <div className="container my-4" style={{ flex: "1 1 auto" }}>
      <div className="row" >
        <div className="col-lg-8 col-md-12" >
          <div className="cart-items border rounded p-3" >
            <h1 className="text-center">Shopping Cart</h1>
            <hr />
            {cartProducts.map((product) => {
              return (
                <div
                  key={product._id}
                  className="d-flex flex-column flex-md-row align-items-center mb-4 border-bottom pb-3"
                >
                  <input
                    type="checkbox"
                    className="me-3"
                    onChange={(e) => handleChange(e, product)}
                  />
                  <img
                    src={product.img}
                    className="img-fluid mb-3 mb-md-0"
                    style={{ maxWidth: "200px" }}
                    alt={product.name}
                  />
                  <div className="flex-grow-1 ms-3">
                    <h4>{product.name}</h4>
                    <p>{product.desc}</p>
                    <div className="d-flex align-items-center mb-2">
                      <label className="me-2">Quantity:</label>
                      <select
                        className="form-select"
                        id="selectedItem"
                        onChange={(e) => {handleQty(e, product); console.log(product)}}
                        defaultValue={product.qty || 1}
                      >
                        {[...Array(9).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="text-end">
                    <h4>₹ {product.price}</h4>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => {
                        handleDelete(product.martId);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
          <div className="summary border rounded p-3">
            <p className="h4">
              Subtotal ({finalPrice.length}{" "}
              {finalPrice.length === 1 ? "item" : "items"}):
            </p>
            <p className="h3 text-end">
              {sumFinal === 0 ? "No items selected" : "₹ " + sumFinal + ".00"}
            </p>
            {/* <button
              className="btn btn-primary w-100"
              onClick={result}
            >
              Proceed to buy
            </button> */}
            {checkedItems.length > 0 && (
              <div style={{ textAlign: "end" }}>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setCheckedItems([]);
                  }}
                >
                  Buy Item
                  <Popup />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
