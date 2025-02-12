import React, { useState } from "react";
import axios from "axios";

const FormCategory = () => {
    const [categoryName, setCategoryName] = useState("");

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/categories", { name: categoryName })
            .then(() => {
                alert("Kategori berhasil ditambahkan!");
                setCategoryName("");
            })
            .catch((err) => console.error("Error adding category:", err));
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <h2>Tambah Kategori</h2>
            <form onSubmit={handleCategorySubmit}>
                <input
                    type="text"
                    placeholder="Nama Kategori"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <button type="submit">Tambah</button>
            </form>
        </div>
    );
};

export default FormCategory;
