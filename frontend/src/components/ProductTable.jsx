import React, { useEffect, useState } from "react";

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <div>
            <h2>Daftar Produk</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Produk</th>
                        <th>Kategori</th>
                        <th>Warna</th>
                        <th>Ukuran</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Gambar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod._id}>
                            <td>{prod._id}</td>
                            <td>{prod.name}</td>
                            <td>{prod.category_id?.name || "Unknown"}</td>
                            <td>{prod.color}</td>
                            <td>{prod.size.join(", ")}</td>
                            <td>Rp {prod.price.toLocaleString()}</td>
                            <td>{prod.stock}</td>
                            <td>
                                <img 
                                    src={`http://localhost:3000${prod.image_url}`} 
                                    width="50" 
                                    alt="Gambar Produk" 
                                    onError={(e) => console.error("Error loading image:", e)}
                                />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
