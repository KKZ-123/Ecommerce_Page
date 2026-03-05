import React, { useState } from 'react';

const Profile = ({ user, onLogout, orderHistory = [] }) => {
    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="profile-container">
            <div className="profile-card glass">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="profile-info">
                        <h2>{user.name || 'User'}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">{orderHistory.length}</span>
                        <span className="stat-label">Orders</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">5</span>
                        <span className="stat-label">Wishlist</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">2</span>
                        <span className="stat-label">Reviews</span>
                    </div>
                </div>

                <div className="order-history-section">
                    <h3>Order History</h3>
                    <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>Click an order to view details</p>
                    {orderHistory.length === 0 ? (
                        <p className="no-orders text-muted">You haven't placed any orders yet.</p>
                    ) : (
                        <div className="orders-list">
                            {orderHistory.map(order => (
                                <div
                                    key={order.id}
                                    className={`order-history-card ${expandedOrder === order.id ? 'expanded' : ''}`}
                                    onClick={() => toggleOrder(order.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="order-history-header">
                                        <span className="order-history-id">Order #{order.id}</span>
                                        <span className="order-history-date">{order.date}</span>
                                    </div>
                                    <div className="order-history-details">
                                        <span className="order-history-items">{order.items.length} items</span>
                                        <span className="order-history-total">${order.total}</span>
                                    </div>

                                    {expandedOrder === order.id && (
                                        <div className="order-expanded-details">
                                            <h4>Items Purchased</h4>
                                            <div className="order-items-mini-list">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="order-mini-item">
                                                        <img src={item.thumbnail} alt={item.title} className="mini-item-img" />
                                                        <div className="mini-item-info">
                                                            <span className="mini-item-name">{item.title}</span>
                                                            <span className="mini-item-meta">{item.quantity} x ${item.price}</span>
                                                        </div>
                                                        <span className="mini-item-total">${(item.quantity * item.price).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="profile-menu" style={{ marginTop: '30px' }}>
                    <button className="menu-item logout" onClick={onLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
