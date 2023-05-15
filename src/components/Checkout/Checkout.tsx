import './_checkout.scss';
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  quantity: number;
}

interface CheckoutProps {
  items?: Item[];
}

export function Checkout({ items }: CheckoutProps) {
  const [cartItems, setCartItems] = useState<Item[]>(items || []);
  const calculateShippingCost = () => {
	const baseCost = 5;
	const additionalCostPerThreeItems = 2;
	const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
	const additionalCost = Math.floor(totalItems / 3) * additionalCostPerThreeItems;
	return baseCost + additionalCost;
  };
  const [shippingCost, setShippingCost] = useState<number>(calculateShippingCost());

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const updateQuantity = (itemId: number, change: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
	setShippingCost(calculateShippingCost());
  };
  return (
    <div className="page-wrapper">
      <h1>Checkout</h1>
      <div className="checkout">
        <form className="checkout__form">
          <div className="checkout__form__contact">
            <h2 className="checkout__form__title">Contact Information</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" name="phone" />
          </div>
          <div className="checkout__form__shipping">
            <h2 className="checkout__form__title">Shipping Address</h2>
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" />
            <label htmlFor="address">Address</label>
            <input
              placeholder="Type your adress here"
              type="text"
              id="address"
              name="address"
            />
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" />
            <label htmlFor="postalcode">Postal Code</label>
            <input type="text" id="postalcode" name="postalcode" />
          </div>
          <button className="checkout__form__submit">Continue</button>
        </form>
        <div className="checkout__cart">
          {cartItems && Array.isArray(cartItems) && cartItems.length > 0 ? (
            <ul className="checkout__cart__items">
              {cartItems.map((item) => (
                <li className="checkout__cart__item" key={item.id}>
                  <img
                    className="checkout__cart__item__image"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="checkout__cart__item__details">
                    <span className="checkout__cart__item__name">
                      {item.name}
                    </span>
                    <div className="checkout__cart__item__details__price">
                      <span className="checkout__cart__item__details__price__new">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="checkout__cart__item__details__price__old">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="checkout__cart__item__quantity">
					<button
                        className="checkout__cart__item__quantity__button"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className='checkout__cart__item__quantity__nmbr'>{item.quantity}</span>
                      <button
                        className="checkout__cart__item__quantity__button"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart</p>
          )}
          <div className="checkout__cart__summary">
            <div className="checkout__cart__summary__row">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <hr />
            <div className="checkout__cart__summary__row">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <hr />
            <div className="checkout__cart__summary__row checkout__cart__summary__row--total">
              <span>Total</span>
              <span>${(calculateSubtotal() + shippingCost).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}