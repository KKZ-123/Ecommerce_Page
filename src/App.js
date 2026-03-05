import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CheckoutReceipt from './components/CheckoutReceipt';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // New States for Auth and Routing
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [pendingCart, setPendingCart] = useState([]);
  const [pendingTotal, setPendingTotal] = useState('0.00');

  // New States for Search and Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/groceries')
      .then(res => res.json())
      .then(data => {
        const fetchedProducts = data.products || [];
        const tangerine = {
          id: 9991,
          title: 'Fresh Tangerine',
          price: 2.99,
          thumbnail: '/tangerine.png',
          brand: 'Nature Choice',
          category: 'Fruits'
        };

        // Map products to categorized groups for filtering
        const categorizedProducts = fetchedProducts.map(p => {
          const title = p.title.toLowerCase();
          if (title.includes('juice') || title.includes('tea') || title.includes('water')) return { ...p, category: 'Beverages' };
          if (title.includes('potato') || title.includes('onion') || title.includes('carrot')) return { ...p, category: 'Vegetables' };
          return { ...p, category: 'Groceries' };
        });

        setProducts([tangerine, ...categorizedProducts]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleOpenCart = () => {
    if (!user) {
      setCurrentPage('login');
    } else {
      setIsCartOpen(true);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setCart([]);
    setOrderHistory([]);
  };

  const handleCheckout = () => {
    setPendingCart([...cart]);
    setPendingTotal(cartTotal);
    setIsCartOpen(false);
    setShowReceipt(true);
  };

  const handleConfirmOrder = (orderData) => {
    setOrderHistory(prev => [orderData, ...prev]);
    setCart([]);
    setShowReceipt(false);
    setCurrentPage('profile');
  };

  const handleProfileClick = () => {
    if (user) {
      setCurrentPage('profile');
    } else {
      setCurrentPage('login');
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);

  // Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} orderHistory={orderHistory} />;
      default:
        return (
          <>
            <Hero />
            <main className="container">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onAddToCart={addToCart}
              />
            </main>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        onOpenCart={handleOpenCart}
        user={user}
        onProfileClick={handleProfileClick}
        onLogoClick={() => setCurrentPage('home')}
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />

      {renderPage()}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCheckout={handleCheckout}
      />

      {showReceipt && (
        <CheckoutReceipt
          cart={pendingCart}
          total={pendingTotal}
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowReceipt(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
