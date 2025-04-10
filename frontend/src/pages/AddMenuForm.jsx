import { useState, useEffect } from "react";
import axios from "axios";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/menus");
      setMenus(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch menus:", err);
      setError("Failed to load menus");
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMenu = async () => {
    if (!newMenuName.trim()) return;
    
    try {
      const res = await axios.post("http://localhost:5000/api/menus", { 
        name: newMenuName.trim() 
      });
      
      // Optimistically update the UI with the new menu
      setMenus(prev => [...prev, res.data.data]);
      setNewMenuName("");
      setShowAddInput(false);
    } catch (err) {
      console.error("Failed to add menu:", err);
      setError("Failed to add menu");
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 flex-wrap items-center">
        {/* Loading state */}
        {loading && <p>Loading menus...</p>}
        
        {/* Error state */}
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Menu buttons */}
        {menus.map((menu) => (
          <button
            key={menu._id}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            {menu.name.toUpperCase()}
          </button>
        ))}

        {/* Add Menu Button */}
        {!showAddInput && (
          <button
            onClick={() => setShowAddInput(true)}
            className="bg-green-500 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-600 transition-colors"
            title="Add new menu"
          >
            Create
          </button>
        )}

        {/* Add Menu Form */}
        {showAddInput && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Menu name"
              value={newMenuName}
              onChange={(e) => setNewMenuName(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleAddMenu}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              disabled={!newMenuName.trim()}
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowAddInput(false);
                setNewMenuName("");
              }}
              className="text-red-500 hover:text-red-700 text-xl px-2 transition-colors"
              title="Cancel"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;