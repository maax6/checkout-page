import './_checkout.scss';

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CheckoutProps {
  items?: Item[];
}

export function Checkout({ items }: CheckoutProps) {
  return (
    <div className="page-wrapper">
      <h1>Checkout</h1>
      <div className="checkout">
        <form className="checkout__form">
          <div className="checkout__form__contact">
            <h2 className="checkout__form__title">Contact Information</h2>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" />
          </div>
          <div className="checkout__form__shipping">
            <h2 className="checkout__form__title">Shipping Address</h2>
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" />
            <label htmlFor="address">Address:</label>
            <input
              placeholder="Type your adress here"
              type="text"
              id="address"
              name="address"
            />
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" />
            <label htmlFor="country">Country:</label>
            <input type="text" id="country" name="country" />
            <label htmlFor="postalcode">Postal Code:</label>
            <input type="text" id="postalcode" name="postalcode" />
          </div>
          <button className="checkout__form__submit">Continue</button>
        </form>
        <div className="checkout__cart">
          <h2 className="checkout__cart__title">Shopping Cart</h2>
          {items && Array.isArray(items) && items.length > 0 ? (
            <ul className="checkout__cart__items">
              {items.map((item) => (
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
                    <span className="checkout__cart__item__price">
                      <span className="checkout__cart__item__price__old">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="checkout__cart__item__price__new">
                        ${(item.price * 0.8).toFixed(2)}
                      </span>
                    </span>
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
              <span>40.00</span>
            </div>
            <hr />
            <div className="checkout__cart__summary__row">
              <span>Shipping</span>
              <span>5.00</span>
            </div>
            <hr />
            <div className="checkout__cart__summary__row checkout__cart__summary__row--total">
              <span>Total</span>
              <span>45.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
