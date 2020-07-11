import React from 'react';
import classes from './Filter.module.css';
const Filter=(props)=>{
        return (
            <div className={classes.filter}>
                <span>{props.length} Products Found</span>
                <span>Filter Products Here</span>
                <select className={classes.inputs} value={props.sort} name="sort" onChange={props.change}>
                    <option value="All">Sort Price</option>
                <option value="price-desc">Highest Price</option>
                <option value="price-asc">Lowest Price</option>
                </select>
                <select className={classes.inputs} value={props.size} name="size" onChange={props.change}>
                        <option value="All">Filter Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="X">X</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                </select>
                <div>
                    <span>Filter By Price</span>
                    <input className={classes.inputs} onChange={props.change} value={props.globalState.minprice} placeholder="Min Price" type="number" 
                    min={100} name="minprice"/>
                    <input onChange={props.change} value={props.globalState.maxprice} placeholder="Max Price"  type="number" max={1000000} name="maxprice" className={classes.inputs}/>
                    <span>Search For Products</span>
                    <input className={classes.inputs} type="text" name="search" onChange={props.change} placeholder="Search"/>
                    <span className={classes.avail}>Available Instock: <input type="checkbox" checked={props.globalState.instock}  name="instock" onChange={props.change}/></span>
                </div>
            </div>
        );
}

export default Filter;
