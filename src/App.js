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

  deleteItem(key){
    const filteredItems=this.state.fruitsList.filter(
      item =>item.key!==key);
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
    <Fruits items={this.state.fruitsList} deleteItem={this.deleteItem}></Fruits>
  </div>
);
}
}
export default App;
