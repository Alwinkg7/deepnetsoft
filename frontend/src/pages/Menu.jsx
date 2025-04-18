import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg1.jpeg';
import backgroundImage2 from '../assets/bg2.png';
import backgroundImage3 from '../assets/bg3.png';
import turkey from '../assets/turkey.png'; 
import fish from '../assets/fish.png'; 
import pizza from '../assets/pizza.png'; 
import grill from '../assets/grill.png'; 
import wine from '../assets/wine.png'; 
import glasses from '../assets/glasses.png'; 
import logo from '../assets/logo.png'; 
import youtube from '../assets/youtube.png'; 
import instagram from '../assets/instagram.png'; 
import facebook from '../assets/facebook.png'; 
import twitter from '../assets/twitter.png'; 
import drink from '../assets/drink.png'; 
import drink2 from '../assets/drink2.png'; 
import brunch from '../assets/brunch.png'; 
import menuTitle from '../assets/menu.png';
import { useParams } from "react-router-dom";
import axios from 'axios';

const Menu = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const { id: menuId } = useParams();
    const navigate = useNavigate();

    // State for adding menus
    const [showAddInput, setShowAddInput] = useState(false);
    const [newMenuName, setNewMenuName] = useState('');
    const [itemsLoading, setItemsLoading] = useState(false);


    const [selectedMenuName, setSelectedMenuName] = useState(null);
    // State for adding menu items
    const [showAddItemPopup, setShowAddItemPopup] = useState(false);
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        price: ''
    });
    const [itemError, setItemError] = useState('');

    const fetchMenus = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/menus");
            setMenus(res.data.data || []);
        } catch (err) {
            console.error("API Error:", err);
            setMenus([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMenuItems = async (menuId) => {
      setItemsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/menu-items`, {
          params: { menuId }
        });
        
        if (res.data.success) {
          setMenuItems(res.data.data || []);
        } else {
          throw new Error(res.data.message || 'Failed to fetch items');
        }
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        setMenuItems([]);
      } finally {
        setItemsLoading(false);
      }
    };

    // Update your menu click handler
    const handleMenuClick = (menuId, menuName) => {
      setSelectedMenuId(menuId);
      setSelectedMenuName(menuName);
      setMenuItems([]); // Clear previous items
      fetchMenuItems(menuId);
    };

    const handleAddMenu = async () => {
        if (!newMenuName.trim()) return;
      
        try {
            const response = await axios.post('http://localhost:5000/api/menus', { Menuname: newMenuName });
        
            if (response.data && response.data.data) {
                setMenus(prevMenus => [...prevMenus, response.data.data]);
            } else {
                fetchMenus();
            }
        
            setNewMenuName('');
            setShowAddInput(false);
        } catch (error) {
            console.error("Error adding menu:", error);
        }
    };

    const handleDeleteMenu = async (menuId) => {
        if (!window.confirm("Are you sure you want to delete this menu?")) {
            return;
        }
    
        try {
            await axios.delete(`http://localhost:5000/api/menus/${menuId}`);
            
            setMenus(prevMenus => prevMenus.filter(menu => menu._id !== menuId));
            
            if (selectedMenuId === menuId) {
                setSelectedMenuId(null);
                setMenuItems([]);
            }
    
            alert("Menu deleted successfully!");
        } catch (error) {
            console.error("Error deleting menu:", error);
            alert("Failed to delete menu. Please try again.");
        }
    };

    const handleAddMenuItem = async (e) => {
      e.preventDefault();
      setItemError('');
    
      // Validate all fields
      const errors = [];
      if (!selectedMenuName) errors.push('Please select a menu');
      if (!newItem.title?.trim()) errors.push('Item name is required');
      if (!newItem.price || isNaN(newItem.price) || parseFloat(newItem.price) <= 0) {
        errors.push('Please enter a valid price');
      }
    
      if (errors.length > 0) {
        setItemError(errors.join(', '));
        return;
      }
    
      try {
        const payload = {
          name: newItem.title.trim(),
          description: newItem.description.trim(),
          price: parseFloat(newItem.price),
          menuName: selectedMenuName // Changed from menuname to menuName
        };
    
        console.log("Final payload:", payload); // Verify in browser console
    
        const response = await axios.post("http://localhost:5000/api/menu-items", payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.data.success) {
          fetchMenuItems(selectedMenuId);
          setShowAddItemPopup(false);
          setNewItem({ title: '', description: '', price: '' });
        } else {
          setItemError(response.data.message || 'Failed to add item');
        }
      } catch (error) {
        console.error("Full error:", error);
        const errorMsg = error.response?.data?.message || 
                       error.message || 
                       'Failed to add item';
        setItemError(errorMsg);
      }
    };

    useEffect(() => {
        fetchMenus();
        if (menuId) {
            handleMenuClick(menuId);
        }
    }, [menuId]);

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 22.5px',
            minHeight: '100vh',
            paddingTop: '60px'
        }}>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                minHeight: '100vh',
                marginTop: '-280px',
            }}>
                <div
                  className="flex flex-col items-center text-center px-4"
                  style={{
                    padding: '0 4%',
                    marginTop: '300px', // Ensures it's well below the fixed navbar
                  }}
                >
                  <img
                    src={menuTitle}
                    alt="Menu"
                    style={{
                      width: '180px',
                      height: 'auto',
                      marginTop: '150px',
                    }}
                  />
                  <p
                    style={{
                      fontSize: 'min(20px, 3vw)',
                      maxWidth: 'min(681px, 90vw)',
                      fontFamily: 'Kelly-Slab',
                      fontWeight: 400,
                      letterSpacing: '0.3px',
                      color: '#BBBBBB',
                      marginTop: '20px',
                      lineHeight: '1.1',
                    }}
                  >
                    Please take a look at our menu featuring food, drinks, and brunch. If you'd like to
                    <br /> place an order, use the "Order Online" button located below the menu.
                  </p>
                </div>

                {/* Menu Selection Section */}
                <div style={{
                    backgroundImage: `url(${backgroundImage2})`,
                    marginTop: 'min(70px, 8vw)',
                    height: '80px',
                    backgroundSize: 'contain'
                }}>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)', height: '80px' }}>
                        {loading ? (
                            <p className="text-center">Loading menus...</p>
                        ) : menus.length === 0 ? (
                            <p className="text-center text-red-400">No menus found.</p>
                        ) : (
                            <div className="flex justify-center flex-wrap" style={{ paddingTop: '15px', gap: 'min(15px, 2vw)', '::-webkit-scrollbar': {
                                display: 'none'
                            } }}>
                                {menus.map((menu) => (
                                    <div key={menu._id} style={{ display: 'flex', alignItems: 'center', gap: 'min(8px, 1vw)' }}>
                                        <button
                                            onClick={() => handleMenuClick(menu._id, menu.Menuname)}
                                            style={{
                                                width: 'min(114.25px, 15vw)',
                                                height: 'min(49.98px, 7vw)',
                                                border: '0.32px solid #0796EF',
                                                backgroundColor: selectedMenuId === menu._id ? '#0796EF' : 'black',
                                                color: '#fff',
                                                borderRadius: '1px',
                                                cursor: 'pointer',
                                                fontWeight: '500',
                                                fontSize: 'min(14px, 2vw)',
                                            }}
                                        >
                                            {menu.Menuname?.toUpperCase() || 'Unnamed'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMenu(menu._id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'red',
                                                cursor: 'pointer',
                                                fontSize: 'min(16px, 3vw)',
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}

                                {/* Add Menu Button */}
                                {!showAddInput ? (
                                    <button
                                        onClick={() => setShowAddInput(true)}
                                        style={{
                                          width: 'min(114.25px, 15vw)',
                                          height: 'min(49.98px, 7vw)',
                                          border: '0.32px solid #0796EF',
                                            color: '#fff',
                                            borderRadius: '1px',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            fontSize: 'min(14px, 2vw)',
                                            backgroundColor: 'black'
                                        }}
                                    >
                                        ADD
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-2" 
                                    style={{ display: 'flex', alignItems: 'center', gap: 'min(10px, 1.5vw)', marginLeft: 'min(10px, 1vw)' }}>
                                        <input
                                            type="text"
                                            placeholder="Menu name"
                                            value={newMenuName}
                                            onChange={(e) => setNewMenuName(e.target.value)}
                                            style={{
                                              padding: 'min(8px, 1vw) min(12px, 1.5vw)',
                                              borderRadius: '4px',
                                              border: '1px solid #0796EF',
                                              background: 'rgba(255, 255, 255, 0.9)',
                                              color: '#000',
                                              fontSize: 'min(14px, 2vw)',
                                              width: 'min(150px, 20vw)'
                                            }}
                                            autoFocus
                                        />
                                        <button
                                            onClick={handleAddMenu}
                                            style={{
                                              width: 'min(114.25px, 15vw)',
                                              height: 'min(49.98px, 7vw)',
                                              border: '0.32px solid #0796EF',
                                              color: '#fff',
                                              borderRadius: '1px',
                                              cursor: 'pointer',
                                              fontWeight: '500',
                                              fontSize: 'min(14px, 2vw)',
                                              backgroundColor: 'black'
                                            }}
                                            disabled={!newMenuName.trim()}
                                        >
                                            ADD
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowAddInput(false);
                                                setNewMenuName('');
                                            }}
                                            style={{
                                                background: 'transparent',
                                                color: '#fff',
                                                border: 'none',
                                                fontSize: 'min(20px, 3vw)',
                                                cursor: 'pointer',
                                                padding: '0 min(8px, 1vw)',
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu Items Display Section */}
                <div style={{
                    backgroundImage: `url(${backgroundImage3})`,
                    height: 'min(680px, 100vh)',
                    backgroundSize: 'auto',
                    position: 'relative',
                    marginTop: 'min(-5px, 8vw)'
                }}>
                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.78)',
                        height: 'min(680px, 100vh)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0',
                        overflow: 'hidden',
                        width: '100%',
                        
                    }}>
                        {/* Left side images */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(25px, 3vw)', transform: 'translateX(min(-25px, -3vw))',  visibility: window.innerWidth < 1024 ? 'hidden' : 'visible' }}>
                            <img src={turkey} alt="img1" style={{ width: 'min(150px, 20vw)', height: 'min(150px, 20vw)', filter: "brightness(0.2)" }} />
                            <img src={wine} alt="img2" style={{ width: 'min(150px, 20vw)', height: 'min(150px, 20vw)', filter: "brightness(0.2)" }} />
                            <img src={pizza} alt="img3" style={{ width: 'min(200px, 25vw)', height: 'min(200px, 25vw)', marginTop: 'min(70px, 8vw)', filter: "brightness(0.2)", marginLeft: '-min(-60px, -7vw)'}} />
                        </div>

                        {/* Center box */}
                        <div style={{
                            position: 'relative',
                            border: '2px solid white',
                            padding: 'min(30px, 3vw)',
                            height: 'min(400px, 60vh)',
                            width: 'min(1170px, 90vw)',
                            maxWidth: '1170px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            margin: '0 auto',
                            marginLeft: '40px',
                            paddingLeft: '10px',
                        }}>
                            {/* Corner Images */}
                            <img 
                                src={drink} 
                                alt="Cocktail Left" 
                                style={{
                                    position: 'absolute',
                                    top: 'min(-147.5px, -15vw)',
                                    left: 'min(-35px, -3.5vw)',
                                    height: 'min(281px, 30vw)',
                                    width: 'min(190px, 20vw)',
                                    marginTop: 'min(80px, 8vw)',
                                    visibility: window.innerWidth < 1024 ? 'hidden' : 'visible'
                                }}
                            />
                            <img 
                                src={drink2} 
                                alt="Cocktail Right" 
                                style={{
                                    position: 'absolute',
                                    bottom: 'min(-40px, -3.5vw)',
                                    right: 'min(-2.5px, -0.5vw)',
                                    height: 'min(330px, 35vw)',
                                    width: 'min(220px, 23vw)',
                                    visibility: window.innerWidth < 1024 ? 'hidden' : 'visible'
                                }}
                            />

                            {/* Heading */}
                            <img src={brunch} alt="Menu" style={{ width: 'min(850px, 80vw)', height: 'min(90px, 10vw)', position: 'absolute', top: 'min(50px, 6vw)' }}/>
                            
                            {/* Menu Items List */}
                            <div style={{ 
                              maxHeight: 'min(400px, 50vh)',
                              overflowY: 'auto', 
                              width: '100%', 
                              padding: 'min(20px, 2vw)',
                              color: '#ddd',
                              fontFamily: "'Inter', sans-serif",
                              backgroundColor: 'transparent',
                              borderRadius: '12px',
                              boxSizing: 'border-box',
                              position: 'relative',
                              marginTop: 'min(70px, 8vw)',
                            }}>
                              {/* Loading State */}
                              {itemsLoading ? (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  height: '200px'
                                }}>
                                  <div style={{
                                    width: '40px',
                                    height: '40px',
                                    border: '4px solid rgba(7, 150, 239, 0.3)',
                                    borderTop: '4px solid #0796EF',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                  }} />
                                </div>
                              ) : (
                                <div style={{ position: 'relative', minHeight: '100%', backgroundColor: 'transparent' }}>
                                  {/* Menu Items List */}
                                  {selectedMenuId ? (
                                    menuItems.length > 0 ? (
                                      <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                        gap: '20px',
                                        paddingBottom: '100px' // Extra padding for the sticky button
                                      }}>
                                      {menuItems.filter(item => item.menu === selectedMenuId).map(item => (
                                        <div key={item._id} style={{ 
                                          padding: '20px',
                                          borderRadius: '8px',
                                          backgroundColor: 'transparent',
                                          
                                          transition: 'all 0.3s ease',
                                          ':hover': {
                                            backgroundColor: 'rgba(7, 150, 239, 0.1)',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 4px 12px transparent'
                                          }
                                        }}>
                                          <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '12px'
                                          }}>
                                            <div style={{ 
                                              display: 'flex',
                                              alignItems: 'center',
                                              overflow: 'hidden',
                                              flex: 1,
                                              minWidth: 0
                                            }}>
                                              <span style={{
                                                fontWeight: '700',
                                                fontSize: '20px',
                                                color: '#fff',
                                                textTransform: 'uppercase',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                              }}>
                                                {item.name}
                                              </span>
                                              <span style={{
                                                color: 'white',
                                                letterSpacing: '4px',
                                                margin: '0 8px',
                                                flexShrink: 0,
                                                fontSize: '12px'
                                              }}>
                                                •••
                                              </span>
                                            </div>
                                            <div style={{ 
                                              color: 'white', 
                                              fontWeight: 'bold', 
                                              fontSize: '20px',
                                              flexShrink: 0
                                            }}>
                                              ${item.price.toFixed(2)}
                                            </div>
                                          </div>

                                          <div style={{ 
                                            fontSize: '16px',
                                            color: 'rgba(221,221,221,0.9)',
                                            lineHeight: '1.6',
                                            fontStyle: 'italic',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                          }}>
                                            {item.description}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      height: '200px',
                                      color: 'rgba(221,221,221,0.7)',
                                      gap: '16px',
                                      paddingBottom: '100px' // Match padding with items list
                                    }}>
                                      <div style={{
                                        fontSize: '18px',
                                        fontStyle: 'italic'
                                      }}>
                                        No items available for this menu.
                                      </div>
                                    </div>
                                  )
                                ) : (
                                  <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '200px',
                                    color: 'rgba(221,221,221,0.7)',
                                    fontSize: '18px',
                                    paddingBottom: '20px'
                                  }}>
                                    Please select a menu to view items
                                  </div>
                                )}

                                {/* Sticky Add Item Button */}
                                {selectedMenuId && (
                                  <div style={{
                                    position: 'sticky',
                                    bottom: '0',
                                    left: '0',
                                    right: '0',
                                    padding: '20px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(to top, transparent 0%, transparent 100%)',
                                    zIndex: 100,
                                    marginTop: '-60px' // Pulls up to overlap with content
                                  }}>
                                    <button
                                      onClick={() => setShowAddItemPopup(true)}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        padding: '12px 24px',
                                        backgroundColor: '#0796EF',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 12px rgba(7, 150, 239, 0.25)',
                                        transition: 'all 0.3s ease',
                                        ':hover': {
                                          backgroundColor: '#0680D0',
                                          transform: 'translateY(-2px)',
                                          boxShadow: '0 6px 16px rgba(7, 150, 239, 0.35)'
                                        }
                                      }}
                                    >
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 5v14M5 12h14" />
                                      </svg>
                                      {menuItems.length === 0 ? 'Add First Item' : 'Add Item'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right side images */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(40px, 4vw)', transform: 'translateX(min(70px, 7vw))', visibility: window.innerWidth < 1024 ? 'hidden' : 'visible' }}>
                            <img src={fish} alt="img4" style={{ width: 'min(200px, 25vw)', height: 'min(150px, 18vw)', filter: "brightness(0.2)" }} />
                            <img src={glasses} alt="img5" style={{ width: 'min(150px, 18vw)', height: 'min(150px, 18vw)', filter: "brightness(0.2)" }} />
                            <img src={grill} alt="img6" style={{ width: 'min(150px, 18vw)', height: 'min(150px, 18vw)', filter: "brightness(0.2)" }} />
                        </div>
                    </div>
                </div>

              {/* Contact Section */}
              <div style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.78)',
                  minHeight: '280px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'clamp(10px, 3vw, 15px)',
                  flexWrap: 'wrap',
                  padding: 'clamp(20px, 5vw, 40px)',
                  boxSizing: 'border-box'
              }}>
                  {/* First Column - Contact Info */}
                  <div style={{
                      width: 'clamp(300px, 80vw, 375px)',
                      minHeight: '135px',
                      border: '1px solid white',
                      borderRadius: '14px',
                      color: '#b7aaa1',
                      padding: 'clamp(12px, 3vw, 16px)',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      marginTop: 'clamp(20px, 5vw, 35px)',
                      textAlign: 'center',
                      boxSizing: 'border-box'
                  }}>
                      <h3 style={{
                          color: '#0796EF',
                          fontSize: 'clamp(14px, 4vw, 16px)',
                          marginBottom: 'clamp(8px, 2vw, 12px)',
                          fontWeight: 'bold',
                          letterSpacing: '-0.5px',
                      }}>
                          CONNECT WITH US
                      </h3>
                      <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px' }} >
                          <i className="fas fa-phone" style={{ color: '#d6b854', marginRight: '10px' }}></i>
                          <span>+91 9567843340</span>
                      </p>
                      <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <i className="fas fa-envelope" style={{ color: '#d6b854', marginRight: '10px' }}></i>
                          <span>info@deepnetsoft.com</span>
                      </p>
                  </div>

                  {/* Center Column with Logo */}
                  <div style={{
                      width: 'clamp(300px, 80vw, 400px)',
                      minHeight: '135px',
                      border: '1px solid white',
                      borderRadius: '14px',
                      color: '#b7aaa1',
                      padding: 'clamp(30px, 8vw, 38px) clamp(12px, 3vw, 16px) 0',
                      textAlign: 'center',
                      position: 'relative',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      marginTop: 'clamp(20px, 5vw, 35px)',
                      boxSizing: 'border-box'
                  }}>
                      <img 
                          src={logo}
                          alt="Logo"
                          style={{
                              position: 'absolute',
                              top: 'clamp(-40px, -8vw, -52.5px)',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              height: 'clamp(80px, 15vw, 100px)',
                              backgroundColor: '#000',
                              padding: '2px',
                              borderRadius: '50%',
                              border: '1px solid white'
                          }}
                      />
                      <h3 style={{ 
                          fontSize: 'clamp(20px, 6vw, 28px)', 
                          fontWeight: 'normal', 
                          marginBottom: 'clamp(4px, 1.5vw, 6px)', 
                          letterSpacing: '0.5px', 
                          marginTop: 'clamp(10px, 3vw, 20px)' 
                      }}>
                          <span style={{ color: '#0796EF', fontWeight: 'bold' }}>DEEP</span>{' '}
                          <span style={{ color: '#ffffff' }}>NET</span>{' '}
                          <span style={{ color: '#b7aaa1', opacity: 0.6 }}>SOFT</span>
                      </h3>
                      <div style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          gap: 'clamp(6px, 1.5vw, 8px)',
                          marginTop: 'clamp(8px, 2vw, 12px)'
                      }}>
                          <img src={facebook} alt="Facebook" style={{ width: 'clamp(14px, 4vw, 16px)', filter: "invert(1) brightness(0.6)" }} />
                          <img src={twitter} alt="Twitter" style={{ width: 'clamp(14px, 4vw, 16px)', filter: "invert(1) brightness(0.6)" }} />
                          <img src={instagram} alt="Instagram" style={{ width: 'clamp(14px, 4vw, 16px)', filter: "invert(1) brightness(0.6)" }} />
                      </div>
                  </div>

                  {/* Last Column - Address */}
                  <div style={{
                      width: 'clamp(300px, 80vw, 400px)',
                      minHeight: '135px',
                      border: '1px solid white',
                      borderRadius: '14px',
                      color: '#b7aaa1',
                      padding: 'clamp(12px, 3vw, 16px)',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      marginTop: 'clamp(20px, 5vw, 35px)',
                      textAlign: 'center',
                      boxSizing: 'border-box'
                  }}>
                      <h3 style={{
                          color: '#0796EF',
                          fontSize: 'clamp(14px, 4vw, 16px)',
                          marginBottom: 'clamp(8px, 2vw, 10px)',
                          fontWeight: 'bold',
                          letterSpacing: '-0.5px'
                      }}>
                          FIND US
                      </h3>
                      <div style={{ textAlign: 'left', paddingLeft: 'clamp(20px, 5vw, 30px)' }}>
                          <p style={{ 
                              marginBottom: '6px',
                              display: 'flex',
                              alignItems: 'center'
                          }}>
                              <i className="fas fa-map-marker-alt" style={{ 
                                  color: '#d6b854', 
                                  marginRight: 'clamp(8px, 2vw, 10px)',
                                  minWidth: '16px'
                              }}></i>
                              <span>First floor, Geo Infopark,</span>
                          </p>
                          <p style={{ 
                              marginLeft: 'clamp(24px, 6vw, 30px)',
                              wordBreak: 'break-word'
                          }}>
                              Infopark EXPY, Kakkanad
                          </p>
                      </div>
                  </div>
              </div>

              {/* Footer Section */}
              <div style={{
                  backgroundColor: '#16171a',
                  minHeight: '45px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'clamp(10px, 3vw, 15px) clamp(20px, 5vw, 120px)',
                  color: '#a99c96',
                  fontSize: 'clamp(10px, 3vw, 14px)',
                  fontFamily: 'sans-serif',
                  flexWrap: 'wrap',
                  gap: 'clamp(10px, 3vw, 20px)',
                  textAlign: 'center'
              }}>
                  <div>© 2024 Deepnetsoft Solutions. All rights reserved.</div>
                  <div style={{ 
                      display: 'flex', 
                      gap: 'clamp(10px, 3vw, 20px)', 
                      cursor: 'pointer',
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                  }}>
                      <span>Terms & Conditions</span>
                      <span>Privacy Policy</span>
                  </div>
              </div>
            </div>

            {/* Add Item Popup */}
            {showAddItemPopup && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: '#222',
                padding: '20px',
                borderRadius: '8px',
                width: '400px',
                maxWidth: '90%'
              }}>
                <h3 style={{ color: '#0796EF', marginBottom: '20px' }}>Add New Menu Item</h3>
                
                {itemError && (
                  <p style={{ color: 'red', marginBottom: '15px' }}>{itemError}</p>
                )}
                
                <form onSubmit={handleAddMenuItem}>
                  {/* Add Menu Selection Dropdown */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>Select Menu</label>
                    <select
                      value={selectedMenuId || ''}
                      onChange={(e) => setSelectedMenuId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#333',
                        color: '#fff'
                      }}
                      required
                    >
                      <option value="">-- Select a Menu --</option>
                      {menus.map(menu => (
                        <option key={menu._id} value={menu._id}>
                          {menu.Menuname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>Item Name</label>
                    <input
                      type="text"
                      value={newItem.title}
                      onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #444',
                        backgroundColor: '#333',
                        color: '#fff'
                      }}
                      required
                    />
                  </div>
                                      
                                      <div style={{ marginBottom: '15px' }}>
                                          <label style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>Description</label>
                                          <textarea
                                              value={newItem.description}
                                              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                                              style={{
                                                  width: '100%',
                                                  padding: '8px',
                                                  borderRadius: '4px',
                                                  border: '1px solid #444',
                                                  backgroundColor: '#333',
                                                  color: '#fff',
                                                  minHeight: '80px'
                                              }}
                                          />
                                      </div>
                                      
                                      <div style={{ marginBottom: '20px' }}>
                                          <label style={{ display: 'block', marginBottom: '5px', color: '#ddd' }}>Price</label>
                                          <input
                                              type="number"
                                              value={newItem.price}
                                              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                                              style={{
                                                  width: '100%',
                                                  padding: '8px',
                                                  borderRadius: '4px',
                                                  border: '1px solid #444',
                                                  backgroundColor: '#333',
                                                  color: '#fff'
                                              }}
                                              step="0.01"
                                          />
                                      </div>
                                      
                                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                          <button
                                              type="button"
                                              onClick={() => setShowAddItemPopup(false)}
                                              style={{
                                                  padding: '8px 16px',
                                                  backgroundColor: '#444',
                                                  color: '#fff',
                                                  border: 'none',
                                                  borderRadius: '4px',
                                                  cursor: 'pointer'
                                              }}
                                          >
                                              Cancel
                                          </button>
                                          <button
                                              type="submit"
                                              style={{
                                                  padding: '8px 16px',
                                                  backgroundColor: '#0796EF',
                                                  color: '#fff',
                                                  border: 'none',
                                                  borderRadius: '4px',
                                                  cursor: 'pointer'
                                              }}
                                          >
                                              Add Item
                                          </button>
                                      </div>
                                  </form>
                              </div>
                          </div>
            )}
        </div>
    );
};

export default Menu;