import React, { useState, useEffect } from "react";
import axios from "axios";

const FormProduct = () => {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: "",
        category_id: "",
        color: "",
        size: "M",
        price: "",
        stock: "",
        image: null,
        tags: "",
    });
    const [tagsArray, setTagsArray] = useState([]);
    const handleTagInput = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = e.target.value.trim();
    
            if (newTag && !tagsArray.includes(newTag)) {
                setTagsArray([...tagsArray, newTag]); // Tambah ke array
            }
    
            setProduct({ ...product, tags: "" }); // Kosongkan input setelah tambah tag
        }
    };
    
    const removeTag = (tagToRemove) => {
        setTagsArray(tagsArray.filter(tag => tag !== tagToRemove)); // Hapus tag dari array
    };
    
    useEffect(() => {
        axios.get("http://localhost:3000/api/categories")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const handleProductSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("category_id", product.category_id);
        formData.append("color", product.color);
        formData.append("size", product.size);
        formData.append("price", parseFloat(product.price));
        formData.append("stock", parseInt(product.stock));
    
        if (product.image) {
            formData.append("image", product.image);
        }
    
        // Kirim tags sebagai JSON agar bisa diproses oleh backend
        formData.append("tags", JSON.stringify(tagsArray));
    
        try {
            await axios.post("http://localhost:3000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            alert("Produk berhasil ditambahkan!");
            setProduct({
                name: "",
                category_id: "",
                color: "",
                size: "M",
                price: "",
                stock: "",
                image: null,
                tags: "",
            });
            setTagsArray([]); // Reset tag setelah submit
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    
    

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <h2>Tambah Produk</h2>
            <form onSubmit={handleProductSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Nama Produk"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                />

                <select
                    value={product.category_id}
                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                    required
                >
                    <option value="">Pilih Kategori</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Warna"
                    value={product.color}
                    onChange={(e) => setProduct({ ...product, color: e.target.value })}
                    required
                />

                <select
                    value={product.size}
                    onChange={(e) => setProduct({ ...product, size: e.target.value })}
                    required
                >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <input
                    type="number"
                    placeholder="Harga"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                />

                <input
                    type="number"
                    placeholder="Stok"
                    value={product.stock}
                    onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
                    required
                />

                <div>
                    <input
                        type="text" 
                        placeholder="Tambahkan tag, tekan Enter"
                        value={product.tags}
                        onChange={(e) => setProduct({ ...product, tags: e.target.value })}
                        onKeyDown={handleTagInput} // Tangkap Enter atau koma
                    />
                    <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                        {tagsArray.map((tag, index) => (
                            <span key={index} style={{ background: "#000", padding: "5px", borderRadius: "5px", cursor: "pointer" }} onClick={() => removeTag(tag)}>
                                {tag} ✖
                            </span>
                        ))}
                    </div>
                </div>



                <button type="submit">Tambah Produk</button>
            </form>
        </div>
    );
};

export default FormProduct;
