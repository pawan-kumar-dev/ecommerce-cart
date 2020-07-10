import React, { useState, useEffect} from 'react';
import classes from './App.module.css';
import ProductsSection from './Components/ProductsSection';
import Cart from './Components/Cart';
import Filter from './Components/Filter'
import Data from './DataFile/Data.json';
import Header from './Components/Header';
const App=()=>{
  const [data,setData]=useState({
    ListingData:Data.products,
    minprice:"",
    maxprice:"",
    instock:false,
    filteredData:Data.products,
    sort:"All",
    view:"box",
    search:"",
    size:"All",
    cartItem:localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):[]
  })
  const change=(event)=>{
    const name=event.target.name
    const value=(event.target.type==="checkbox")?event.target.checked:event.target.value
    setData({
      ...data,
      [name]:value
    })
  }
  useEffect(()=>{
    filteringData()
  },[data.sort,data.size,data.minprice,data.maxprice,data.search,data.instock]) 
  const filteringData=()=>{
    let newData=data.ListingData
    if(data.minprice!==''||data.maxprice!==''){
      newData=newData.filter((item)=>{
        return(item.price<=data.maxprice&&item.price>=data.minprice)
      })}

    if(data.sort!=="All"){
      if(data.sort==="price-desc"){
        console.log()
        newData=newData.sort((a,b)=>{
          return b.price-a.price
        })
      }
      if(data.sort==="price-asc"){
        newData=newData.sort((a,b)=>{
          return a.price-b.price
        })
      }
    }
    if(data.search!==''){
      let title,search
      newData=newData.filter((item)=>{
        title=item.title.toLowerCase()
        search=data.search.toLowerCase()
        return title.includes(search)
      })
    }
    if(data.size!=="All"){
      newData=newData.filter((item)=>{
        return item.Size.indexOf(data.size)>=0
      })
    }
    if(data.instock){
      newData=newData.filter(item=>{
        return item.inStock
      })
    }
    setData({
      ...data,
      filteredData:newData
    })
  }
  const addToCart=(product)=>{
    const cartItem=data.cartItem.concat();//cloning the CartItem data
    let alreadyInCart=false;
    cartItem.forEach((item)=>{
      if(item.id===product.id){
        //if item is already in the cart then update its quantity
        item.count++;
        alreadyInCart=true;
      }
    })
    if(!alreadyInCart){
      cartItem.push({...product,count:1})
      // pushing the data and initializing the count to be 1
    }
    setData({
      ...data,
      cartItem:cartItem
    })
    localStorage.setItem("cartItem",JSON.stringify(cartItem))
  }
  const removeFromCart=(product)=>{
    const cartItem=data.cartItem.slice();//cloning the CartItem data
    setData({
      ...data,
      cartItem:cartItem.filter((item)=>{
        return item.id!==product.id
      })
    })
    localStorage.setItem("cartItem",JSON.stringify(cartItem.filter((item)=>{
      return item.id!==product.id})))
  }
  const complete=()=>{
    setData({
      ...data,
      cartItem:[]
    })
    localStorage.setItem("cartItem",[])
    alert("Shopping completed")
  }
    return (
      <div className={classes.App}>
        <Header/>
        <main>
          <Filter length={data.filteredData.length}
          size={data.size}
          sort={data.sort}
          change={change}
          globalState={data}
          />
          <div>
          <ProductsSection 
          addToCart={addToCart}
          data={data.filteredData}
          />
          <div className={classes.Carts}>
          <Cart 
          complete={complete}
          removeItem={removeFromCart}
          cartItem={data.cartItem}/>
          </div>
          </div>
        </main>
        <footer>
          All rights reserved
        </footer>
      </div>
    );
}

export default App;