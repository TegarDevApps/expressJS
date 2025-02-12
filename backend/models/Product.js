const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Silahkan isikan nama produk']
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    color: {
        type: String
    },
    size: {
        type: [String], // Array untuk ukuran (S, M, L, XL)
        enum: ['S', 'M', 'L', 'XL']
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    image_url: {
        type: String
    },
    tags: {
        type: [String] // Array tags (ex: ["Minimalist", "Trendy"])
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
