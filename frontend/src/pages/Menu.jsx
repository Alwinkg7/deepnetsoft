import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg1.jpeg'; // Adjust the path as necessary
import backgroundImage2 from '../assets/bg2.png'; // Adjust the path as necessary
import backgroundImage3 from '../assets/bg3.png'; // Adjust the path as necessary
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
import menuTitle from '../assets/menu.png'; // Adjust the path as necessary
import AddMenuForm from './AddMenuForm'; // Adjust the path as necessary
import AddMenuItemForm from './AddMenuItemForm'; // Adjust the path as necessary
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
        try {
            const res = await axios.get(`http://localhost:5000/api/menu-items/${menuId}`);
            setMenuItems(res.data.data || []);
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setMenuItems([]);
        }
    };

    const handleMenuClick = (menuId) => {
        setSelectedMenuId(menuId);
        fetchMenuItems(menuId);
    };

    const handleAddMenu = async () => {
        // Check if the new menu name is not empty
        if (!newMenuName.trim()) return;
      
        try {
          // Sending a POST request to the backend to add a new menu
          const response = await axios.post('http://localhost:5000/api/menus', { Menuname: newMenuName });
      
          // If the response is successful, update the menus list
          if (response.status === 201) {
            // Assuming the newly created menu is returned in response.data
            setMenus((prevMenus) => [...prevMenus, response.data]);
      
            // Clear the input field and close the input section
            setNewMenuName('');
            setShowAddInput(false);
          }
        } catch (error) {
          console.error("Error adding menu:", error);
          // You can show an error message to the user if something goes wrong
        }
      };
      

      const handleAddMenuItem = async (e) => {
        e.preventDefault();
        setItemError('');
    
        // Validate selected menu exists
        if (!selectedMenuId) {
            setItemError('Please select a menu first');
            return;
        }
    
        // Field validation
        if (!newItem.title.trim()) {
            setItemError('Item name is required');
            return;
        }
        if (!newItem.price || isNaN(newItem.price) || parseFloat(newItem.price) <= 0) {
            setItemError('Please enter a valid price');
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/menu-items", {
                name: newItem.title.trim(),       
                description: newItem.description.trim(),
                price: parseFloat(newItem.price),
                menuId: selectedMenuId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Refresh the items list
            fetchMenuItems(selectedMenuId);
            setShowAddItemPopup(false);
            setNewItem({ title: '', description: '', price: '' });
    
        } catch (error) {
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
    
            const errorMessage = error.response?.data?.message || 
                                'Failed to add item. Please try again.';
            setItemError(errorMessage);
        }
    };
    

    useEffect(() => {
        fetchMenus();
        if (menuId) {
            handleMenuClick(menuId);
        }
    }, [menuId]);

  
  return (
    <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 22.5px', // shifted 80px down
            minHeight: '100vh',
            paddingTop: '60px' // match your navbar height
          }}
        >
                  <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // transparent dark background
                minHeight: '100vh', marginTop: '-60px'
          }}>

            <div className="flex flex-col items-center text-center px-4" >
            <img
                src={menuTitle}
                alt="Menu"
                style={{ width: '180px', height: 'auto', marginTop: '133.2px' }}
                
            />

            <p style={{
                fontSize: '20px',
                color: '#ddd',
                maxWidth: '681px',
                maxHeight: '44px',
                top: '287px',
                left: '380px',
                fontFamily: "Kelly-Slab", 
                fontStyle: "normal", 
                fontWeight: 400,
                letterSpacing: '0.3px',
                color: "#BBBBBB",
                marginTop: '20px',
                lineHeight: '1.1',

            }}>
                Please take a look at our menu featuring food, drinks, and brunch.If you'd like to<br/> place an order, use the "Order Online" button located below the menu.
            </p>
            </div>

            <div style={{
            backgroundImage: `url(${backgroundImage2})`,
            marginTop: '70px',
            height: '80px',
            
            backgroundSize: 'contain'
          }}>
