import { Checkout } from './components/Checkout/Checkout';
import './App.scss';

const items = [
  {
    id: 1,
    name: 'Vintage Backbag',
    price: 54.99,
    oldPrice: 94.99,
    quantity: 1,
    image: 'src/img/photo1.png',
  },
  {
    id: 2,
    name: 'Levi Shoes',
    price: 74.99,
    oldPrice: 124.99,
    quantity: 1,
    image: 'src/img/photo2.png',
  },
];

function App() {
  return (
    <>
      <Checkout items={items} />
	  <footer> created by ⌘ Maxime - devChallenges.io</footer>
    </>
  );
}

export default App;
