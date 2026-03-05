import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, onAddToCart }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
