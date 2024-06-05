import './_cart-footer.scss'


const CartFooter = ({total}) => {

    const priceFormatter = new Intl.NumberFormat()


    return (
        <footer className="cart-footer">
            <div className="cart-footer__count">{total.count}</div>
            <div className="cart-footer__price">{priceFormatter.format(total.price)} руб.</div>
        </footer>
    );
};

export default CartFooter;
