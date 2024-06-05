import AddProduct from "../AddProduct/AddProduct";
import CartFooter from "../CartFooter/CartFooter";
import Header from "../CartHeader/CartHeader";
import Product from "../Product/Product";
import { createContext, useEffect, useState } from "react";
import { serverURL } from "../../helpers/variables";

export const AppContext = createContext(null);

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null);
    const [fetchData, setFerchData] = useState(true);

    useEffect(() => {
        fetch(serverURL + "/products")
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
            });
    }, [fetchData]);

    useEffect(() => {
        if (cart) {
            setTotal({
                price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0),
                count: cart.reduce((prev, curr) => prev + curr.count, 0),
            });
        }
    }, [cart]);

    const deleteProduct = (id) => {
        setCart((cart) => cart.filter((el) => id !== el.id));
        fetch(serverURL + "/products/" + id, {
            method: "DELETE",
        }).then((res) => {
            res.ok && setFerchData((value) => !value);
        });
    };

    const increase = (id) => {
        const product = cart.find((product) => id === product.id);
        const data = {
            ...product,
            count: product.count + 1,
            priceTotal: (product.count + 1) * product.price,
        };

        fetch(serverURL + "/products/" + id, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        }).then((res) => {
            res.ok && setFerchData((value) => !value);
        });
    };

    const decrease = (id) => {
        const product = cart.find((product) => id === product.id);
        const newCount = product.count - 1 > 1 ? --product.count : 1;
        const data = {
            ...product,
            count: newCount,
            priceTotal: newCount * product.price,
        };

        fetch(serverURL + "/products/" + id, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        }).then((res) => {
            res.ok && setFerchData((value) => !value);
        });
    };

    const changeValue = (id, value) => {
        const product = cart.find((product) => id === product.id);
        const data = {
            ...product,
            count: value,
            priceTotal: value * product.price,
        };

        fetch(serverURL + "/products/" + id, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        }).then((res) => {
            res.ok && setFerchData((value) => !value);
        });
    };

    const addProduct = () => {
        const titles = ["Apple MacBook Air 13", "Apple watch", "Mac Pro"];
        const imgs = ["macbook.jpg", "apple-watch.jpg", "mac-pro.jpg"];
        const prices = [10000, 20000, 9000, 25000];

        const randomValue = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        const price = randomValue(prices);

        const data = {
            img: randomValue(imgs),
            title: randomValue(titles),
            count: 1,
            price: price,
            priceTotal: price,
        };

        fetch(serverURL + "/products", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data),
        }).then((res) => {
            res.ok && setFerchData((value) => !value);
        });
    };

    const products = ()=>{
        return cart.map((el) => {
            return (
                <Product
                    product={el}
                    key={el.id}
                />
            );
        })
    }

    return (
        <AppContext.Provider value={{deleteProduct, increase, decrease, changeValue}}>
            <section className="cart">
                <Header />

                {cart && products()}

                {total && <CartFooter total={total} />}
            </section>

            <section className="button-wrapper">
                <AddProduct title="Add product" onClick={addProduct} />
            </section>
        </AppContext.Provider>
    );
};

export default Cart;
