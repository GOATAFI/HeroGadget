import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Cards/ProductCard';
import { addToDb } from '../utils/fakeDb';
import { CartContext, ProductContext } from '../App';

const Shop = () => {
    const products = useContext(ProductContext);
    const [cart, setCart] = useContext(CartContext);
    const handleAddToCart = (product) => {
        let newCart = [];
        const exist = cart.find(existingProduct => existingProduct.id === product.id)
        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            const rest = cart.filter(existingProduct => existingProduct.id !== product.id)
            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist]
        }
        setCart(newCart);
        addToDb(product.id);
    }
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 m-12 mb-8'>
            {
                products.map(product => (
                    <ProductCard key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></ProductCard>
                ))
            }
        </div>
    );
};

export default Shop;