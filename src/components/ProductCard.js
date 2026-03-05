import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={product.thumbnail} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <div className="product-category">{product.brand || 'Fresh'}</div>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price-row">
                    <span className="product-price">${product.price}</span>
                    <button className="add-btn" onClick={() => onAddToCart(product)}>+</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
