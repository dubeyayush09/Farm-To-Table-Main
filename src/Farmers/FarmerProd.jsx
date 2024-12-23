import { useEffect, useState } from "react";
import './FarmerProd.css';
import axios from "axios";
import { Link } from "react-router-dom";

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:4000/farmers/api/v2/gethistory', {
            withCredentials: true,
        });
        return response.data.data;
    } catch (error) {
        console.log("An error occurred while fetching details:", error.message);
        return [];
    }
}

const updateProduct = async (product) => {
    try {
        const updatedProduct = {
            ...product,
            name: prompt("Enter new name:", product.name) || product.name,
            description: prompt("Enter new description:", product.description) || product.description,
            price: parseFloat(prompt("Enter new price:", product.price)) || product.price,
            quantity: parseInt(prompt("Enter new quantity:", product.quantity)) || product.quantity,
            prodImage: String(prompt("Enter new imageUrl:", product.prodImage)) || product.prodImage
        };
        console.log("updateProduct ", updatedProduct);

        await axios.put(`http://localhost:4000/farmers/api/v2/updateproduct`, updatedProduct, {
            withCredentials: true,
        });
        alert("Product updated successfully!");
    } catch (error) {
        console.error("Error updating product:", error.message);
        alert("An error occurred while updating the product.");
    }
}

const deleteProduct = async (product_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
        await axios.delete(`http://localhost:4000/farmers/api/v2/deleteProduct/${product_id}`, {
            withCredentials: true,
        });
        alert("Product deleted successfully!");
        fetchData(); // Refresh the data without reloading
    } catch (error) {
        console.error("Error deleting product:", error.message);
        alert("An error occurred while deleting the product.");
    }
}


const FarmerProd = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const fetchedData = await fetchData();
            setData(fetchedData);
        };
        getData();
    }, []);

    return (
        <div className="settings-container">
            <aside className="sidebar">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to="/UserProfile"><span className="nav-icon">📊</span> Dashboard</Link></li>
                    <li><a href="#"><span className="nav-icon">📜</span> Farm Orders</a></li>
                    <li>Log-out</li>
                </ul>
            </aside>
            <main className="main-content">
                <h1>Farmer Account Settings</h1>
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Date Supplied</th>
                                <th>Price</th>
                                <th>Name</th>
    
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.product_id}</td>
                                        <td>{product.category_id}</td>
                                        <td>{product.quantity}KG</td>
                                        <td>{new Date(product.date_supplied).toLocaleDateString()}</td>
                                        <td>₹{product.price}</td>
                                        <td>{product.name}</td>
                                       
                                        <td>
                                            <img
                                                src={product.prodImage}
                                                alt={product.name}
                                                className="prod-image"
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="update-button"
                                                onClick={() => updateProduct(product)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteProduct(product.product_id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default FarmerProd;
