import React, { useContext, useEffect } from "react";
import Cartcontext from "./Context/Cartcontext";
import Alert from "./Alert";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Martitems() {
  const location = useLocation();
  const navigate = useNavigate();
  const martProducts = useContext(Cartcontext);
  const {
    products,
    cartProducts,
    alertMsg,
    setAlertMsg,
    showAlert,
    setShowAlert,
    fetchProducts,
    setCheckedItems,
    addProductToCart,
    fetchCartProducts,
    deleteProducts,
  } = martProducts;

  function handleCartBtn(e, id1, name1, img1, desc1, price1) {
    let token = localStorage.getItem("authToken");
    
    if(token){
      alertTimer();
      if (e.target.textContent === "Add to cart") {
        addProductToCart(name1, id1, img1, desc1, price1);
        setAlertMsg({ msg: "Item Added to cart successfully!", type: "success" });
        fetchCartProducts();
        fetchCartProducts();
      } else {
        deleteProducts(id1); 
        setAlertMsg({
          msg: "Item removed from cart successfully!",
          type: "danger",
        });
        fetchCartProducts();
        fetchCartProducts();
      }
    }
    else{
      navigate("/login");
     
    }
   
  }

  function alertTimer() {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  }

  const getButtonText = (id) => {
    return cartProducts.some((cartproduct) => cartproduct.martId === id)
      ? "Remove from cart"
      : "Add to cart";
  };

  function getColor(id) {
    return cartProducts.some((cartproduct) => cartproduct.martId === id)
      ? "danger"
      : "primary";
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setCheckedItems([]);
    }
    fetchProducts();
  }, [cartProducts]);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <>
      {showAlert && <Alert message={alertMsg.msg} type={alertMsg.type} />}
      <div className="d-flex flex-wrap mx-5" style={{ marginTop: "40px", }}>
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="card my-4 mx-3"
              style={{
                width: "15rem",
                display: "flex",
                flexDirection: "column",
                backgroundColor:""
              }}
            >
              <img
                src={`${product.productImg}`}
                className="card-img-top"
                alt="..."
              />
              <div
                className="card-body d-flex flex-column"
                style={{ flex: "1 1 auto" }}
              >
                <h3 className="name" id="name">
                  {product.productName}
                </h3>
                <h6 className="description" id="desc">
                  {product.productDesc}
                </h6>
                <div className="mt-auto">
                  <h4 className="price" id="price">
                    ₹ {product.productPrice}
                  </h4>
                  <button
                    className={`btn btn-${getColor(product._id)}`}
                    onClick={(e) => {
                      handleCartBtn(
                        e,
                        product._id,
                        product.productName,
                        product.productImg,
                        product.productDesc,
                        product.productPrice
                      );
                    }}
                  >
                    {getButtonText(product._id)}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
