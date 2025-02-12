const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user_id', 'name') // Menampilkan hanya nama user
            .populate('products.product_id', 'name price'); // Menampilkan nama & harga produk

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { user_id, products } = req.body;

        let totalPrice = 0;
        for (let item of products) {
            const product = await Product.findById(item.product_id);
            if (!product) return res.status(404).json({ message: `Produk dengan ID ${item.product_id} tidak ditemukan` });

            totalPrice += product.price * item.quantity;
        }

        const newOrder = new Order({
            user_id,
            products,
            total_price: totalPrice
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error saat membuat order:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!updatedOrder) return res.status(404).json({ message: "Order tidak ditemukan" });

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Order tidak ditemukan" });

        res.status(200).json({ message: "Order berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user_id', 'name') // Ambil hanya nama user
            .populate('products.product_id', 'name price'); // Ambil nama & harga produk

        if (!order) return res.status(404).json({ message: "Order tidak ditemukan" });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
