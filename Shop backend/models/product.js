const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:String,
    productDesc:String,
    productPrice:String,
    productImg:String,
});
module.exports = mongoose.model("shopdata", productSchema);
