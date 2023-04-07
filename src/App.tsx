import { Checkout } from "./components/Checkout/Checkout";
import "./App.scss";
const items = [
	{
	id: 1,
	name: "T-Shirt",
	price: 19.99,
	image: "src/assets/img/photo1.png"
	},
	{
	id: 2,
	name: "Jeans",
	price: 39.99,
	image: "src/assets/img/photo2.png"
	}
	];
function App() {
 return (
  <>
   <h1>Checkout</h1>
	<Checkout items={items} />  </>
 );
}

export default App;
