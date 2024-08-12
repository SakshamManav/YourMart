const mongoose =require("mongoose");
const mongoUri = "mongodb://localhost:27017/Shopdata";
async function connectMongo(){
    await mongoose.connect(mongoUri);
    console.log("connected successfully!");
}
module.exports = connectMongo;