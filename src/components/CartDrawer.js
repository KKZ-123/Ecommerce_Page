import React from 'react';
import CartItem from './CartItem';

const CartDrawer = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, cartCount, cartTotal, onCheckout }) => {
    return (
        <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className="cart-drawer" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Your Cart ({cartCount})</h2>
                    <button
                        className="close-btn nav-icon"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
                            Your cart is empty
                        </div>
                    ) : (
                        cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemove}
                            />
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total</span>
                        <span>${cartTotal}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        disabled={cart.length === 0}
                        style={{ cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}
                        onClick={onCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
