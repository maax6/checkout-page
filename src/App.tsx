import { Checkout } from './components/Checkout/Checkout';
import './App.scss';

const items = [
  {
    id: 1,
    name: 'Vintage Backbag',
    price: 54.99,
    oldPrice: 94.99,
    quantity: 1,
    image: 'src/assets/img/photo1.png',
  },
  {
    id: 2,
    name: 'Levi Shoes',
    price: 74.99,
    oldPrice: 124.99,
    quantity: 1,
    image: 'src/assets/img/photo2.png',
  },
];

function App() {
  return (
    <>
      <Checkout items={items} />
    </>
  );
}

export default App;
