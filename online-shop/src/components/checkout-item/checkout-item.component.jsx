import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {

    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

    const { name, price, quantity, imageUrl } = cartItem;

    const clearItemhandler = () => clearItemFromCart(cartItem);
    const addItemhandler = () => addItemToCart(cartItem);
    const removeItemhandler = () => removeItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemhandler}>&#10094;</div>
                    <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemhandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemhandler}>&#10005;</div>
        </div>
    );
};

export default CheckoutItem;