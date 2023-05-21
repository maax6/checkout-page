import './_checkout.scss';
import { useState } from 'react';
import {
   MdEmail,
   MdPhone,
   MdLocationCity,
   MdMarkunreadMailbox,
} from 'react-icons/md';
import { IoMdContact } from 'react-icons/io';
import { HiHome } from 'react-icons/hi';
import { RiEarthFill } from 'react-icons/ri';
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
const countries = [
   'Afghanistan',
   'Åland Islands',
   'Albania',
   'Algeria',
   'American Samoa',
   'Andorra',
   'Angola',
   'Anguilla',
   'Antarctica',
   'Antigua and Barbuda',
   'Argentina',
   'Armenia',
   'Aruba',
   'Australia',
   'Austria',
   'Azerbaijan',
   'Bahamas (the)',
   'Bahrain',
   'Bangladesh',
   'Barbados',
   'Belarus',
   'Belgium',
   'Belize',
   'Benin',
   'Bermuda',
   'Bhutan',
   'Bolivia (Plurinational State of)',
   'Bonaire, Sint Eustatius and Saba',
   'Bosnia and Herzegovina',
   'Botswana',
   'Bouvet Island',
   'Brazil',
   'British Indian Ocean Territory (the)',
   'Brunei Darussalam',
   'Bulgaria',
   'Burkina Faso',
   'Burundi',
   'Cabo Verde',
   'Cambodia',
   'Cameroon',
   'Canada',
   'Cayman Islands (the)',
   'Central African Republic (the)',
   'Chad',
   'Chile',
   'China',
   'Christmas Island',
   'Cocos (Keeling) Islands (the)',
   'Colombia',
   'Comoros (the)',
   'Congo (the Democratic Republic of the)',
   'Congo (the)',
   'Cook Islands (the)',
   'Costa Rica',
   'Croatia',
   'Cuba',
   'Curaçao',
   'Cyprus',
   'Czechia',
   "Côte d'Ivoire",
   'Denmark',
   'Djibouti',
   'Dominica',
   'Dominican Republic (the)',
   'Ecuador',
   'Egypt',
   'El Salvador',
   'Equatorial Guinea',
   'Eritrea',
   'Estonia',
   'Eswatini',
   'Ethiopia',
   'Falkland Islands (the) [Malvinas]',
   'Faroe Islands (the)',
   'Fiji',
   'Finland',
   'France',
   'French Guiana',
   'French Polynesia',
   'French Southern Territories (the)',
   'Gabon',
   'Gambia (the)',
   'Georgia',
   'Germany',
   'Ghana',
   'Gibraltar',
   'Greece',
   'Greenland',
   'Grenada',
   'Guadeloupe',
   'Guam',
   'Guatemala',
   'Guernsey',
   'Guinea',
   'Guinea-Bissau',
   'Guyana',
   'Haiti',
   'Heard Island and McDonald Islands',
   'Holy See (the)',
   'Honduras',
   'Hong Kong',
   'Hungary',
   'Iceland',
   'India',
   'Indonesia',
   'Iran (Islamic Republic of)',
   'Iraq',
   'Ireland',
   'Isle of Man',
   'Israel',
   'Italy',
   'Jamaica',
   'Japan',
   'Jersey',
   'Jordan',
   'Kazakhstan',
   'Kenya',
   'Kiribati',
   "Korea (the Democratic People's Republic of)",
   'Korea (the Republic of)',
   'Kuwait',
   'Kyrgyzstan',
   "Lao People's Democratic Republic (the)",
   'Latvia',
   'Lebanon',
   'Lesotho',
   'Liberia',
   'Libya',
   'Liechtenstein',
   'Lithuania',
   'Luxembourg',
   'Macao',
   'Madagascar',
   'Malawi',
   'Malaysia',
   'Maldives',
   'Mali',
   'Malta',
   'Marshall Islands (the)',
   'Martinique',
   'Mauritania',
   'Mauritius',
   'Mayotte',
   'Mexico',
   'Micronesia (Federated States of)',
   'Moldova (the Republic of)',
   'Monaco',
   'Mongolia',
   'Montenegro',
   'Montserrat',
   'Morocco',
   'Mozambique',
   'Myanmar',
   'Namibia',
   'Nauru',
   'Nepal',
   'Netherlands (the)',
   'New Caledonia',
   'New Zealand',
   'Nicaragua',
   'Niger (the)',
   'Nigeria',
   'Niue',
   'Norfolk Island',
   'Northern Mariana Islands (the)',
   'Norway',
   'Oman',
   'Pakistan',
   'Palau',
   'Palestine, State of',
   'Panama',
   'Papua New Guinea',
   'Paraguay',
   'Peru',
   'Philippines (the)',
   'Pitcairn',
   'Poland',
   'Portugal',
   'Puerto Rico',
   'Qatar',
   'Republic of North Macedonia',
   'Romania',
   'Russian Federation (the)',
   'Rwanda',
   'Réunion',
   'Saint Barthélemy',
   'Saint Helena, Ascension and Tristan da Cunha',
   'Saint Kitts and Nevis',
   'Saint Lucia',
   'Saint Martin (French part)',
   'Saint Pierre and Miquelon',
   'Saint Vincent and the Grenadines',
   'Samoa',
   'San Marino',
   'Sao Tome and Principe',
   'Saudi Arabia',
   'Senegal',
   'Serbia',
   'Seychelles',
   'Sierra Leone',
   'Singapore',
   'Sint Maarten (Dutch part)',
   'Slovakia',
   'Slovenia',
   'Solomon Islands',
   'Somalia',
   'South Africa',
   'South Georgia and the South Sandwich Islands',
   'South Sudan',
   'Spain',
   'Sri Lanka',
   'Sudan (the)',
   'Suriname',
   'Svalbard and Jan Mayen',
   'Sweden',
   'Switzerland',
   'Syrian Arab Republic',
   'Taiwan (Province of China)',
   'Tajikistan',
   'Tanzania, United Republic of',
   'Thailand',
   'Timor-Leste',
   'Togo',
   'Tokelau',
   'Tonga',
   'Trinidad and Tobago',
   'Tunisia',
   'Turkey',
   'Turkmenistan',
   'Turks and Caicos Islands (the)',
   'Tuvalu',
   'Uganda',
   'Ukraine',
   'United Arab Emirates (the)',
   'United Kingdom of Great Britain and Northern Ireland (the)',
   'United States Minor Outlying Islands (the)',
   'United States of America (the)',
   'Uruguay',
   'Uzbekistan',
   'Vanuatu',
   'Venezuela (Bolivarian Republic of)',
   'Viet Nam',
   'Virgin Islands (British)',
   'Virgin Islands (U.S.)',
   'Wallis and Futuna',
   'Western Sahara',
   'Yemen',
   'Zambia',
   'Zimbabwe',
];

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
                     <MdPhone className="input-icon" />
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
                     <IoMdContact className="input-icon" />
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
                     <HiHome className="input-icon" />
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
                     <MdLocationCity className="input-icon" />
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
                           <RiEarthFill className="input-icon" />
                           <select
                              className="input-field"
                              id="country"
                              name="country"
                           >
                                    <option
                                       selected={true}
                                       disabled={true}
                                    >
                                       Your country..
                                    </option>
                              {countries.map((country, index) => (
                                 <>
                                    <option value={country} key={index}>
                                       {country}
                                    </option>
                                 </>
                              ))}
                           </select>
                        </div>
                     </div>
                     <div className="checkout__form__column">
                        <label htmlFor="postalcode">Postal Code</label>
                        <div className="input-field-group">
                           <MdMarkunreadMailbox className="input-icon" />
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
                  <div id="personnalInfos">
                     <input type="checkbox" id="saveInfos" name="saveInfos" />
                     <label htmlFor="saveInfos">
                        Save this information for next time
                     </label>
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
export default Checkout;