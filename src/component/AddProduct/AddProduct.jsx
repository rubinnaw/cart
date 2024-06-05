import './AddProduct.scss'


const AddProduct = ({title, onClick}) => {
    return ( <button className='button' onClick={onClick}>{title}</button> );
}
 
export default AddProduct;