import React from 'react';

const CheckoutReceipt = ({ cart, total, onConfirm, onCancel }) => {
    const orderNumber = Math.floor(Math.random() * 90000) + 10000;
    const date = new Date().toLocaleDateString();

    return (
        <div className="receipt-overlay">
            <div className="receipt-card glass">
                <div className="receipt-header">
                    <div className="receipt-logo">🛒 MiniMart</div>
                    <h2>Payment Receipt</h2>
                    <p className="order-id">Order ID: #{orderNumber}</p>
                    <p className="order-date">{date}</p>
                </div>

                <div className="receipt-items">
                    {cart.map(item => (
                        <div key={item.id} className="receipt-item">
                            <div className="item-detail">
                                <span className="item-name">{item.title}</span>
                                <span className="item-qty">x{item.quantity}</span>
                            </div>
                            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="receipt-summary">
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${total}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax (0%)</span>
                        <span>$0.00</span>
                    </div>
                    <div className="summary-row total">
                        <span>Paid Amount</span>
                        <span>${total}</span>
                    </div>
                </div>

                <div className="receipt-footer">
                    <button className="confirm-btn" onClick={() => onConfirm({ id: orderNumber, date, total, items: cart })}>
                        Confirm & Save to History
                    </button>
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutReceipt;
