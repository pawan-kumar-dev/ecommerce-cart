import React, { useState,memo} from 'react';
import classes from './Cart.module.css';
import Fade from 'react-reveal/Fade';
const Cart=({cartItem,removeItem,complete})=>{
    const [Cartdata,setCart]=useState({
        showCheckout:false,
    })
    const [userData,setUser]=useState({
        name:"",
        email:"",
        address:""
    })
   const handleChange=(e)=>{
        const {name,value}=e.target
        setUser({
            ...userData,
            [name]:value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(userData.name===''||userData.email===''||userData.address===''){
            alert("Please Fill all the details")
            return
        }
        complete()
        setUser({
            name:'',
            email:'',
            address:''
        })
    }
        return (
            <>
            <div className={classes.cart}>
                <div className={classes.cartHeader}>
                {cartItem.length===0?<div>You have 0 Items in Cart</div>:
                <div>You have {cartItem.length} Items in Cart</div>}
                </div>
            </div>
            <div className={classes.cartItem}>
                <ul className={classes.items}>
                    {
                        cartItem.map((products)=>{
                            return(
                                <div key={products.id}>
                                <Fade left cascade>
                                <li>
                                    <div>
                                    <div>
                                    <img className={classes.img} src={`/images/${products.image}`} alt={products.title}/>
                                    </div>
                                    <div>
                                        {products.title}
                                    </div>
                                    </div>
                                <div className={classes.right}>
                                   Rs. {products.price} X {products.count}
                                <button onClick={()=>{removeItem(products)}}>Remove</button>
                                </div>
                                </li>
                                </Fade>
                                </div>
                            )
                        })
                    }
                </ul>
            {cartItem.length!==0&&
                <div className={classes.proceed}>
                    <div className={classes.total}>Rs.
                        {
                            cartItem.reduce((acc,current)=>{
                                return acc+current.price*current.count
                            },0)
                        }
                    </div>
                    <div>
                        <button className={classes.checkout} onClick={()=>{setCart({showCheckout:true})}}>
                            Check Out
                        </button>
                    </div>
                </div>}
                <div className={classes.checkout}>
                   {(Cartdata.showCheckout&&cartItem.length!==0)&&
                <Fade right cascade>
                   <div className={classes.form}>
                       <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Enter Your Name"/><br></br>
                       <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter Your Email"/><br></br>
                       <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Enter Your Address"/><br></br>
                       <button onClick={handleSubmit} className={classes.submit}>Check Out</button>
                   </div>
                   </Fade>
                   }
                </div>
            </div>
            </>
        );
}

export default memo(Cart);