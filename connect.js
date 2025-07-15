const mongoose = require("mongoose");

async function connectToMongoDB(url) {
    try{
        await mongoose.connect(url);
        console.log("MongoDB connnected")
    } catch(err) {
        console.error("Mongodb connection error", err);
    }
}

module.exports = {
    connectToMongoDB,
}