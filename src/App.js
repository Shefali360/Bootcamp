import React,{Component}from 'react';
import './App.css';
import Fruits from './fruits/fruits';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      fruitsList:[],
      currentFruit:{
        input:'',
        key:''
      }
    }
    this.addItem=this.addItem.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.editItem=this.editItem.bind(this);
    this.saveUpdatedItem=this.saveUpdatedItem.bind(this);
  }

  addItem(input){
    input.preventDefault();
    const newItem=this.state.currentFruit;
    if(newItem!==""){
      const fruitsList=[...this.state.fruitsList,newItem];
      this.setState({
        fruitsList:fruitsList,
        currentFruit:{
          input:'',
          key:''
        }

      })
    }
  }
  handleInput(input){
    this.setState({
      currentFruit:{
        input:input.target.value,
        key:Date.now()
      }
    }) 
  }

  editItem(key){
    const fruitsList = this.state.fruitsList;
    const text=fruitsList.map(item=>{      
     if(item.key===key){
          const entry=item.input; 
          return entry;  
    }
    })
    this.setState({
      currentFruit:{
        input:text,
        key:''
      }
    })    
  }


  saveUpdatedItem(key){
      const currentItem=this.state.currentFruit;
      console.log(currentItem);
      if(currentItem!==""&& this.state.currentFruit.key===key){
        const fruitsList=[...this.state.fruitsList,currentItem];     
    this.setState=({
    fruitsList:fruitsList,
    currentFruit:{
    input:'',
    key:''
  }
  })
}
  }



  deleteItem(key){
    const filteredItems=this.state.fruitsList.filter(
      item =>item.key!=key);
      this.setState({
        fruitsList:filteredItems
      })
    }
render(){
return (

  <div className="fruit-list">
    <h3>Displaying information about fruits and their respective quantities.</h3>
    <form id="form" onSubmit={this.addItem}>
    <input type="text" placeholder="Enter Fruits with quantity" value={this.state.currentFruit.input} onChange={this.handleInput}></input>
    <button type="submit">Submit</button>
    </form>
    <Fruits items={this.state.fruitsList} editItem={this.editItem} saveUpdatedItem={this.saveUpdatedItem} deleteItem={this.deleteItem}></Fruits>
  </div>
);
}
}
export default App;
