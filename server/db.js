
require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.database_URI;
const DBUri = URI.toString()
const connected = async () => {
    try {
        await mongoose.connect(DBUri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error);
    }
};

const isConnected = () => {
    return mongoose.connection.readyState === 1;
};

module.exports = {
    isConnected,
    connected
};
