const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/Cart");

// Adding items to cart
router.post("/addproduct", fetchuser, async (req, res) => {
  try {
    const cart = await new Cart({
      name: req.body.name,
      martId: req.body.martId,
      img: req.body.img,
      price: req.body.price,
      desc: req.body.desc,
      qty: req.body.qty,
      usersId: req.userId,
    });
    await cart.save();
    res.json({ cart });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Accessing items from cart of respected user
router.get("/getproducts", fetchuser, async (req, res) => {
  try {
    const User = req.userId;
    const products = await Cart.find({ usersId: User });
    res.json({ products });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

// Deleting items from cart

router.delete("/deleteproducts", fetchuser, async (req, res) => {
  try {
    // const productId = req.body.id;
    const martId = req.body.martId;
    const User = req.userId;
    let productsCheck = await Cart.find({usersId:User, martId:martId });
    
    for(let obj of productsCheck){
      let deletedProd = await Cart.findByIdAndDelete(obj._id.toString());
      res.json({deletedProd});
    }
    
  } catch (error) {
    console.log(error);
    res.status(404).json({error});
  }
});

module.exports = router;
