import { useContext } from "react";
import { AppContext } from "../Cart/Cart";

const ButtonDel = ({id}) => {

    const {deleteProduct} = useContext(AppContext)

    return (
        <button onClick={()=>{deleteProduct(id)}} type="button">
            <img src="./img/icons/cross.svg" alt="Delete" />
        </button>
    );
};

export default ButtonDel;
