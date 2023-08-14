const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 2,
    },
    type: {
        type: String,
        enum: ["sofa","bed","chair"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 10,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true,
    },
    breadth: {
        type: Number,
        required: true
    },
    owner: {
        type: Number,
        required: true,
    },
    featured:{
        type:Boolean,
        default:false
    }, 
}, {timestamps: true})

module.exports = mongoose.model("Product", ProductSchema)