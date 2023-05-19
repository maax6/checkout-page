import './_checkout.scss';
import { useState } from 'react';
import {
   MdEmail,
   MdPhone,
   MdLocationOn,
   MdLocalShipping,
} from 'react-icons/md';
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
      const baseCost = 19;
      const additionalCostPerThreeItems = 6.5;
      const totalItems = cartItems.reduce(
         (total, item) => total + item.quantity,
         0
      );
      const additionalCost =
         Math.floor(totalItems / 3) * additionalCostPerThreeItems;
      return baseCost + additionalCost;
   };
   const [shippingCost, setShippingCost] = useState<number>(
      calculateShippingCost()
   );

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
                  <div className="input-group">
                     <label htmlFor="email">Email</label>
                     <div className="input-field-group">
                        <MdEmail className="input-icon" />
                        <input
                           className="input-field"
                           placeholder="Enter your email..."
                           type="email"
                           id="email"
                           name="email"
                        />
                     </div>
                  </div>
                  <label htmlFor="phone">Phone</label>
                  <div className="input-field-group">
                     <MdEmail className="input-icon" />
                     <input
                        className="input-field"
                        placeholder="Enter your phone..."
                        type="text"
                        id="phone"
                        name="phone"
                     />
                  </div>
               </div>
               <div className="checkout__form__shipping">
                  <h2 className="checkout__form__title">Shipping Address</h2>
                  <label placeholder="Your Name..." htmlFor="fullname">
                     Full Name:
                  </label>
                  <div className="input-field-group">
                     <MdEmail className="input-icon" />
                     <input
                        className="input-field"
                        placeholder="Your Name.."
                        type="text"
                        id="fullname"
                        name="fullname"
                     />
                  </div>
                  <label htmlFor="address">Address</label>
                  <div className="input-field-group">
                     <MdEmail className="input-icon" />
                     <input
                        className="input-field"
                        placeholder="Your adress.."
                        type="text"
                        id="address"
                        name="address"
                     />
                  </div>
                  <label htmlFor="city">City</label>
                  <div className="input-field-group">
                     <MdEmail className="input-icon" />
                     <input
                        className="input-field"
                        placeholder="Your city.."
                        type="text"
                        id="city"
                        name="city"
                     />
                  </div>
                  <div className="checkout__form__row">
                     <div className="checkout__form__column">
                        <label htmlFor="country">Country</label>
                        <div className="input-field-group">
                           <MdEmail className="input-icon" />
                           <input
                              className="input-field"
                              placeholder="your country.."
                              type="text"
                              id="country"
                              name="country"
                           />
                        </div>
                     </div>
                     <div className="checkout__form__column">
                        <label htmlFor="postalcode">Postal Code</label>
                        <div className="input-field-group">
                           <MdEmail className="input-icon" />
                           <input
                              className="input-field"
                              placeholder="Your postal code.."
                              type="text"
                              id="postalcode"
                              name="postalcode"
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <button className="checkout__form__submit">Continue</button>
            </form>
            <div className="checkout__cart">
               {cartItems &&
               Array.isArray(cartItems) &&
               cartItems.length > 0 ? (
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
                                 <span className="checkout__cart__item__quantity__nmbr">
                                    {item.quantity}
                                 </span>
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
                     <span>
                        ${(calculateSubtotal() + shippingCost).toFixed(2)}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
