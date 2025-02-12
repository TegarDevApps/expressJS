import React, { useEffect, useState } from "react";

const OrderTable = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/orders")
            .then((res) => res.json())
            .then((data) => {
                console.log("Order Data:", data); // Debugging
                setOrders(data);
            })
            .catch((err) => console.error("Error fetching orders:", err));
    }, []);

    return (
        <div>
            <h2>Daftar Pesanan</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Pelanggan</th>
                        <th>Produk</th>
                        <th>Jumlah</th>
                        <th>Total Harga</th>
                        <th>Status</th>
                        <th>Tanggal Pemesanan</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        console.log("Order Data:", order); // Debugging
                        return (
                            <tr key={order._id}>
                                <td>{order._id}</td>

                                {/* Perbaikan Nama Pelanggan */}
                                <td>{order.user?.name || "unknown"}</td>

                                {/* Perbaikan Produk */}
                                <td>
                                    {Array.isArray(order.products) && order.products.length > 0
                                        ? order.products
                                              .map((prod) => (prod?.name ? `${prod.name} (${prod.quantity})` : "Unknown"))
                                              .join(", ")
                                        : "Unknown Product"}
                                </td>

                                {/* Perbaikan Jumlah */}
                                <td>
                                    {Array.isArray(order.products) && order.products.length > 0
                                        ? order.products.reduce((total, prod) => total + (prod.quantity || 0), 0)
                                        : "Unknown"}
                                </td>

                                <td>Rp {order.total_price?.toLocaleString() || "0"}</td>
                                <td>{order.status}</td>

                                {/* Perbaikan Tanggal */}
                                <td>
                                    {order.order_date && !isNaN(new Date(order.order_date).getTime())
                                        ? new Date(order.order_date).toLocaleDateString("id-ID")
                                        : "No Date"}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
