const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectMongoDb = require("./db.js");
connectMongoDb();
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("hello");
})
app.get("/hello", (req,res)=>{
    res.send("hello again!");
})
app.use(cors());
app.use("/shop/api", require("./routes/Userauthentication.js"));
app.use("/shop/product", require("./routes/productStore.js"));
app.use("/shop/cart", require("./routes/Cartaccess.js"));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
