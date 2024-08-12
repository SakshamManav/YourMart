const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    name:String,
    martId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shopdata"
    },
    img:String,
    price:String,
    desc:String,
    qty:{
        type:Number,
        default:1,
    },
    usersId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
})
module.exports = mongoose.model("cart", cartSchema);