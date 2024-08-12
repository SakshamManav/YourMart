const express = require("express");
const router = express.Router();
const ShopData = require("../models/product");

router.get("/productData", async (req,res)=>{
   try{
    let product = await ShopData.find({});
    res.json({product});
   }
   catch(error){
    res.json({error});
   }
})

module.exports = router;
