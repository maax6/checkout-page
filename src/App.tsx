import { Checkout } from './components/Checkout/Checkout';
import './App.scss';
import img1Url from './assets/img/photo1.png';
import img2Url from './assets/img/photo2.png';
const items = [
  {
    id: 1,
    name: 'Vintage Backbag',
    price: 54.99,
    oldPrice: 94.99,
    quantity: 1,
    image: img1Url,
  },
  {
    id: 2,
    name: 'Levi Shoes',
    price: 74.99,
    oldPrice: 124.99,
    quantity: 1,
	image: img2Url,
	
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
