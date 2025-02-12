import { useState } from "react";
import CategoryTable from "./components/CategoryTable";
import ProductTable from "./components/ProductTable";
import OrderTable from "./components/OrderTable";
import FormCategory from "./components/FormCategory";
import FormProduct from "./components/FormProduct";
import FormOrder from "./components/FormOrder";
import "./App.css";

function App() {
    const [view, setView] = useState("dashboard"); // State untuk mengontrol tampilan

    const handleViewChange = (newView) => {
        console.log("Mengubah tampilan ke:", newView); // Debugging
        setView(newView);
    };

    return (
        <div className="container">
            <h1>Dashboard Produk & Kategori</h1>

            {/* Tombol Navigasi */}
            <div>
                <button onClick={() => handleViewChange("addProduct")}>Tambah Produk</button>
                <button onClick={() => handleViewChange("addCategory")}>Tambah Kategori</button>
                <button onClick={() => handleViewChange("addOrder")}>Tambah Order</button>
                <button onClick={() => handleViewChange("dashboard")}>Kembali</button>
            </div>

            {/* Render berdasarkan nilai state */}
            {view === "dashboard" && (
                <>
                    <CategoryTable />
                    <ProductTable />
                    <OrderTable />
                </>
            )}

            {view === "addProduct" && <FormProduct />}
            {view === "addCategory" && <FormCategory />}
            {view === "addOrder" && <FormOrder/>}
        </div>
    );
}

export default App;