<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)', height: '80px' }}>
  {loading ? (
    <p className="text-center">Loading menus...</p>
  ) : menus.length === 0 ? (
    <p className="text-center text-red-400">No menus found.</p>
  ) : (
    <div className="flex justify-center gap-4 flex-wrap">
      {menus.map((menu) => (
        <button
          key={menu._id}
          onClick={() => handleMenuClick(menu._id)}
          className="px-6 py-2 border-2 border-white hover:bg-blue-600 transition-colors"
          style={{
            width: '114.25px',
            height: '49.98px',
            border: '0.32px solid #0796EF',
            backgroundColor: selectedMenuId === menu._id ? '#0796EF' : 'black',
            color: '#fff',
            borderRadius: '1px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px',
            marginTop: '15px',
          }}
        >
          {menu.Menuname?.toUpperCase() || 'Unnamed'}
        </button>
      ))}

      {/* Add Menu Button */}
      {!showAddInput ? (
        <button
          onClick={() => setShowAddInput(true)}
          style={{
            width: '70px',
            height: '40px',
            backgroundColor: '#0796EF',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '24px',
            border: '0.32px solid #0796EF',
            marginTop: '15px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ADD
        </button>
      ) : (
        <div className="flex items-center gap-2 mt-3" style={{ marginLeft: '10px' }}>
          <input
            type="text"
            placeholder="Menu name"
            value={newMenuName}
            onChange={(e) => setNewMenuName(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: '1px solid #0796EF',
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#000',
            }}
            autoFocus
          />
          <button
            onClick={handleAddMenu}
            style={{
                width: '70px',
                height: '40px',
                backgroundColor: '#0796EF',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '24px',
                border: '0.32px solid #0796EF',
                marginTop: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            disabled={!newMenuName.trim()}
          >
            Add
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
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0 8px',
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )}

  {/* Display menu items for the selected menu */}
  {selectedMenuId && menuItems.length > 0 && (
    <div style={{ marginTop: '20px' }}>
      <h2 className="text-center text-white">Menu Items</h2>
      <div className="flex justify-center gap-4 flex-wrap">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-md shadow-lg"
            style={{ width: '200px', textAlign: 'center' }}
          >
            <h3 className="text-lg font-bold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="font-semibold">Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


            </div>

            <div
            style={{
                backgroundImage: `url(${backgroundImage3})`,
                height: '680px',
                backgroundSize: 'auto',
                position: 'relative',
            }}
            >
            <div
                style={{
                backgroundColor: 'rgba(0, 0, 0, 0.78)',
                height: '680px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0',
                overflow: 'hidden', width: '100%'

                }}
            >
                {/* Left side - 3 images vertically */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', transform: 'translateX(-25px)' }}>
                <img src={ turkey } alt="img1" style={{ width: '150px', height: '150px', filter: "brightness(0.2)" }} />
                <img src={ wine } alt="img2" style={{ width: '150px', height: '150px', filter: "brightness(0.2)" }} />
                <img src={ pizza } alt="img3" style={{ width: '200px', height: '200px', marginTop: '70px', filter: "brightness(0.2)", marginLeft: '-60px'}} />
                </div>

                {/* Center box */}
                <div 
                style={{
                    position: 'relative', // Make this container the reference for absolute children
                    border: '2px solid white',
                    padding: '30px',
                    height: '400px',
                    width: '100%',
                    maxWidth: '1170px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    margin: '0 auto',
                }}
                >
                {/* Corner Images */}
                <img 
                    src= {drink} 
                    alt="Cocktail Left" 
                    style={{
                    position: 'absolute',
                    top: '-147.5px',
                    left: '-55px',
                    height: '281px',
                    width: '190px',
                    }}
                />
                <img 
                    src= {drink2} 
                    alt="Cocktail Right" 
                    style={{
                    position: 'absolute',
                    bottom: '-50px',
                    right: '-2.5px',
                    height: '330px',
                    width: '220px',
                    }}
                />

                {/* Heading */}
                <img src={brunch} alt="Menu" style={{ width: '850px', height: '90px', marginTop: '0px', position: 'absolute', top: '50px' }}/>
                
                <div style={{ 
  maxHeight: '400px',
  overflowY: 'auto', 
  width: '100%', 
  padding: '20px',
  color: '#ddd',
  fontFamily: "'Inter', sans-serif",
  backgroundColor: 'transparent',
  borderRadius: '12px',
  boxSizing: 'border-box',
  position: 'relative',
  marginTop: '60px', // Adjusted to position below the heading
}}>
  {/* Menu Items List */}
  {menuItems.length > 0 ? (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
      gap: '16px',
      paddingBottom: '140px' // Increased bottom padding to give space for the button
    }}>
      {menuItems.map(item => (
        <div key={item._id} style={{ 
          padding: '16px',
          borderRadius: '8px',
          transition: 'all 0.2s ease',
          ':hover': {
            backgroundColor: 'rgba(7, 150, 239, 0.1)',
            transform: 'translateX(2px)'
          }
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '10px'
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
                letterSpacing: '0.5px',
                display: 'inline-block',
                flex: 1, // Allow title to take full width
                whiteSpace: 'normal', // Allow wrapping of long names
              }}>
                {item.name}
              </span>
              <span style={{
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '4px',
                margin: '0 8px',
                flexShrink: 0,
                fontSize: '12px'
              }}>
                •••••••••••••••••••••••
              </span>
            </div>
            <div style={{ 
              color: '#0796EF', 
              fontWeight: 'bold', 
              fontSize: '20px',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}>
              ${item.price}
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
      gap: '16px'
    }}>
      <div style={{
        fontSize: '18px',
        fontStyle: 'italic'
      }}>
        No items available for this category.
      </div>
    </div>
  )}

  {/* Persistent Add Item Button */}
  <div style={{
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 40px)',  // Full width minus padding
    padding: '0 20px',  // Add padding to left and right
    display: 'flex',
    justifyContent: 'center',
    zIndex: 100
  }}>
  <button
  onClick={() => {
    console.log("Add Item button clicked!"); // This will help debug if the click is being registered
    setShowAddItemPopup(true); // This should trigger the popup
  }}
  style={{
    padding: '8px 16px',  // Reduced padding
    backgroundColor: '#0796EF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px', // Smaller font size
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  }}
>
  + Add Item
</button>

  </div>
</div>






                {/* Content goes here */}
                </div>


                {/* Right side - 3 images vertically */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', transform: 'translateX(70px)' }}>
                <img src={ fish } alt="img4" style={{ width: '200px', height: '150px', filter: "brightness(0.2)" }} />
                <img src={ glasses } alt="img5" style={{ width: '150px', height: '150px', filter: "brightness(0.2)" }} />
                <img src={ grill } alt="img6" style={{ width: '150px', height: '150px', filter: "brightness(0.2)" }} />
                </div>

        </div>
    </div>

    </div>
    <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        height: '280px', // reduced height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        }}>
        {/* First Column */}
        <div style={{
        width: '375px',
        height: '135px',
        border: '1px solid white',
        borderRadius: '14px',
        color: '#b7aaa1',
        padding: '16px',
        fontSize: '14px',
        marginTop: '35px',
        textAlign: 'center'
        }}>
        <h3 style={{
            color: '#0796EF',
            fontSize: '16px',
            marginBottom: '12px',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            
        }}>
            CONNECT WITH US
        </h3>

        <p style={{  alignItems: 'center', marginBottom: '8px' }} >
            <i className="fas fa-phone" style={{ color: '#d6b854', marginRight: '10px' }}></i>
            <span>+91 9567843340</span>
        </p>

        <p style={{ alignItems: 'center', textAlign: 'center' }}>
            <i className="fas fa-envelope" style={{ color: '#d6b854', marginRight: '10px' }}></i>
            <span>info@deepnetsoft.com</span>
        </p>
        </div>



  {/* Center Column with Logo */}
  <div style={{
    width: '400px',
    height: '135px',
    border: '1px solid white',
    borderRadius: '14px',
    color: '#b7aaa1',
    paddingTop: '38px',
    textAlign: 'center',
    position: 'relative',
    fontSize: '14px',
    marginTop: '35px', // added marginTop for spacing

  }}>
    <img 
      src={logo}
      alt="Logo"
      style={{
        position: 'absolute',
        top: '-52.5px',
        left: '50%',
        right: '50%',
        transform: 'translateX(-50%)',
        height: '100px',
        backgroundColor: '#000',
        padding: '-1px',
        borderRadius: '50%'
      }}
    />
    <h3 style={{ fontSize: '28px', fontWeight: 'normal', marginBottom: '6px', letterSpacing: '0.5px', marginTop: '20px' }}>
    <span style={{ color: '#0796EF', fontWeight: 'bold' }}>DEEP</span>{' '}
    <span style={{ color: '#ffffff' }}>NET</span>{' '}
    <span style={{ color: '#b7aaa1', opacity: 0.6 }}>SOFT</span>
    </h3>

    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
      <img src={facebook} alt="Facebook" style={{ width: '16px', filter: "invert(1) brightness(0.6)" }} />
      <img src={twitter} alt="twitter" style={{ width: '16px', filter: "invert(1) brightness(0.6)" }} />
      <img src={instagram} alt="Instagram" style={{ width: '16px', filter: "invert(1) brightness(0.6)" }} />
      <img src={twitter} alt="Twitter" style={{ width: '16px', filter: "invert(1) brightness(0.6)" }} />
    </div>
  </div>

  {/* Last Column */}
  <div style={{
  width: '400px',
  height: '135px',
  border: '1px solid white',
  borderRadius: '14px',
  color: '#b7aaa1',
  padding: '16px',
  fontSize: '14px',
  marginTop: '35px',
  textAlign: 'center'
}}>
  <h3 style={{
    color: '#0796EF',
    fontSize: '16px',
    marginBottom: '10px',
    fontWeight: 'bold',
    letterSpacing: '-0.5px'
  }}>
    FIND US
  </h3>

  <p style={{ marginBottom: '6px' }}>
    <i class="fas fa-map-marker-alt" style={{ color: '#d6b854', marginRight: '10px' }}></i>
    <span style={{ marginLeft: '20px' }}>First floor, Geo Infopark,</span>
  </p>

  <p style={{ marginLeft: '45px' }}>Infopark EXPY, Kakkanad</p>
</div>



</div>



    {/* Footer Section */}

    <div style={{
        backgroundColor: '#16171a',
        height: '45px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 120px',
        color: '#a99c96', // updated text color
        fontSize: '14px',
        fontFamily: 'sans-serif'
        }}>
        <div>© 2024 Deepnetsoft Solutions. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
        </div>
        </div>



    </div>
    
  );
};

export default Menu;
