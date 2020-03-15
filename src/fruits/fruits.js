import React from 'react';
import './fruits.css';

const fruits=(props)=>{

const list=props.items.map((listItem)=>{
        let fruit=listItem.input;
        let arr=fruit.split("-");
   return (
    <div className="list"> 
   <span className="fruit">{arr[0]}</span>
   <span className="quantity">{arr[1]}</span>
   <button className="btn" onClick={()=>props.deleteItem(listItem.key)}>Delete</button>
   </div>
   );
    });

    return <div>{list}</div>
};

export default fruits;