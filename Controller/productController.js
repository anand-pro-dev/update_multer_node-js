import Product from '../model/productModel.js';
import { uploadMultipleImages } from '../middleware/uploadMiddleware.js';

// Get product details by ID
const product_details = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
const product_all = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new product
const product_create = async (req, res) => {
    uploadMultipleImages(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: false, error: err.message });
        }

        try {
            const { title, price, details, heading, para, size } = req.body;

            if (!req.files.image) {
                return res.status(400).json({ status: false, message: "Main image is required." });
            }

            let errorMessage = "";
            if (!title) errorMessage += "Title is required. ";
            if (!price) errorMessage += "Price is required. ";
            if (!details) errorMessage += "Details are required. ";

            if (errorMessage) {
                return res.status(400).json({ status: false, message: errorMessage.trim() });
            }

            // Main image
            const mainImageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.files.image[0].filename}`;

            // Additional images
            const additionalImages = req.files.all_images
                ? req.files.all_images.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`)
                : [];

            const product = new Product({
                title,
                price,
                details,
                heading,
                para,
                size,
                image: mainImageUrl, // Store the main image URL
                all_images: additionalImages // Store the additional image URLs
            });

            const savedProduct = await product.save();
            res.json({ status: true, data: savedProduct });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(400).json({ status: false, error: error.message });
        }
    });
};

// Update a product
const product_update = async (req, res) => {
    uploadMultipleImages(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: false, error: err.message });
        }

        try {
            const { title, price, details, heading, para, size } = req.body;

            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ status: false, error: "Product not found" });
            }

            product.title = title || product.title;
            product.price = price || product.price;
            product.details = details || product.details;
            product.heading = heading || product.heading;
            product.para = para || product.para;
            product.size = size || product.size;

            // If a new main image was uploaded, replace the old one
            if (req.files.image) {
                product.image = `${req.protocol}://${req.get("host")}/uploads/${req.files.image[0].filename}`;
            }

            // If new additional images were uploaded, replace the old ones
            if (req.files.all_images) {
                product.all_images = req.files.all_images.map(file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`);
            }

            const updatedProduct = await product.save();
            res.json({ status: true, data: updatedProduct });
        } catch (error) {
            res.status(400).json({ status: false, error: error.message });
        }
    });
};

// Delete a product by ID
const product_delete = async (req, res) => {
    try {
        const removedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!removedProduct) {
            return res.status(404).json({ status: false, error: "Product not found" });
        }
        res.json({ status: true, data: removedProduct });
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    }
};

// Delete all products
const product_delete_all = async (req, res) => {
    try {
        const count = await Product.countDocuments();

        if (count === 0) {
            return res.status(404).json({ status: false, message: "There are no products to delete" });
        }

        await Product.deleteMany({});
        res.json({ status: true, message: "All products deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    }
};

export {
    product_all,
    product_create,
    product_details,
    product_update,
    product_delete,
    product_delete_all,
};
