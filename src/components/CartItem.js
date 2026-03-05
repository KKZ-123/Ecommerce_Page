import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-item-img" />
            <div className="cart-item-info">
                <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{item.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700' }}>${item.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            style={{ padding: '2px 8px', cursor: 'pointer' }}
                        >
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            style={{ padding: '2px 8px', cursor: 'pointer' }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <button
                onClick={() => onRemove(item.id)}
                style={{ background: 'none', border: 'none', color: '#ef4444', height: 'fit-content', cursor: 'pointer' }}
            >
                🗑️
            </button>
        </div>
    );
};

export default CartItem;
