const Product = require('../models/Product');
const Category = require('../models/Category');

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category_id', 'name');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create New Product
exports.createProduct = async (req, res) => {
    try {
        const { name, category_id, color, size, price, stock, tags } = req.body;
        const category = await Category.findById(category_id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

        // Periksa apakah ada file yang diunggah
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = new Product({ 
            name, 
            category_id, 
            color, 
            size: Array.isArray(size) ? size : [], // Jika dikirim string, ubah ke array
            price, 
            stock, 
            image_url, 
            tags: Array.isArray(tags) ? tags : [] // Sama dengan size, jika dikirim string
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error saat menambahkan produk:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category_id, color, size, price, stock, tags } = req.body;
        const category = await Category.findById(category_id);
        if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

        const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, category_id, color, size, price, stock, image_url, tags },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Produk tidak ditemukan" });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) return res.status(404).json({ message: "Produk tidak ditemukan" });

        res.status(200).json({ message: "Produk berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter Products by Category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { category_id } = req.params;
        const products = await Product.find({ category_id }).populate('category_id', 'name');

        if (!products.length) return res.status(404).json({ message: "Tidak ada produk di kategori ini" });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category_id', 'name');

        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error saat mengambil produk:", error);
        res.status(500).json({ message: error.message });
    }
};
