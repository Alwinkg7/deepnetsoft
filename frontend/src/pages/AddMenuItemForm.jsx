import { useState } from "react";
import axios from "axios";

function AddMenuItemForm({ menuId, onItemAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        
        // Validation
        if (!formData.name.trim()) {
            setError("Item name is required");
            return;
        }
        if (formData.price <= 0) {
            setError("Price must be greater than 0");
            return;
        }

        setLoading(true);
        
        try {
            const response = await axios.post(
                "http://localhost:5000/api/menu-items/{menuId}",
                {
                    name: formData.name.trim(),
                    description: formData.description.trim(),
                    price: formData.price,
                    menuId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setSuccess(true);
                setFormData({
                    name: "",
                    description: "",
                    price: ""
                });
                onItemAdded(); // Refresh menu item list
                
                // Reset success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(response.data.error || "Failed to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            setError(error.response?.data?.error || 
                    error.message || 
                    "Failed to add menu item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddItem} className="mb-4 space-y-3 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Add New Menu Item</h3>
            
            {error && (
                <div className="p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="p-2 bg-green-100 text-green-700 rounded">
                    Item added successfully!
                </div>
            )}

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Item Name*
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g. Margherita Pizza"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    placeholder="e.g. Classic pizza with tomato sauce and mozzarella"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Price*
                </label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                    </span>
                    <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="pl-8 p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
                {loading ? 'Adding...' : 'Add Item'}
            </button>
        </form>
    );
}

export default AddMenuItemForm;