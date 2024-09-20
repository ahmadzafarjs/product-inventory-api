import Product from "./../models/product.model.js"

export async function getAllProducts(req, res) {
    try {
        
       const products = await Product.find({owner: req.user.id})

       return res.status(200).json({products})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export async function createProduct(req, res) {
    try {
        const { name, price } = req.body;

        const newProduct = await Product.create({
            name,
            price,
            owner: req.user.id
        })

        if (!newProduct) {
            return res.status(400).json({message: "Something went wrong"})
        }

        return res.status(200).json({product: newProduct})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export async function updateProduct(req, res) {
    try {

        const {id} = req.params

        const { name, price } = req.body;

        const newProduct = await Product.findByIdAndUpdate(id, {
            name,
            price,
        }, {new: true})

        if (!newProduct) {
            return res.status(400).json({message: "Something went wrong"})
        }

        return res.status(200).json({updated: newProduct})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

export async function deleteProduct(req, res) {
    try {
        const {id} = req.params

        const newProduct = await Product.findByIdAndDelete(id)

        return res.status(200).json({deleteStatus: newProduct})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}