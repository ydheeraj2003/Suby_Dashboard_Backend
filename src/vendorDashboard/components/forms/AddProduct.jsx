
import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        } else {
            setCategory([...category, value]);
        }
    };

    const handleBestSeller = (e) => {
        const value = e.target.value === "true";
        setBestSeller(value);
    };

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem("loginToken");
            const firmId = localStorage.getItem("vendorFirmId");
            if (!loginToken || !firmId) {
                console.error("User not authenticated or firmId missing");
                alert("Please login and select a firm before adding products.");
                return;
            }

            const formData = new FormData();
            formData.append("productName", productName);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("bestSeller", bestSeller);
            formData.append("image", image);
            category.forEach((value) => {
                formData.append("category", value);
            });

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${loginToken}`  // Use Authorization header
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert("Product added successfully");
            } else {
                console.error(data);
                alert("Failed to add product");
            }

            setProductName("");
            setPrice("");
            setCategory([]);
            setBestSeller(false);
            setImage(null);
            setDescription("");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div className="productSection">
            <form className="productForm" onSubmit={handleAddProduct}>
                <h3>Add Product</h3>
                <label>Product Name</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                <label>Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                <div className="checksInp">
                    <label>Category</label>
                    <div className="inputsContainers">
                        <div className="checkboxsContainers">
                            <label>veg</label>
                            <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={handleCategoryChange} />
                        </div>

                        <div className="checkboxsContainers">
                            <label>non-veg</label>
                            <input type="checkbox" value="non-veg" checked={category.includes("non-veg")} onChange={handleCategoryChange} />
                        </div>
                    </div>
                </div>
                <div className="checksInp">
                    <label>Best Seller</label>
                    <div className="inputsContainers">
                        <div className="checkboxsContainers">
                            <label>Yes</label>
                            <input type="radio" value="true" checked={bestSeller === true} onChange={handleBestSeller} />
                        </div>

                        <div className="checkboxsContainers">
                            <label>No</label>
                            <input type="radio" value="false" checked={bestSeller === false} onChange={handleBestSeller} />
                        </div>
                    </div>
                </div>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Product Image</label>
                <input type="file" onChange={handleImageUpload} /><br />
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
