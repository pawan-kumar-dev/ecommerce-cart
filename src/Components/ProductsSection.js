import React, {  useState} from 'react';
import classes from './ProductsSection.module.css';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
const ProductsSection=(props)=>{
    const [products,setProducts]=useState({
        products:null
    })
   const openModal=(product)=>{
       setProducts({
           products:product
       })
    }
   const closeModal=()=>{
       setProducts({
           products:null
       })
    }
    const {addToCart,data}=props
        return (
            <div className={classes.main}>
            <div className={classes.ProductsSection}>
                {data.map((products)=>{
                    return(
                            <div key={products.id}>
                                <Fade bottom>
                                <div className={classes.product}>
                                <div className={classes.imageContainer}>
                                <a href={`#${products.id}`} onClick={()=>{openModal(products)}}>
                                <img className={classes.image} src={`/images/${products.image}`} alt={products.title}/>
                                </a>
                                </div>
                                <div className={classes.detailsContainer}>
                                <div className={classes.title}>
                                   {products.title.toUpperCase()}
                                </div>
                                <div className={classes.priceandbutton}>
                                    <span>Price Rs.{products.price}</span>
                                    <button onClick={()=>{addToCart(products)}} className={classes.btn}>Add TO Cart</button>
                                </div>
                                </div>
                                </div>
                                </Fade>
                            </div>
                    )
                    }
                    )
                    }
            </div>
            {
                products.products&&
                <Modal isOpen={true} ariaHideApp={false}>
                    <Zoom>
                        <div>
                    <button onClick={closeModal}>X</button>
                        <div className={classes.pop}>
                            <img className={classes.images} src={`/images/${products.products.image}`} alt={products.products.title}/>
                            <div className={classes.desc}>
                                <p>
                                    <strong>{products.products.title}</strong>
                                </p>
                                <p>
                                   {products.products.desc}
                                </p>
                                <p>Available Sizes
                                    {
                                        products.products.Size.map((item,index)=>{
                                            return <span className={classes.sizes} key={index}>{item}</span>
                                        })
                                    }
                                </p>
                                <p>Available Instock: 
                                    {products.products.inStock?" Yes":" No"}
                                </p>
                                <p>
                                   Rs. {products.products.price}
                                </p>
                                <button onClick={
                                    ()=>{
                                        props.addToCart(products.products);
                                        closeModal();
                                    }
                                }>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        </div>
                    </Zoom>
                </Modal>
            }
            </div>
        );
}
export default ProductsSection;