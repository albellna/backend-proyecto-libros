const mongoose = require("mongoose");

const Libro = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    subtitle: String,
    author: String,
    description: String,
    release: String,
    img: String
});

module.exports = mongoose.model("Libro", Libro);