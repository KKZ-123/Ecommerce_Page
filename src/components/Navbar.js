import React from 'react';

const Navbar = ({ cartCount, onOpenCart, user, onProfileClick, onLogoClick, onSearch, onCategoryChange, searchTerm, selectedCategory }) => {
    const categories = ['All', 'Groceries', 'Fruits', 'Vegetables', 'Beverages'];

    return (
        <nav className="navbar glass">
            <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                <div className="logo-icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </div>
                <span className="logo-text">Fresh<span className="logo-accent">Mart</span></span>
            </div>

            <div className="nav-center">
                <div className="search-container">
                    <div className="search-box">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input
                            type="text"
                            placeholder="Search fresh items..."
                            value={searchTerm}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="category-filter"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="nav-actions">
                <div className="user-action" onClick={onProfileClick} title="Profile">
                    {user ? (
                        <div className="user-avatar-sm">
                            {user.name[0].toUpperCase()}
                        </div>
                    ) : (
                        <div className="nav-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                    )}
                </div>
                <div className="cart-action" onClick={onOpenCart} title="Cart">
                    <div className="nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                        {cartCount > 0 && <span className="cart-badge-new">{cartCount}</span>}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
