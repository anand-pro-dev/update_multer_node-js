import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, },
    price: { type: String, },
    image: { type: String }, // Single main image URL
    details: { type: String, },
    heading: { type: String }, // Heading for the product
    para: { type: String }, // Additional paragraph information
    size: { type: String }, // Size of the product (e.g., Medium)
    all_images: [{ type: String }] // Array of additional image URLs
});

const Product = mongoose.model('Art_Product', productSchema);

export default Product;
