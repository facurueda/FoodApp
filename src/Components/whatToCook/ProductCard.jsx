import React from 'react';
import './ProductCard.css'

const ProductCard = ({productPhoto, productName}) => {
      return (
            <div className='productCardContainer'>
                  <img src={productPhoto} alt='productPhoto' className='productImage'/>
                  <label className='productName'>{productName}</label>
            </div>
      )
}

export default ProductCard;