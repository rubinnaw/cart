import './_product.scss'
import Count from "../Count/Count"
import ButtonDel from "../ButtonDel/ButtonDel"


const Product = ({product}) => {

    const priceFormatter = new Intl.NumberFormat()

    return (
        <section className="product">
            <div className="product__img">
                <img
                    src={`./img/products/${product.img}`}
                    alt={product.title}
                />
            </div>
            <div className="product__title">{product.title}</div>
            <div className="product__count">
                
            <Count count={product.count} id={product.id} />

            </div>
            <div className="product__price">{priceFormatter.format(product.priceTotal)} руб.</div>
            <div className="product__controls">
                
               <ButtonDel id={product.id}/>

            </div>
        </section>
    );
};

export default Product;
