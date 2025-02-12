import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormOrder = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [orderDate, setOrderDate] = useState(new Date());
    const [order, setOrder] = useState({
        user_id: "",
        products: [],
        total_price: 0,
        status: "Pending",
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/users")
        .then((res) => {
            console.log("Users API Response:", res.data); // Debugging
            setUsers(res.data.data); // Pastikan mengambil array dalam `data`
        })
        .catch((err) => console.error("Error fetching users:", err));

        axios.get("http://localhost:3000/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    const handleProductSelect = (productId) => {
        const product = products.find(p => p._id === productId);
        if (product) {
            // Cek apakah produk sudah ada dalam daftar selectedProducts
            const existingProduct = selectedProducts.find(p => p._id === productId);
            if (existingProduct) {
                alert("Produk sudah dipilih! Tambahkan jumlahnya langsung.");
                return;
            }
    
            setSelectedProducts(prev => [...prev, { 
                _id: product._id,
                name: product.name, 
                price: product.price, 
                quantity: 1 
            }]);
        }
    };
    

    const handleQuantityChange = (index, quantity) => {
        const updatedProducts = [...selectedProducts];
        updatedProducts[index].quantity = parseInt(quantity);
        setSelectedProducts(updatedProducts);
        updateTotalPrice(updatedProducts);
    };

    const updateTotalPrice = (products) => {
        const total = products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);
        setOrder(prevOrder => ({ ...prevOrder, total_price: total }));
    };
    

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            user_id: order.user_id, 
            products: selectedProducts.map(p => ({ 
                product_id: p._id, 
                quantity: p.quantity 
            })), 
            total_price: order.total_price, 
            created_at: orderDate.toISOString(), // Format tanggal yang benar
            status: order.status
        };
    
        console.log("Data yang dikirim:", orderData); // Debugging
    
        try {
            await axios.post("http://localhost:3000/api/orders", orderData);
            alert("Pesanan berhasil ditambahkan!");
            setOrder({ user_id: "", products: [], total_price: 0, status: "Pending" });
            setSelectedProducts([]);
            setOrderDate(new Date());
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };
    

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h2>Tambah Pesanan</h2>
            <form onSubmit={handleOrderSubmit}>
                {/* Pilih User */}
                <select
                    value={order.user_id}
                    onChange={(e) => setOrder({ ...order, user_id: e.target.value })}
                    required
                >
                    <option value="">Pilih Pelanggan</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                    ))}
                </select>


                {/* Pilih Produk */}
                <select onChange={(e) => handleProductSelect(e.target.value)}>
                    <option value="">Pilih Produk</option>
                    {products.map(prod => (
                        <option key={prod._id} value={prod._id}>{prod.name} - Rp {prod.price.toLocaleString()}</option>
                    ))}
                </select>

                {/* Daftar Produk yang Dipilih */}
                {selectedProducts.map((prod, index) => (
                    <div key={prod._id}>
                        <span>{prod.name} - Rp {prod.price.toLocaleString()}</span>
                        <input
                            type="number"
                            min="1"
                            value={prod.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                    </div>
                ))}

                {/* Total Harga */}
                <input type="text" value={`Rp ${order.total_price.toLocaleString()}`} disabled />

                {/* Pilih Tanggal Pemesanan */}
                <DatePicker selected={orderDate} onChange={date => setOrderDate(date)} />

                {/* Pilih Status */}
                <select
                    value={order.status}
                    onChange={(e) => setOrder({ ...order, status: e.target.value })}
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button type="submit">Tambah Pesanan</button>
            </form>
        </div>
    );
};

export default FormOrder;
