import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

function OrderSummaryItem({ cartItem, deliveryOptions, loadCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem.quantity]);

  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity,
      deliveryOptionId: cartItem.deliveryOptionId
    });
    await loadCart();
  };

  const deliveryDate = selectedDeliveryOption
    ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
    : 'Unknown';

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {deliveryDate}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">
            {cartItem.product.name}
          </div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <label>
              Quantity:
              <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                {[...Array(10)].map((_, index) => {
                  const value = index + 1;
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </label>
            <button type="button" className="update-quantity-link link-primary" onClick={updateCartItem}>
              Update
            </button>
            <button type="button" className="delete-quantity-link link-primary" onClick={deleteCartItem}>
              Delete
            </button>
          </div>
        </div>

        <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
      </div>
    </div>
  );
}

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => (
        <OrderSummaryItem
          key={cartItem.productId}
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      ))}
    </div>
  );
}
