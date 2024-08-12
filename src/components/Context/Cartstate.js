import React, { useState } from "react";
// import { faker } from "https://esm.sh/@faker-js/faker";
import Cartcontext from "./Cartcontext";

export default function Cartstate(props) {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [ids, setIds] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [alertMsg, setAlertMsg] = useState({ msg: "", type: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [loggedin, setLoggedin] = useState(false);

  const [userInfo, setUserInfo] =useState({
    name:"",
    email:"",
  })
  // fetching all products of mart
  async function fetchProducts() {
    const response = await fetch(
      "http://localhost:3000/shop/product/productData",
      {
        method: "GET",
      }
    );
    const allProducts = await response.json();
    setProducts(allProducts.product);
  }

  // Adding products to cart

  async function addProductToCart(name, id, img, desc, price, qty) {
    const token = localStorage.getItem("authToken");
    if (token) {
      const response = await fetch(
        "http://localhost:3000/shop/cart/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            name: name,
            martId: id,
            img: img,
            price: price,
            desc: desc,
            qty: qty,
          }),
        }
      );
      await response.json();
    } else {
      console.log("login first");
    }
  }

  // Get products of cart from database
  async function fetchCartProducts() {
    const token = localStorage.getItem("authToken");
    if (token) {
      let response = await fetch(
        "http://localhost:3000/shop/cart/getproducts",
        {
          headers: {
            authToken: localStorage.getItem("authToken"),
          },
        }
      );
      const respo = await response.json();
      setCartProducts(respo.products);
    } else {
      console.log("login first");
    }
  }

  // To delete products from cart

  async function deleteProducts(martId) {
    const token = localStorage.getItem("authToken");
    if (token) {
      let response = await fetch(
        "http://localhost:3000/shop/cart/deleteproducts",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authToken: localStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            martId: martId,
          }),
        }
      );
      await response.json();
    } else {
      console.log("login first");
    }
  }

  // erasing everything after logout

  function logout() {
    localStorage.removeItem("authToken");
    setCartProducts([]);
  }


  // GGET USER
  async function fetchUser(){
    const response = await fetch("http://localhost:3000/shop/api/userinfo",{
      method:"GET",
      headers:{
        authToken:localStorage.getItem("authToken"),
      }
    })
    const respo = await response.json();
    console.log(respo.User);
    setUserInfo({
      name:respo.User.name,
      email:respo.User.email,
    })
  }
  return (
    <Cartcontext.Provider
      value={{
        products,
        cartProducts,
        setCartProducts,
        ids,
        setIds,
        checkedItems,
        setCheckedItems,
        alertMsg,
        setAlertMsg,
        showAlert,
        setShowAlert,
        fetchProducts,
        addProductToCart,
        fetchCartProducts,
        deleteProducts,
        loggedin,
        setLoggedin,
        fetchUser,
        userInfo,
        logout,
      }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
}
