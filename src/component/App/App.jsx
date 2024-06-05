import './_vars.scss'
import './_reset.scss'
import './_base.scss'
import './_section-cart.scss'
import Title from '../Title/Title';
import Cart from '../Cart/Cart';

function App() {
  return (
    <div className="App">
      <section className="section-cart">
        <header className="section-cart__header">
            <div className="container">
               <Title/>
            </div>
        </header>
        <div className="section-cart__body">
            <div className="container">

               <Cart/>

            </div>
        </div>
    </section>
    </div>
  );
}

export default App;
