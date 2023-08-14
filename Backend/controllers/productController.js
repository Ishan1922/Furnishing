const verifyToken = require('../middlewares/verifyToken')
const Product = require('../models/Product')
const User = require('../models/User')
const productController = require('express').Router()

// get all
productController.get('/getAll', async (req, res) => {
    try {
        const products = await Product.find({}).populate("currentOwner", '-password')

        console.log(products)

        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get featured
productController.get('/find/featured', async (req, res) => {
    try {
        const featuredproducts = await Product.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredproducts)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// get all from specific type
productController.get('/find', async (req, res) => {
    const type = req.query
    try {
        if (type) {
            const products = await Product.find(type).populate("currentOwner", '-password')
            return res.status(200).json(products)
        } else {
            return res.status(500).json({msg: "No such type"})
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

//Count of types of Product
productController.get('/find/types', async (req, res) => {
    try {
        const sofaType = await Product.countDocuments({ type: 'sofa' })
        const bedType = await Product.countDocuments({ type: 'bed' })
        const chairType = await Product.countDocuments({ type: 'chair' })

        return res.status(200).json({ sofa: sofaType, bed: bedType, chair: chairType})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// TODO FETCH INDIVIDUAL Product
productController.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('currentOwner', '-password')

        if (!product) {
            throw new Error('No such product with this id')
        } else {
            return res.status(200).json(product)
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


// create product
productController.post('/', verifyToken, async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body, currentOwner: req.user.id })

        return res.status(201).json(newProduct)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// update product
productController.put('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to update other people's products")
        }
        else{const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )


        return res.status(200).json(updatedProduct)}
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


// delete product
productController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product)
        {
            throw new Error("Product Doesn't Exist")
        }
        else if (product.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to delete other people products")
        }
        else{
            product = await Product.findByIdAndDelete(req.params.id)

            return res.status(200).json({ msg: "Successfully deleted Product" })
        }
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = productController