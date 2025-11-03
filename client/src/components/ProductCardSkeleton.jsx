import React from 'react';
import './ProductCardSkeleton.css';

const ProductCardSkeleton = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-image"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text-short"></div>
            <div className="skeleton-footer">
                <div className="skeleton skeleton-price"></div>
                <div className="skeleton skeleton-button"></div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
